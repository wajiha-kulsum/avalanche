// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";

contract CreatorToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint8 public constant decimals = 18;
    
    address public creator;
    address public factory;
    
    // Bonding curve parameters
    uint256 public constant CURVE_MULTIPLIER = 1e15; // 0.001 ETH base price
    uint256 public constant MAX_SUPPLY = 1000000 * 1e18; // 1M tokens max
    
    // Trading enabled after certain supply
    uint256 public constant TRADING_THRESHOLD = 800000 * 1e18; // 800k tokens
    bool public tradingEnabled = false;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    // Creator profile data
    string public creatorName;
    string public description;
    string public profileImage;
    
    // Communication pricing (in wei per minute)
    uint256 public videoCallPrice = 0.05 ether; // $50/hour equivalent
    uint256 public voiceCallPrice = 0.025 ether; // $25/hour equivalent  
    uint256 public messagePrice = 0.01 ether; // $10/message equivalent
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Buy(address indexed buyer, uint256 tokensAmount, uint256 ethAmount);
    event Sell(address indexed seller, uint256 tokensAmount, uint256 ethAmount);
    event CommunicationRequest(address indexed user, string communicationType, uint256 amount);
    
    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can call this");
        _;
    }
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _creator,
        string memory _creatorName,
        string memory _description,
        string memory _profileImage
    ) {
        name = _name;
        symbol = _symbol;
        creator = _creator;
        factory = msg.sender;
        creatorName = _creatorName;
        description = _description;
        profileImage = _profileImage;
    }
    
    // Bonding curve price calculation
    function getBuyPrice(uint256 tokenAmount) public view returns (uint256) {
        uint256 currentSupply = totalSupply;
        uint256 newSupply = currentSupply + tokenAmount;
        
        // Quadratic bonding curve: price increases with supply²
        uint256 currentPrice = (currentSupply * currentSupply * CURVE_MULTIPLIER) / 1e18;
        uint256 newPrice = (newSupply * newSupply * CURVE_MULTIPLIER) / 1e18;
        
        return newPrice - currentPrice;
    }
    
    function getSellPrice(uint256 tokenAmount) public view returns (uint256) {
        uint256 currentSupply = totalSupply;
        require(currentSupply >= tokenAmount, "Not enough supply");
        
        uint256 newSupply = currentSupply - tokenAmount;
        
        uint256 currentPrice = (currentSupply * currentSupply * CURVE_MULTIPLIER) / 1e18;
        uint256 newPrice = (newSupply * newSupply * CURVE_MULTIPLIER) / 1e18;
        
        return currentPrice - newPrice;
    }
    
    // Buy tokens with ETH
    function buy(uint256 minTokensOut) external payable {
        require(msg.value > 0, "Must send ETH");
        
        // Calculate how many tokens can be bought with sent ETH
        uint256 tokensToMint = calculateTokensForEth(msg.value);
        require(tokensToMint >= minTokensOut, "Slippage too high");
        require(totalSupply + tokensToMint <= MAX_SUPPLY, "Exceeds max supply");
        
        // Mint tokens to buyer
        totalSupply += tokensToMint;
        balanceOf[msg.sender] += tokensToMint;
        
        // Send 5% to creator, rest stays in contract
        uint256 creatorFee = msg.value * 5 / 100;
        if (creatorFee > 0) {
            payable(creator).transfer(creatorFee);
        }
        
        // Enable trading if threshold reached
        if (totalSupply >= TRADING_THRESHOLD && !tradingEnabled) {
            tradingEnabled = true;
        }
        
        emit Transfer(address(0), msg.sender, tokensToMint);
        emit Buy(msg.sender, tokensToMint, msg.value);
    }
    
    // Sell tokens for ETH
    function sell(uint256 tokenAmount, uint256 minEthOut) external {
        require(balanceOf[msg.sender] >= tokenAmount, "Insufficient balance");
        
        uint256 ethToSend = getSellPrice(tokenAmount);
        require(ethToSend >= minEthOut, "Slippage too high");
        require(address(this).balance >= ethToSend, "Insufficient contract balance");
        
        // Burn tokens
        balanceOf[msg.sender] -= tokenAmount;
        totalSupply -= tokenAmount;
        
        // Send ETH to seller (minus 5% fee)
        uint256 fee = ethToSend * 5 / 100;
        uint256 userAmount = ethToSend - fee;
        
        if (fee > 0) {
            payable(creator).transfer(fee);
        }
        payable(msg.sender).transfer(userAmount);
        
        emit Transfer(msg.sender, address(0), tokenAmount);
        emit Sell(msg.sender, tokenAmount, ethToSend);
    }
    
    // Helper function to calculate tokens for given ETH
    function calculateTokensForEth(uint256 ethAmount) public view returns (uint256) {
        // Binary search to find token amount for given ETH
        uint256 low = 0;
        uint256 high = MAX_SUPPLY - totalSupply;
        
        while (low < high) {
            uint256 mid = (low + high + 1) / 2;
            if (getBuyPrice(mid) <= ethAmount) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        
        return low;
    }
    
    // Communication functions
    function requestVideoCall(uint256 _minutes) external payable {
        uint256 totalCost = videoCallPrice * _minutes;
        require(msg.value >= totalCost, "Insufficient payment");
        
        payable(creator).transfer(msg.value);
        emit CommunicationRequest(msg.sender, "video", _minutes);
    }
    
    function requestVoiceCall(uint256 _minutes) external payable {
        uint256 totalCost = voiceCallPrice * _minutes;
        require(msg.value >= totalCost, "Insufficient payment");
        
        payable(creator).transfer(msg.value);
        emit CommunicationRequest(msg.sender, "voice", _minutes);
    }
    
    function sendMessage() external payable {
        require(msg.value >= messagePrice, "Insufficient payment");
        
        payable(creator).transfer(msg.value);
        emit CommunicationRequest(msg.sender, "message", 1);
    }
    
    // Update creator info
    function updateCreatorInfo(
        string memory _description,
        string memory _profileImage
    ) external onlyCreator {
        description = _description;
        profileImage = _profileImage;
    }
    
    function updatePricing(
        uint256 _videoCallPrice,
        uint256 _voiceCallPrice, 
        uint256 _messagePrice
    ) external onlyCreator {
        videoCallPrice = _videoCallPrice;
        voiceCallPrice = _voiceCallPrice;
        messagePrice = _messagePrice;
    }
    
    // Standard ERC20 functions
    function transfer(address to, uint256 amount) external returns (bool) {
        require(tradingEnabled, "Trading not enabled yet");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(tradingEnabled, "Trading not enabled yet");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        require(balanceOf[from] >= amount, "Insufficient balance");
        
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
    
    // Get current price per token
    function getCurrentPrice() external view returns (uint256) {
        if (totalSupply == 0) return CURVE_MULTIPLIER;
        return getBuyPrice(1e18); // Price for 1 token
    }
    
    // Get market cap in ETH
    function getMarketCap() external view returns (uint256) {
        return (totalSupply * totalSupply * CURVE_MULTIPLIER) / 1e18;
    }
} 