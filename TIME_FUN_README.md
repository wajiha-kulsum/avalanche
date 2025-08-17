# TimeFun - Share Your Time with the World

## Overview

TimeFun is a decentralized platform where users can buy and sell shares of creators' time. Think of it as a social finance platform where:

- **Creators** can monetize their time by joining the platform and setting up their profiles
- **Users** can buy shares of creators, which gives them access to communicate with the creator
- **Share prices** follow a bonding curve - early supporters get cheaper shares, but as demand increases, so does the price

## 🚀 Quick Start

### 1. Start Local Blockchain & Deploy Contracts

```bash
# Make setup script executable (if not already)
chmod +x scripts/setup-local.sh

# Run the setup script - this will:
# - Install dependencies
# - Start Anvil (local blockchain)
# - Deploy TimeFun contract
# - Create sample creators
# - Update contract addresses in config
./scripts/setup-local.sh
```

### 2. Start the Frontend

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠 Smart Contract Features

### Core Functionality

#### For Creators:
- **Join as Creator**: `joinAsCreator(name, bio, profileImage, twitter)`
- Register on the platform with profile information
- Each creator gets a unique ID

#### For Users:
- **Buy Shares**: `buyShares(creatorId, shares)` 
- Purchase shares using ETH following a bonding curve pricing model
- **Sell Shares**: `sellShares(creatorId, shares)`
- Sell shares back to the contract
- **Check Access**: `hasAccessTo(creatorId, user)`
- Users with ≥1 share can communicate with the creator

### Pricing Model

- **Base Price**: 0.001 ETH per share
- **Price Increment**: +0.0001 ETH per existing share
- **Example**: 
  - 1st share: 0.001 ETH
  - 2nd share: 0.002 ETH  
  - 3rd share: 0.003 ETH
  - etc.

### Fee Structure

- **Creator Fee**: 5% of each transaction goes to the creator
- **Platform Fee**: 5% goes to the platform
- **User Amount**: 90% of transaction value

## 🔧 Technical Architecture

### Smart Contracts

- **TimeFun.sol**: Main contract handling all creator and share logic
- **Location**: `src/TimeFun.sol`
- **Tests**: `test/TimeFun.t.sol`

### Frontend Integration

- **Hook**: `hooks/useTimeFun.ts` - React hook for contract interaction
- **Components**: 
  - `CreatorProfilePage.tsx` - Individual creator profiles (now with randomized content)
  - `TradingChart.tsx` - Price charts for creator shares
  - `CreatorGrid.tsx` - Grid of all creators

### Contract Addresses

After running the setup script, the TimeFun contract address will be automatically updated in:
- `config/constants.ts`

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
forge test

# Run specific test with verbose output
forge test --match-test testBuyShares -vvvv

# Run tests with gas reporting
forge test --gas-report
```

### Test Coverage

- ✅ Creator registration
- ✅ Share buying/selling
- ✅ Price calculations (bonding curve)
- ✅ Access control
- ✅ Fee distribution
- ✅ Edge cases and error handling

## 📊 Local Development Setup

### Default Anvil Account

When using the local setup, you'll have access to:

- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- **Balance**: 10,000 ETH

### Sample Creators

The deployment script automatically creates 3 sample creators:

1. **Alex Chen** - Crypto trader and DeFi expert
2. **Sarah Miller** - NFT artist and Web3 creator  
3. **David Rodriguez** - Blockchain developer and smart contract auditor

## 🎨 UI Features

### Randomized Creator Content

Each creator profile now displays unique randomized content based on their ID:

- **Professions**: Varied roles (Founder, Trader, Artist, Developer, etc.)
- **Mottos**: Different value propositions
- **Descriptions**: Unique bio content
- **Ratings**: Randomized ratings and review counts
- **Pricing**: Varied message pricing

### Interactive Elements

- **Buy/Sell Shares**: Direct integration with the smart contract
- **Real-time Price Updates**: Shows current share prices
- **Trading Charts**: Visual representation of price history
- **Access Control**: Messaging only available to shareholders

## 🔗 Contract Interaction Examples

### Using Foundry Scripts

```bash
# Deploy to local network
forge script script/DeployTimeFunLocal.s.sol --rpc-url http://localhost:8545 --broadcast

# Deploy to testnet (requires PRIVATE_KEY env var)
forge script script/DeployTimeFun.s.sol --rpc-url $RPC_URL --broadcast
```

### Direct Contract Calls

```bash
# Get all creators
cast call $TIMEFUN_ADDRESS "getAllCreators()(uint256[])" --rpc-url http://localhost:8545

# Get creator info
cast call $TIMEFUN_ADDRESS "getCreatorInfo(uint256)(address,string,string,string,string,uint256,uint256)" 1 --rpc-url http://localhost:8545

# Buy shares (from default account)
cast send $TIMEFUN_ADDRESS "buyShares(uint256,uint256)" 1 5 --value 0.015ether --private-key $PRIVATE_KEY --rpc-url http://localhost:8545
```

## 🚀 Next Steps

This implementation provides a solid foundation for a time-sharing platform. Potential enhancements:

1. **Communication Layer**: Implement actual messaging/video call functionality
2. **Advanced Charts**: Add more sophisticated trading analytics
3. **Creator Tools**: Dashboard for creators to manage their profiles and earnings
4. **Mobile App**: React Native implementation
5. **L2 Deployment**: Deploy to Avalanche subnets for lower fees

## 📝 Notes

- The platform currently runs on a local Anvil blockchain (Chain ID: 31337)
- All transactions are simulated with test ETH
- The bonding curve creates natural price discovery for creator value
- The randomized content ensures each creator feels unique and engaging

---

**Happy building! 🏗️** 