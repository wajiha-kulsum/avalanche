#!/bin/bash

# Time.fun Local Development Setup Script

echo "🚀 Setting up Time.fun local development environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Foundry is installed
if ! command -v forge &> /dev/null; then
    echo -e "${RED}❌ Foundry not found. Please install Foundry first:${NC}"
    echo "curl -L https://foundry.paradigm.xyz | bash"
    echo "foundryup"
    exit 1
fi

echo -e "${BLUE}📦 Installing Foundry dependencies...${NC}"
forge install

echo -e "${BLUE}🔨 Building contracts...${NC}"
forge build

echo -e "${BLUE}🧪 Running contract tests...${NC}"
forge test

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Tests failed. Please fix the issues before proceeding.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Tests passed!${NC}"

# Check if Anvil is already running
if lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Anvil is already running on port 8545${NC}"
    read -p "Kill existing process and restart? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}🔄 Stopping existing Anvil process...${NC}"
        pkill -f "anvil"
        sleep 2
    else
        echo -e "${YELLOW}Using existing Anvil instance...${NC}"
    fi
fi

# Start Anvil in background if not running
if ! lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${BLUE}🔥 Starting Anvil local blockchain...${NC}"
    anvil --host 0.0.0.0 --port 8545 --chain-id 31337 &
    ANVIL_PID=$!
    echo -e "${GREEN}✅ Anvil started with PID: $ANVIL_PID${NC}"
    
    # Wait for Anvil to be ready
    echo -e "${BLUE}⏳ Waiting for Anvil to be ready...${NC}"
    sleep 3
fi

echo -e "${BLUE}📋 Deploying contracts to local network...${NC}"
forge script script/DeployLocal.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Contract deployment failed.${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Local environment setup complete!${NC}"
echo
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Add Anvil Local network to your wallet:"
echo "   - Network Name: Anvil Local"
echo "   - RPC URL: http://127.0.0.1:8545"
echo "   - Chain ID: 31337"
echo "   - Currency Symbol: ETH"
echo
echo "2. Import test account private key:"
echo "   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo
echo "3. Start the frontend:"
echo "   npm run dev"
echo
echo -e "${GREEN}🚀 Happy testing!${NC}"

# Keep script running to show Anvil logs
if [ ! -z "$ANVIL_PID" ]; then
    echo -e "${BLUE}📊 Anvil is running. Press Ctrl+C to stop...${NC}"
    wait $ANVIL_PID
fi 