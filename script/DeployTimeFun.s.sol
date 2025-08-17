// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TimeFun.sol";

contract DeployTimeFun is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TimeFun contract
        TimeFun timeFun = new TimeFun();

        console.log("TimeFun deployed to:", address(timeFun));
        console.log("Deploy from:", msg.sender);
        console.log("Owner:", timeFun.owner());

        vm.stopBroadcast();
    }
} 