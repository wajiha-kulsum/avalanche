// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TimeFun.sol";

contract SimpleDeployTimeFun is Script {
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

        console.log("Deployment completed successfully!");

        vm.stopBroadcast();
    }
} 