// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CreatorToken.sol";

contract TimeFunFactory {
    address public owner;
    uint256 public creationFee = 0.01 ether; // Fee to create a token
    
    // All created tokens
    address[] public allTokens;
    mapping(address => address[]) public creatorToTokens; // creator -> tokens
    mapping(address => address) public tokenToCreator; // token -> creator
    
    // Creator profiles
    struct CreatorProfile {
        string name;
        string description;
        string profileImage;
        uint256 totalTokens;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(address => CreatorProfile) public creators;
    address[] public allCreators;
    
    event TokenCreated(
        address indexed token,
        address indexed creator,
        string name,
        string symbol,
        string creatorName
    );
    
    event CreatorRegistered(address indexed creator, string name);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function createToken(
        string memory name,
        string memory symbol,
        string memory creatorName,
        string memory description,
        string memory profileImage
    ) external payable returns (address) {
        require(msg.value >= creationFee, "Insufficient creation fee");
        require(bytes(name).length > 0, "Name required");
        require(bytes(symbol).length > 0, "Symbol required");
        require(bytes(creatorName).length > 0, "Creator name required");
        
        // Deploy new creator token
        CreatorToken token = new CreatorToken(
            name,
            symbol,
            msg.sender,
            creatorName,
            description,
            profileImage
        );
        
        address tokenAddress = address(token);
        
        // Update mappings
        allTokens.push(tokenAddress);
        creatorToTokens[msg.sender].push(tokenAddress);
        tokenToCreator[tokenAddress] = msg.sender;
        
        // Register creator if first token
        if (creatorToTokens[msg.sender].length == 1) {
            creators[msg.sender] = CreatorProfile({
                name: creatorName,
                description: description,
                profileImage: profileImage,
                totalTokens: 1,
                isActive: true,
                createdAt: block.timestamp
            });
            allCreators.push(msg.sender);
            emit CreatorRegistered(msg.sender, creatorName);
        } else {
            creators[msg.sender].totalTokens++;
        }
        
        emit TokenCreated(tokenAddress, msg.sender, name, symbol, creatorName);
        
        return tokenAddress;
    }
    
    // Get all tokens
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
    
    // Get tokens by creator
    function getCreatorTokens(address creator) external view returns (address[] memory) {
        return creatorToTokens[creator];
    }
    
    // Get all creators
    function getAllCreators() external view returns (address[] memory) {
        return allCreators;
    }
    
    // Get creator info
    function getCreatorInfo(address creator) external view returns (
        string memory name,
        string memory description,
        string memory profileImage,
        uint256 totalTokens,
        bool isActive,
        uint256 createdAt
    ) {
        CreatorProfile memory profile = creators[creator];
        return (
            profile.name,
            profile.description,
            profile.profileImage,
            profile.totalTokens,
            profile.isActive,
            profile.createdAt
        );
    }
    
    // Get token info
    function getTokenInfo(address tokenAddress) external view returns (
        string memory name,
        string memory symbol,
        address creator,
        uint256 totalSupply,
        uint256 currentPrice,
        uint256 marketCap,
        bool tradingEnabled
    ) {
        CreatorToken token = CreatorToken(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.creator(),
            token.totalSupply(),
            token.getCurrentPrice(),
            token.getMarketCap(),
            token.tradingEnabled()
        );
    }
    
    // Get trending tokens (by market cap)
    function getTrendingTokens(uint256 limit) external view returns (address[] memory) {
        require(limit > 0 && limit <= allTokens.length, "Invalid limit");
        
        // Simple implementation - in production, you'd want more sophisticated sorting
        address[] memory trending = new address[](limit);
        uint256[] memory marketCaps = new uint256[](limit);
        
        for (uint256 i = 0; i < allTokens.length && i < limit; i++) {
            trending[i] = allTokens[i];
            marketCaps[i] = CreatorToken(allTokens[i]).getMarketCap();
        }
        
        // Bubble sort by market cap (descending)
        for (uint256 i = 0; i < limit - 1; i++) {
            for (uint256 j = 0; j < limit - i - 1; j++) {
                if (marketCaps[j] < marketCaps[j + 1]) {
                    // Swap market caps
                    uint256 tempCap = marketCaps[j];
                    marketCaps[j] = marketCaps[j + 1];
                    marketCaps[j + 1] = tempCap;
                    
                    // Swap addresses
                    address tempAddr = trending[j];
                    trending[j] = trending[j + 1];
                    trending[j + 1] = tempAddr;
                }
            }
        }
        
        return trending;
    }
    
    // Update creator profile
    function updateCreatorProfile(
        string memory description,
        string memory profileImage
    ) external {
        require(creators[msg.sender].isActive, "Creator not registered");
        
        creators[msg.sender].description = description;
        creators[msg.sender].profileImage = profileImage;
    }
    
    // Admin functions
    function setCreationFee(uint256 newFee) external onlyOwner {
        creationFee = newFee;
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
    
    // Get total number of tokens
    function totalTokens() external view returns (uint256) {
        return allTokens.length;
    }
    
    // Get total number of creators
    function totalCreators() external view returns (uint256) {
        return allCreators.length;
    }
} 