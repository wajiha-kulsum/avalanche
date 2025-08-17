'use client'

import { useTokenInfo } from '../hooks/useTimeFun'
import { Address, formatEther } from 'viem'
import { USE_MOCK_DATA } from '../config/contracts'
import { MockCreatorCard } from './MockCreatorCard'

interface CreatorCardProps {
  tokenAddress: Address
  onBuyTimeClick: (tokenAddress: Address) => void
  index?: number
}

export function CreatorCard({ tokenAddress, onBuyTimeClick, index }: CreatorCardProps) {
  // Use mock data if contracts aren't deployed
  if (USE_MOCK_DATA) {
    return <MockCreatorCard tokenAddress={tokenAddress} onBuyTimeClick={onBuyTimeClick} index={index} />
  }

  const { tokenInfo, isLoading } = useTokenInfo(tokenAddress)

  if (isLoading) {
    return (
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 animate-pulse">
        <div className="flex h-64">
          <div className="w-1/2 bg-gray-700"></div>
          <div className="w-1/2 p-5">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded mb-4"></div>
            <div className="h-3 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!tokenInfo) {
    return null
  }

  const marketCapFormatted = formatEther(tokenInfo.marketCap)
  const currentPriceFormatted = formatEther(tokenInfo.currentPrice)
  
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
        </div>

        {/* Right Half - Token Info */}
        <div className="w-1/2 p-5 flex flex-col">
          {/* Creator info */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 text-xs">
              <span className="text-gray-400">created by</span>
              <span className="text-green-400">🟢</span>
              <span className="text-white font-medium">
                {tokenInfo.creator.slice(0, 6)}...{tokenInfo.creator.slice(-4)}
              </span>
            </div>
            <div className="text-gray-400 text-xs mb-1">
              market cap: <span className="text-green-400 font-semibold">${parseFloat(marketCapFormatted).toFixed(2)}</span>
            </div>
            <div className="text-gray-400 text-xs mb-1">
              price: <span className="text-white">${parseFloat(currentPriceFormatted).toFixed(4)}</span>
            </div>
            <div className="text-gray-400 text-xs">
              supply: <span className="text-white">{parseFloat(formatEther(tokenInfo.totalSupply)).toFixed(0)}</span>
            </div>
          </div>

          {/* Token Name */}
          <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 group-hover:text-green-300 transition-colors">
            {tokenInfo.name}
          </h3>

          {/* Description placeholder */}
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
            {tokenInfo.symbol} - A creator token with bonding curve mechanics. Trade to access exclusive content and communications.
          </p>

          {/* Buy Time Button */}
          <div className="mt-auto">
            <button 
              onClick={() => onBuyTimeClick(tokenAddress)}
              className="w-full py-2 px-3 bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white text-xs font-semibold rounded-lg opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:shadow-lg group-hover:shadow-green-500/25 group-hover:scale-105 transition-all duration-300 ease-out hover:from-green-500 hover:to-emerald-500"
            >
              Buy Time
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 