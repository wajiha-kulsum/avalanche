// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TimeFunFactory.sol";
import "../src/CreatorToken.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the factory
        TimeFunFactory factory = new TimeFunFactory();
        
        console.log("TimeFunFactory deployed at:", address(factory));
        
        // Create a sample creator token for testing
        address sampleToken = factory.createToken{value: 0.01 ether}(
            "Sample Creator Token",
            "SCT",
            "Sample Creator",
            "A sample creator for testing the platform",
            "https://example.com/sample-creator.jpg"
        );
        
        console.log("Sample CreatorToken deployed at:", sampleToken);
        
        // Create another sample token
        address sampleToken2 = factory.createToken{value: 0.01 ether}(
            "Test Artist Token",
            "TAT",
            "Test Artist",
            "An amazing digital artist creating NFTs and content",
            "https://example.com/test-artist.jpg"
        );
        
        console.log("Test Artist Token deployed at:", sampleToken2);
        
        vm.stopBroadcast();
        
        // Log deployment info
        console.log("\n=== Deployment Summary ===");
        console.log("Factory Address:", address(factory));
        console.log("Sample Token 1:", sampleToken);
        console.log("Sample Token 2:", sampleToken2);
        console.log("Total Tokens:", factory.totalTokens());
        console.log("Total Creators:", factory.totalCreators());
        
        // Save addresses to a file for frontend integration
        string memory addresses = string(abi.encodePacked(
            "export const FACTORY_ADDRESS = '", 
            vm.toString(address(factory)), 
            "' as const\n",
            "export const SAMPLE_TOKENS = [\n",
            "  '", vm.toString(sampleToken), "',\n",
            "  '", vm.toString(sampleToken2), "'\n",
            "] as const\n"
        ));
        
        vm.writeFile("./deployed-addresses.ts", addresses);
        console.log("\nAddresses saved to deployed-addresses.ts");
    }
} 