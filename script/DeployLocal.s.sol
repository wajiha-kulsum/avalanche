// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TimeFunFactory.sol";
import "../src/CreatorToken.sol";

contract DeployLocalScript is Script {
    function run() external {
        // Use Anvil's default account (index 0)
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying to local Anvil network");
        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the factory
        TimeFunFactory factory = new TimeFunFactory();
        console.log("TimeFunFactory deployed at:", address(factory));
        
        // Create sample creator tokens with different profiles
        address kawzToken = factory.createToken{value: 0.01 ether}(
            "Kawz Time Token",
            "KAWZ",
            "Kawz",
            "Founder of Time.fun - Get instant access to creators, influencers, and experts",
            "https://example.com/kawz.jpg"
        );
        console.log("Kawz Token deployed at:", kawzToken);
        
        address sarahToken = factory.createToken{value: 0.01 ether}(
            "Sarah Chen Token",
            "SARAH",
            "Sarah Chen",
            "Digital artist specializing in AI-generated art and interactive experiences",
            "https://example.com/sarah.jpg"
        );
        console.log("Sarah Token deployed at:", sarahToken);
        
        address alexToken = factory.createToken{value: 0.01 ether}(
            "Alex Rivera Token",
            "ALEX",
            "Alex Rivera",
            "Tech educator creating tutorials on blockchain development and DeFi",
            "https://example.com/alex.jpg"
        );
        console.log("Alex Token deployed at:", alexToken);
        
        // Buy some tokens to initialize the market
        CreatorToken(kawzToken).buy{value: 0.1 ether}(0);
        CreatorToken(sarahToken).buy{value: 0.05 ether}(0);
        CreatorToken(alexToken).buy{value: 0.08 ether}(0);
        
        vm.stopBroadcast();
        
        // Log deployment summary
        console.log("\n=== Local Deployment Summary ===");
        console.log("Network: Anvil Local (Chain ID: 31337)");
        console.log("Factory Address:", address(factory));
        console.log("Kawz Token:", kawzToken);
        console.log("Sarah Token:", sarahToken);
        console.log("Alex Token:", alexToken);
        console.log("Total Tokens:", factory.totalTokens());
        console.log("Total Creators:", factory.totalCreators());
        
        // Create TypeScript config file
        string memory configContent = string(abi.encodePacked(
            "// Auto-generated contract addresses for local development\n",
            "import { Address } from 'viem'\n\n",
            "export const LOCAL_CONTRACTS = {\n",
            "  factory: '", vm.toString(address(factory)), "' as Address,\n",
            "  tokens: {\n",
            "    '1': '", vm.toString(kawzToken), "' as Address, // Kawz\n",
            "    '2': '", vm.toString(sarahToken), "' as Address, // Sarah Chen\n",
            "    '3': '", vm.toString(alexToken), "' as Address, // Alex Rivera\n",
            "  }\n",
            "} as const\n"
        ));
        
        vm.writeFile("./config/local-contracts.ts", configContent);
        console.log("\nContract addresses saved to config/local-contracts.ts");
        
        // Create .env.local file with contract addresses
        string memory envContent = string(abi.encodePacked(
            "# Local development contract addresses\n",
            "NEXT_PUBLIC_FACTORY_ADDRESS=", vm.toString(address(factory)), "\n",
            "NEXT_PUBLIC_CHAIN_ID=31337\n",
            "NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545\n"
        ));
        
        vm.writeFile("./.env.local", envContent);
        console.log("Environment variables saved to .env.local");
        
        console.log("\\n=== Local deployment complete! ===");
        console.log("Connect your wallet to 'Anvil Local' network");
        console.log("Import this private key for testing: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
        console.log("Start the frontend with: npm run dev");
    }
} 