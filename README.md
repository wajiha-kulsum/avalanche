# 🚀 Time.fun Clone - Avalanche Fuji

A decentralized social platform where creators can monetize their time through bonding curve tokens. Built on Avalanche Fuji testnet with Next.js, Foundry, and TradingView charts.

![Time.fun Clone](https://img.shields.io/badge/Status-Demo%20Ready-green)
![Avalanche](https://img.shields.io/badge/Network-Avalanche%20Fuji-red)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)
![Foundry](https://img.shields.io/badge/Contracts-Foundry-blue)

## 🌟 Features

### ✅ Implemented
- **🎨 Beautiful UI**: Modern, responsive design with green theme
- **📊 Real Trading Charts**: TradingView Lightweight Charts integration
- **💰 Bonding Curve Tokens**: Quadratic pricing mechanism for creator tokens
- **🔗 Wallet Integration**: RainbowKit + wagmi for seamless Web3 connection
- **📱 Creator Profiles**: Dedicated pages for each creator with trading interface
- **💬 Communication Options**: Video calls, voice calls, and messaging
- **🎯 Demo Mode**: Works without deployed contracts for development

### 🔧 Smart Contracts
- **TimeFunFactory**: Deploy and manage creator tokens
- **CreatorToken**: ERC20 tokens with bonding curve mechanics
- **Communication Features**: Built-in payment system for creator services
- **Trading Threshold**: Enables secondary trading after certain supply

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js 18+
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd avalanche

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application running in demo mode.

## 🏗️ Project Structure

```
├── src/                    # Smart contracts (Solidity)
│   ├── CreatorToken.sol   # Main token contract with bonding curve
│   └── TimeFunFactory.sol # Factory for deploying tokens
├── components/            # React components
│   ├── TradingChart.tsx   # Real-time trading interface
│   ├── CreatorCard.tsx    # Creator token display
│   └── TopCreatorsSection.tsx # Main creators grid
├── hooks/                 # Custom React hooks
│   └── useTimeFun.ts     # Smart contract interactions
├── config/               # Configuration files
│   └── contracts.ts      # Contract addresses and settings
└── app/                  # Next.js app router pages
    └── creator/[id]/     # Dynamic creator profile pages
```

## 🔧 Smart Contract Deployment

### 1. Setup Environment
```bash
# Copy environment template
cp env.example .env

# Add your private key
echo "PRIVATE_KEY=your_private_key_here" >> .env
```

### 2. Deploy to Fuji Testnet
```bash
# Compile contracts
forge build

# Run tests
forge test -vv

# Deploy to Fuji
forge script script/Deploy.s.sol --rpc-url https://api.avax-test.network/ext/bc/C/rpc --broadcast --verify
```

### 3. Update Frontend Configuration
```typescript
// config/contracts.ts
export const FACTORY_ADDRESS: Address = '0x...' // Your deployed factory address
```

## 💡 Key Features Explained

### 🎯 Bonding Curve Mechanics
- **Quadratic Pricing**: Price increases with supply²
- **Creator Fees**: 5% of all trades go to creator
- **Trading Threshold**: Secondary trading unlocked at 800k tokens
- **Max Supply**: 1M tokens per creator

### 📊 Trading Interface
- **Real-time Charts**: TradingView Lightweight Charts
- **Buy/Sell Interface**: Direct smart contract interaction
- **Price Discovery**: Live price updates from contract events
- **Slippage Protection**: Built-in MEV protection

### 💬 Communication Features
- **Video Calls**: Pay per minute for video sessions
- **Voice Calls**: Lower cost audio-only option
- **Direct Messages**: One-time payment messaging
- **Creator Control**: Creators set their own rates

## 🎨 UI Components

### CreatorCard
Displays creator token information with real-time data:
- Market cap and current price
- Total supply and trading status
- Hover effects and smooth animations
- Demo mode with mock data

### TradingChart
Professional trading interface:
- Real-time price charts
- Buy/sell functionality
- Balance display
- Transaction status

## 🔗 Web3 Integration

### Wallet Connection
- **RainbowKit**: Beautiful wallet connection UI
- **Multiple Wallets**: MetaMask, Coinbase, WalletConnect
- **Avalanche Support**: Optimized for Avalanche ecosystem

### Smart Contract Hooks
- **useTimeFun**: Main contract interaction hook
- **Real-time Updates**: Event-driven state updates
- **Error Handling**: Comprehensive error management
- **Mock Data**: Fallback for development

## 🧪 Development Mode

The application runs in demo mode when smart contracts aren't deployed:
- Mock creator tokens with realistic data
- Functional UI without blockchain interaction
- Perfect for development and testing
- Seamless transition to production

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to your preferred platform
```

### Smart Contracts (Avalanche Fuji)
```bash
# Deploy with verification
forge script script/Deploy.s.sol --rpc-url fuji --broadcast --verify

# Update frontend config with deployed addresses
```

## 🎯 Next Steps

### Phase 1: Core Features ✅
- [x] Smart contract development
- [x] Basic UI implementation
- [x] Wallet integration
- [x] Trading interface

### Phase 2: Enhanced Features (Coming Soon)
- [ ] Creator profiles and verification
- [ ] Advanced chart analytics
- [ ] Mobile app development
- [ ] Mainnet deployment

### Phase 3: Advanced Features
- [ ] NFT integration
- [ ] DAO governance
- [ ] Cross-chain support
- [ ] Advanced trading features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TradingView**: Lightweight Charts library
- **Avalanche**: High-performance blockchain platform
- **RainbowKit**: Beautiful wallet connection experience
- **Foundry**: Fast and flexible Ethereum development toolkit

---

**Built with ❤️ for the decentralized creator economy**
