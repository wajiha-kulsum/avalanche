// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TimeFunFactory.sol";
import "../src/CreatorToken.sol";

contract TimeFunTest is Test {
    TimeFunFactory factory;
    CreatorToken token;
    
    address owner = address(1);
    address creator = address(2);
    address buyer = address(3);
    address seller = address(4);
    
    function setUp() public {
        vm.startPrank(owner);
        factory = new TimeFunFactory();
        vm.stopPrank();
        
        // Create a token
        vm.deal(creator, 1 ether);
        vm.startPrank(creator);
        
        address tokenAddress = factory.createToken{value: 0.01 ether}(
            "Test Creator Token",
            "TCT",
            "Test Creator",
            "A test creator for testing purposes",
            "https://example.com/image.jpg"
        );
        
        token = CreatorToken(tokenAddress);
        vm.stopPrank();
        
        // Give test accounts some ETH
        vm.deal(buyer, 10 ether);
        vm.deal(seller, 10 ether);
    }
    
    function testFactoryCreation() public {
        assertEq(factory.totalTokens(), 1);
        assertEq(factory.totalCreators(), 1);
        
        address[] memory tokens = factory.getAllTokens();
        assertEq(tokens.length, 1);
        assertEq(tokens[0], address(token));
    }
    
    function testTokenBasics() public {
        assertEq(token.name(), "Test Creator Token");
        assertEq(token.symbol(), "TCT");
        assertEq(token.creator(), creator);
        assertEq(token.creatorName(), "Test Creator");
        assertEq(token.totalSupply(), 0);
        assertEq(token.tradingEnabled(), false);
    }
    
    function testBuyTokens() public {
        vm.startPrank(buyer);
        
        uint256 ethAmount = 0.1 ether;
        uint256 expectedTokens = token.calculateTokensForEth(ethAmount);
        
        // Buy tokens
        token.buy{value: ethAmount}(0);
        
        assertEq(token.balanceOf(buyer), expectedTokens);
        assertEq(token.totalSupply(), expectedTokens);
        
        // Check creator received fee (5%)
        uint256 expectedFee = ethAmount * 5 / 100;
        assertEq(creator.balance, 1 ether - 0.01 ether + expectedFee);
        
        vm.stopPrank();
    }
    
    function testSellTokens() public {
        // First buy some tokens
        vm.startPrank(buyer);
        uint256 ethAmount = 0.1 ether;
        token.buy{value: ethAmount}(0);
        
        uint256 tokenBalance = token.balanceOf(buyer);
        uint256 sellAmount = tokenBalance / 2;
        
        uint256 expectedEth = token.getSellPrice(sellAmount);
        uint256 balanceBefore = buyer.balance;
        
        // Sell half the tokens
        token.sell(sellAmount, 0);
        
        assertEq(token.balanceOf(buyer), tokenBalance - sellAmount);
        
        // Check received ETH (minus 5% fee)
        uint256 expectedReceived = expectedEth * 95 / 100;
        assertEq(buyer.balance, balanceBefore + expectedReceived);
        
        vm.stopPrank();
    }
    
    function testBondingCurve() public {
        vm.startPrank(buyer);
        
        // Buy tokens in increments and check price increases
        uint256 price1 = token.getBuyPrice(1 ether);
        token.buy{value: 0.01 ether}(0);
        
        uint256 price2 = token.getBuyPrice(1 ether);
        assertGt(price2, price1, "Price should increase after buy");
        
        vm.stopPrank();
    }
    
    function testCommunicationFeatures() public {
        vm.startPrank(buyer);
        
        uint256 videoPrice = token.videoCallPrice();
        uint256 voicePrice = token.voiceCallPrice();
        uint256 messagePrice = token.messagePrice();
        
        uint256 creatorBalanceBefore = creator.balance;
        
        // Request video call (1 minute)
        token.requestVideoCall{value: videoPrice}(1);
        assertEq(creator.balance, creatorBalanceBefore + videoPrice);
        
        // Request voice call (1 minute)  
        token.requestVoiceCall{value: voicePrice}(1);
        assertEq(creator.balance, creatorBalanceBefore + videoPrice + voicePrice);
        
        // Send message
        token.sendMessage{value: messagePrice}();
        assertEq(creator.balance, creatorBalanceBefore + videoPrice + voicePrice + messagePrice);
        
        vm.stopPrank();
    }
    
    function testCreatorOnlyFunctions() public {
        vm.startPrank(creator);
        
        // Update creator info
        token.updateCreatorInfo("Updated description", "new-image.jpg");
        assertEq(token.description(), "Updated description");
        assertEq(token.profileImage(), "new-image.jpg");
        
        // Update pricing
        token.updatePricing(0.1 ether, 0.05 ether, 0.02 ether);
        assertEq(token.videoCallPrice(), 0.1 ether);
        assertEq(token.voiceCallPrice(), 0.05 ether);
        assertEq(token.messagePrice(), 0.02 ether);
        
        vm.stopPrank();
        
        // Test unauthorized access
        vm.startPrank(buyer);
        vm.expectRevert("Only creator can call this");
        token.updateCreatorInfo("Unauthorized", "hack.jpg");
        vm.stopPrank();
    }
    
    function testTradingThreshold() public {
        vm.startPrank(buyer);
        
        // Initially trading should be disabled
        assertEq(token.tradingEnabled(), false);
        
        // Buy enough tokens to reach threshold (need to calculate required ETH)
        uint256 threshold = token.TRADING_THRESHOLD();
        
        // This is a simplified test - in practice you'd need to calculate exact ETH needed
        vm.deal(buyer, 100 ether);
        token.buy{value: 50 ether}(0);
        
        // Check if trading is enabled (depends on how much was actually bought)
        if (token.totalSupply() >= threshold) {
            assertEq(token.tradingEnabled(), true);
        }
        
        vm.stopPrank();
    }
    
    function test_RevertWhen_InsufficientPayment() public {
        vm.startPrank(buyer);
        
        // Should fail with insufficient payment
        vm.expectRevert("Insufficient payment");
        token.requestVideoCall{value: 0.01 ether}(1);
        
        vm.stopPrank();
    }
    
    function test_RevertWhen_SlippageProtection() public {
        vm.startPrank(buyer);
        
        // Should fail with high slippage requirement
        vm.expectRevert("Slippage too high");
        token.buy{value: 0.1 ether}(1000 ether); // Expecting way more tokens than possible
        
        vm.stopPrank();
    }
    
    function testGetMarketCap() public {
        vm.startPrank(buyer);
        
        uint256 initialCap = token.getMarketCap();
        assertEq(initialCap, 0);
        
        token.buy{value: 0.1 ether}(0);
        
        uint256 newCap = token.getMarketCap();
        assertGt(newCap, 0);
        
        vm.stopPrank();
    }
} 