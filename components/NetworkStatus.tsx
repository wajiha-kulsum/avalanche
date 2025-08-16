'use client'

import { useNetworkStatus } from '../hooks/useWallet'
import { useWallet } from '../hooks/useWallet'

export function NetworkStatus() {
  const { isConnected, isCorrectNetwork, currentChainId, targetChainId } = useNetworkStatus()
  const { switchNetwork } = useWallet()

  if (!isConnected) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        <span className="text-sm">Not Connected</span>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-sm text-red-500">Wrong Network</span>
        <button
          onClick={() => switchNetwork(targetChainId)}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Switch to Fuji
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-green-500">
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
      <span className="text-sm">Avalanche Fuji</span>
    </div>
  )
} 