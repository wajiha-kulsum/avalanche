// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TimeFun.sol";

contract DeployTimeFunLocal is Script {
    function run() external {
        // Use default anvil account for local deployment
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying TimeFun contract...");
        console.log("Deploying from:", msg.sender);

        // Deploy TimeFun contract
        TimeFun timeFun = new TimeFun();

        console.log("TimeFun deployed to:", address(timeFun));
        console.log("Owner:", timeFun.owner());
        console.log("Next Creator ID:", timeFun.nextCreatorId());

        // Create some sample creators for testing
        console.log("\n--- Creating sample creators ---");
        
        // Creator 1
        timeFun.joinAsCreator(
            "Alex Chen",
            "Crypto trader and DeFi expert with 5+ years of experience. I help people navigate the complex world of decentralized finance.",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "@alexchen_defi"
        );
        console.log("Created Creator 1: Alex Chen");

        // Creator 2  
        timeFun.joinAsCreator(
            "Sarah Miller", 
            "NFT artist and Web3 creator. I create digital art that tells stories and builds communities.",
            "https://images.unsplash.com/photo-1494790108755-2616b332c87c?w=400",
            "@sarahmiller_nft"
        );
        console.log("Created Creator 2: Sarah Miller");

        // Creator 3
        timeFun.joinAsCreator(
            "David Rodriguez",
            "Blockchain developer and smart contract auditor. I build secure dApps and educate others about Web3 development.",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", 
            "@davidrod_dev"
        );
        console.log("Created Creator 3: David Rodriguez");

        uint256[] memory allCreators = timeFun.getAllCreators();
        console.log("Total creators created:", allCreators.length);

        console.log("\n--- Deployment completed successfully! ---");
        console.log("Contract address:", address(timeFun));

        vm.stopBroadcast();
    }
} 