# 🔥 Local Development Setup

Get Time.fun running locally with Anvil blockchain in minutes!

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
npm run setup-local
```

This script will:
- ✅ Install Foundry dependencies
- ✅ Build and test contracts
- ✅ Start Anvil local blockchain
- ✅ Deploy contracts with sample data
- ✅ Generate config files automatically

### Option 2: Manual Setup

1. **Start Anvil blockchain:**
```bash
npm run anvil
# or
anvil --host 0.0.0.0 --port 8545 --chain-id 31337
```

2. **Deploy contracts:**
```bash
npm run deploy-local
```

3. **Start frontend:**
```bash
npm run dev
```

## 🔧 Wallet Configuration

### Add Anvil Network to MetaMask:
- **Network Name:** Anvil Local
- **RPC URL:** http://127.0.0.1:8545
- **Chain ID:** 31337
- **Currency Symbol:** ETH

### Import Test Account:
**Private Key:** `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- This account has 10,000 ETH for testing
- Pre-funded and ready to use

## 🎯 What's Deployed

The local setup creates:
- **TimeFunFactory** contract
- **3 Creator tokens:**
  - Kawz Token (KAWZ) - Founder
  - Sarah Chen Token (SARAH) - Digital Artist  
  - Alex Rivera Token (ALEX) - Tech Educator
- **Initial liquidity** for testing trades

## 🧪 Testing Features

### Trading:
1. Connect wallet to Anvil Local
2. Navigate to any creator profile
3. Buy/sell tokens with real transactions
4. Watch candlestick charts update

### Communication:
1. Click "Send Direct Message" on creator profile
2. Pay with ETH to send message
3. Transaction gets processed on local blockchain

### Real-time Updates:
- Charts update with real price data
- Balance tracking works
- Transaction states show properly

## 📋 Available Scripts

```bash
# Full local setup
npm run setup-local

# Start blockchain only
npm run anvil

# Deploy contracts only
npm run deploy-local

# Run contract tests
npm run test-contracts

# Start frontend
npm run dev
```

## 🐛 Troubleshooting

### Port 8545 already in use:
```bash
# Kill existing process
pkill -f anvil
# Then restart
npm run anvil
```

### Contracts not found:
```bash
# Redeploy contracts
npm run deploy-local
```

### Wallet connection issues:
1. Make sure Anvil is running on port 8545
2. Check network settings in wallet
3. Try refreshing the page

## 🎉 Success!

When everything is working:
- ✅ Anvil running on http://127.0.0.1:8545
- ✅ Contracts deployed with real addresses
- ✅ Frontend connected to local network
- ✅ Real trading with fake ETH

**Happy testing! 🚀** 