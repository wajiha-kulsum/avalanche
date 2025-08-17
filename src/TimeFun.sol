// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";

contract TimeFun {
    struct Creator {
        address creatorAddress;
        string name;
        string bio;
        string profileImage;
        string twitter;
        uint256 totalShares;
        uint256 currentPrice; // Current price per share in wei
        bool isActive;
        uint256 createdAt;
    }
    
    // State variables
    uint256 public nextCreatorId = 1;
    mapping(uint256 => Creator) public creators;
    mapping(address => uint256) public creatorToId;
    mapping(uint256 => mapping(address => uint256)) public sharesOwned; // creatorId => holder => shares
    uint256[] public allCreatorIds;
    
    // Constants for bonding curve
    uint256 public constant BASE_PRICE = 0.001 ether; // Starting price per share
    uint256 public constant PRICE_INCREMENT = 0.0001 ether; // Price increase per share
    uint256 public constant CREATOR_FEE_PERCENT = 5; // 5% fee to creator
    uint256 public constant PLATFORM_FEE_PERCENT = 5; // 5% platform fee
    
    // Access control - minimum shares needed for communication
    uint256 public constant MIN_SHARES_FOR_ACCESS = 1;
    
    // Events
    event CreatorJoined(uint256 indexed creatorId, address indexed creator, string name);
    event SharesPurchased(uint256 indexed creatorId, address indexed buyer, uint256 shares, uint256 cost);
    event SharesSold(uint256 indexed creatorId, address indexed seller, uint256 shares, uint256 revenue);
    
    modifier validCreator(uint256 creatorId) {
        require(creatorId > 0 && creatorId < nextCreatorId, "Invalid creator ID");
        _;
    }
    
    modifier onlyCreator(uint256 creatorId) {
        require(creators[creatorId].creatorAddress == msg.sender, "Only creator can call this");
        _;
    }
    
    // Join as a creator
    function joinAsCreator(
        string memory name,
        string memory bio,
        string memory profileImage,
        string memory twitter
    ) external {
        require(creatorToId[msg.sender] == 0, "Already registered as creator");
        require(bytes(name).length > 0, "Name required");
        
        uint256 creatorId = nextCreatorId++;
        
        creators[creatorId] = Creator({
            creatorAddress: msg.sender,
            name: name,
            bio: bio,
            profileImage: profileImage,
            twitter: twitter,
            totalShares: 0,
            currentPrice: BASE_PRICE,
            isActive: true,
            createdAt: block.timestamp
        });
        
        creatorToId[msg.sender] = creatorId;
        allCreatorIds.push(creatorId);
        
        emit CreatorJoined(creatorId, msg.sender, name);
    }
    
    // Buy shares of a creator
    function buyShares(uint256 creatorId, uint256 shares) external payable validCreator(creatorId) {
        require(shares > 0, "Must buy at least 1 share");
        require(creators[creatorId].isActive, "Creator not active");
        
        uint256 cost = getBuyPrice(creatorId, shares);
        require(msg.value >= cost, "Insufficient payment");
        
        // Update shares
        sharesOwned[creatorId][msg.sender] += shares;
        creators[creatorId].totalShares += shares;
        
        // Update price based on bonding curve
        creators[creatorId].currentPrice = BASE_PRICE + (creators[creatorId].totalShares * PRICE_INCREMENT);
        
        // Calculate fees
        uint256 creatorFee = (cost * CREATOR_FEE_PERCENT) / 100;
        uint256 platformFee = (cost * PLATFORM_FEE_PERCENT) / 100;
        
        // Transfer fees
        if (creatorFee > 0) {
            payable(creators[creatorId].creatorAddress).transfer(creatorFee);
        }
        // Platform fee stays in contract
        
        // Refund excess payment
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
        emit SharesPurchased(creatorId, msg.sender, shares, cost);
    }
    
    // Sell shares of a creator
    function sellShares(uint256 creatorId, uint256 shares) external validCreator(creatorId) {
        require(shares > 0, "Must sell at least 1 share");
        require(sharesOwned[creatorId][msg.sender] >= shares, "Insufficient shares");
        require(creators[creatorId].totalShares >= shares, "Not enough total shares");
        
        uint256 revenue = getSellPrice(creatorId, shares);
        require(address(this).balance >= revenue, "Insufficient contract balance");
        
        // Update shares
        sharesOwned[creatorId][msg.sender] -= shares;
        creators[creatorId].totalShares -= shares;
        
        // Update price based on bonding curve
        creators[creatorId].currentPrice = BASE_PRICE + (creators[creatorId].totalShares * PRICE_INCREMENT);
        
        // Calculate fees
        uint256 creatorFee = (revenue * CREATOR_FEE_PERCENT) / 100;
        uint256 platformFee = (revenue * PLATFORM_FEE_PERCENT) / 100;
        uint256 userRevenue = revenue - creatorFee - platformFee;
        
        // Transfer revenue to seller
        payable(msg.sender).transfer(userRevenue);
        
        // Transfer fee to creator
        if (creatorFee > 0) {
            payable(creators[creatorId].creatorAddress).transfer(creatorFee);
        }
        // Platform fee stays in contract
        
        emit SharesSold(creatorId, msg.sender, shares, revenue);
    }
    
    // Get creator information
    function getCreatorInfo(uint256 creatorId) external view validCreator(creatorId) returns (
        address creatorAddress,
        string memory name,
        string memory bio,
        string memory profileImage,
        string memory twitter,
        uint256 totalShares,
        uint256 currentPrice
    ) {
        Creator memory creator = creators[creatorId];
        return (
            creator.creatorAddress,
            creator.name,
            creator.bio,
            creator.profileImage,
            creator.twitter,
            creator.totalShares,
            creator.currentPrice
        );
    }
    
    // Get all creator IDs
    function getAllCreators() external view returns (uint256[] memory) {
        return allCreatorIds;
    }
    
    // Calculate buy price for shares
    function getBuyPrice(uint256 creatorId, uint256 shares) public view validCreator(creatorId) returns (uint256) {
        uint256 currentShares = creators[creatorId].totalShares;
        
        // Use mathematical formula instead of loop for gas efficiency
        // Price for share n = BASE_PRICE + (currentShares + n) * PRICE_INCREMENT
        // Total cost = shares * BASE_PRICE + PRICE_INCREMENT * (shares * currentShares + shares * (shares - 1) / 2)
        
        uint256 baseCost = shares * BASE_PRICE;
        uint256 incrementCost = PRICE_INCREMENT * (shares * currentShares + (shares * (shares - 1)) / 2);
        
        return baseCost + incrementCost;
    }
    
    // Calculate sell price for shares
    function getSellPrice(uint256 creatorId, uint256 shares) public view validCreator(creatorId) returns (uint256) {
        uint256 currentShares = creators[creatorId].totalShares;
        require(currentShares >= shares, "Not enough shares to sell");
        
        // Use mathematical formula instead of loop for gas efficiency
        // When selling, we sell from the highest priced shares first
        uint256 baseCost = shares * BASE_PRICE;
        uint256 decrementCost = PRICE_INCREMENT * (shares * (currentShares - shares) + (shares * (shares - 1)) / 2);
        
        return baseCost + decrementCost;
    }
    
    // Get shares owned by a holder for a creator
    function getSharesOwned(uint256 creatorId, address holder) external view validCreator(creatorId) returns (uint256) {
        return sharesOwned[creatorId][holder];
    }
    
    // Check if user has access to communicate with creator
    function hasAccessTo(uint256 creatorId, address user) external view validCreator(creatorId) returns (bool) {
        return sharesOwned[creatorId][user] >= MIN_SHARES_FOR_ACCESS;
    }
    
    // Get total number of creators
    function getTotalCreators() external view returns (uint256) {
        return allCreatorIds.length;
    }
    
    // Emergency functions (only for platform admin)
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    function withdrawPlatformFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
} 