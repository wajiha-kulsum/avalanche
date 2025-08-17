'use client'

import { Address } from 'viem'

interface MockCreatorCardProps {
  tokenAddress: Address
  onBuyTimeClick: (tokenAddress: Address) => void
  index?: number
}

export function MockCreatorCard({ tokenAddress, onBuyTimeClick, index = 0 }: MockCreatorCardProps) {
  // Mock data based on token address
  const mockTokens = [
    {
      name: "Sample Creator Token",
      symbol: "SCT",
      creator: "0x1234...5678",
      marketCap: "1.25",
      currentPrice: "0.0012",
      totalSupply: "850000",
      tradingEnabled: true,
      description: "A creative digital artist specializing in AI-generated art and interactive experiences."
    },
    {
      name: "Test Artist Token", 
      symbol: "TAT",
      creator: "0x9876...4321",
      marketCap: "0.87",
      currentPrice: "0.0008",
      totalSupply: "650000",
      tradingEnabled: false,
      description: "Music producer and content creator building the future of decentralized entertainment."
    },
    {
      name: "Demo Creator Token",
      symbol: "DCT", 
      creator: "0xABCD...EFGH",
      marketCap: "2.14",
      currentPrice: "0.0018",
      totalSupply: "1200000",
      tradingEnabled: true,
      description: "Tech educator creating tutorials and courses on blockchain development and DeFi."
    }
  ]

  const tokenInfo = mockTokens[index % mockTokens.length]
  
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-white transition-all duration-300 group">
      <div className="flex h-64">
        {/* Left Half - Token Image */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {tokenInfo.symbol.slice(0, 2)}
            </span>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Trading status */}
          {tokenInfo.tradingEnabled && (
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                TRADING
              </div>
            </div>
          )}

          {/* Demo badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-yellow-600/80 text-white text-xs px-2 py-1 rounded-full font-bold">
              DEMO
            </div>
          </div>
        </div>

        {/* Right Half - Token Info */}
        <div className="w-1/2 p-5 flex flex-col">
          {/* Creator info */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 text-xs">
              <span className="text-gray-400">created by</span>
              <span className="text-green-400">🟢</span>
              <span className="text-white font-medium">
                {tokenInfo.creator}
              </span>
            </div>
            <div className="text-gray-400 text-xs mb-1">
              market cap: <span className="text-green-400 font-semibold">${tokenInfo.marketCap}</span>
            </div>
            <div className="text-gray-400 text-xs mb-1">
              price: <span className="text-white">${tokenInfo.currentPrice}</span>
            </div>
            <div className="text-gray-400 text-xs">
              supply: <span className="text-white">{tokenInfo.totalSupply}</span>
            </div>
          </div>

          {/* Token Name */}
          <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 group-hover:text-green-300 transition-colors">
            {tokenInfo.name}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
            {tokenInfo.description}
          </p>

          {/* Buy Time Button */}
          <div className="mt-auto">
            <button 
              onClick={() => onBuyTimeClick(tokenAddress)}
              className="w-full py-2 px-3 bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white text-xs font-semibold rounded-lg opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:shadow-lg group-hover:shadow-green-500/25 group-hover:scale-105 transition-all duration-300 ease-out hover:from-green-500 hover:to-emerald-500"
            >
              Buy Time (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 