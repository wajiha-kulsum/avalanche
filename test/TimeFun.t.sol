// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TimeFun.sol";

contract TimeFunTest is Test {
    TimeFun public timeFun;
    address public owner;
    address public creator1;
    address public creator2;
    address public user1;
    address public user2;
    
    function setUp() public {
        owner = address(this);
        // Use proper addresses instead of precompile addresses
        creator1 = address(0x100);
        creator2 = address(0x200);
        user1 = address(0x300);
        user2 = address(0x400);

        // Deploy TimeFun contract
        timeFun = new TimeFun();
        
        // Give test accounts some ETH
        vm.deal(creator1, 100 ether);
        vm.deal(creator2, 100 ether);
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
    }

    function testJoinAsCreator() public {
        // Test joining as creator
        vm.prank(creator1);
        timeFun.joinAsCreator(
            "Alice Creator",
            "I'm a content creator",
            "https://example.com/alice.jpg",
            "@alice"
        );

        // Check creator was registered
        assertEq(timeFun.creatorToId(creator1), 1);
        
        // Check creator info
        (
            address creatorAddress,
            string memory name,
            string memory bio,
            string memory profileImage,
            string memory twitter,
            uint256 totalShares,
            uint256 currentPrice
        ) = timeFun.getCreatorInfo(1);

        assertEq(creatorAddress, creator1);
        assertEq(name, "Alice Creator");
        assertEq(bio, "I'm a content creator");
        assertEq(profileImage, "https://example.com/alice.jpg");
        assertEq(twitter, "@alice");
        assertEq(totalShares, 0);
        assertEq(currentPrice, 0.001 ether);
    }

    function testCannotJoinTwice() public {
        // First join
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        // Try to join again
        vm.prank(creator1);
        vm.expectRevert("Already registered as creator");
        timeFun.joinAsCreator("Alice Again", "Bio", "Image", "@alice");
    }

    function testBuyShares() public {
        // Join as creator first
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        // Buy shares
        uint256 shares = 5;
        uint256 cost = timeFun.getBuyPrice(1, shares);
        
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, shares);

        // Check shares owned
        assertEq(timeFun.getSharesOwned(1, user1), shares);
        
        // Check total shares
        (, , , , , uint256 totalShares, ) = timeFun.getCreatorInfo(1);
        assertEq(totalShares, shares);
    }

    function testBuyPriceCalculation() public {
        // Join as creator
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        // Test price for first share
        uint256 firstSharePrice = timeFun.getBuyPrice(1, 1);
        assertEq(firstSharePrice, 0.001 ether);

        // Buy first share
        vm.prank(user1);
        timeFun.buyShares{value: firstSharePrice}(1, 1);

        // Test price for second share (should be higher)
        uint256 secondSharePrice = timeFun.getBuyPrice(1, 1);
        assertGt(secondSharePrice, firstSharePrice);
    }

    function testSellShares() public {
        // Setup: Join as creator and buy shares
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        uint256 shares = 5;
        uint256 cost = timeFun.getBuyPrice(1, shares);
        
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, shares);

        // Get sell price
        uint256 sellPrice = timeFun.getSellPrice(1, 2);
        
        // Sell 2 shares
        uint256 balanceBefore = user1.balance;
        vm.prank(user1);
        timeFun.sellShares(1, 2);
        
        // Check shares were reduced
        assertEq(timeFun.getSharesOwned(1, user1), 3);
        
        // Check user received ETH (minus fees)
        assertGt(user1.balance, balanceBefore);
    }

    function testCannotSellMoreSharesThanOwned() public {
        // Setup
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        uint256 cost = timeFun.getBuyPrice(1, 2);
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, 2);

        // Try to sell more shares than owned
        vm.prank(user1);
        vm.expectRevert("Insufficient shares");
        timeFun.sellShares(1, 5);
    }

    function testHasAccessTo() public {
        // Setup
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        // User without shares should not have access
        assertFalse(timeFun.hasAccessTo(1, user1));

        // Buy shares
        uint256 cost = timeFun.getBuyPrice(1, 1);
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, 1);

        // User with shares should have access
        assertTrue(timeFun.hasAccessTo(1, user1));
    }

    function testGetAllCreators() public {
        // Initially no creators
        uint256[] memory creators = timeFun.getAllCreators();
        assertEq(creators.length, 0);

        // Add first creator
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        creators = timeFun.getAllCreators();
        assertEq(creators.length, 1);
        assertEq(creators[0], 1);

        // Add second creator
        vm.prank(creator2);
        timeFun.joinAsCreator("Bob", "Bio", "Image", "@bob");

        creators = timeFun.getAllCreators();
        assertEq(creators.length, 2);
        assertEq(creators[1], 2);
    }

    function testInvalidCreatorId() public {
        // Test with non-existent creator ID
        vm.expectRevert("Invalid creator ID");
        timeFun.getCreatorInfo(999);

        vm.expectRevert("Invalid creator ID");
        timeFun.getBuyPrice(999, 1);

        vm.expectRevert("Invalid creator ID");
        timeFun.getSellPrice(999, 1);
    }

    function testCreatorFees() public {
        // Setup
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");

        uint256 creatorBalanceBefore = creator1.balance;
        uint256 shares = 10;
        uint256 cost = timeFun.getBuyPrice(1, shares);
        
        // Buy shares
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, shares);

        // Creator should receive 5% fee
        uint256 expectedFee = (cost * 5) / 100;
        assertEq(creator1.balance, creatorBalanceBefore + expectedFee);
    }

    function testOwnerFunctions() public {
        // Test owner can withdraw fees
        uint256 ownerBalanceBefore = address(this).balance;
        
        // Add some ETH to contract through platform fees
        vm.prank(creator1);
        timeFun.joinAsCreator("Alice", "Bio", "Image", "@alice");
        
        uint256 cost = timeFun.getBuyPrice(1, 10);
        vm.prank(user1);
        timeFun.buyShares{value: cost}(1, 10);

        // Withdraw platform fees
        timeFun.withdrawPlatformFees();
        
        // Owner should receive the platform fees
        assertGt(address(this).balance, ownerBalanceBefore);
    }

    function testNonOwnerCannotWithdraw() public {
        vm.prank(user1);
        vm.expectRevert("Only owner");
        timeFun.withdrawPlatformFees();
    }

    // Helper function to receive ETH
    receive() external payable {}
} 