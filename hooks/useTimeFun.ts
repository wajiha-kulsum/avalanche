'use client'

import { useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi'
import { parseEther, formatEther, Address } from 'viem'
import { useState, useEffect } from 'react'

// Contract ABIs (simplified for key functions)
const FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "symbol", "type": "string"},
      {"internalType": "string", "name": "creatorName", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "profileImage", "type": "string"}
    ],
    "name": "createToken",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTokens",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "limit", "type": "uint256"}],
    "name": "getTrendingTokens",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
    "name": "getTokenInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "symbol", "type": "string"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "uint256", "name": "totalSupply", "type": "uint256"},
      {"internalType": "uint256", "name": "currentPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "marketCap", "type": "uint256"},
      {"internalType": "bool", "name": "tradingEnabled", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const TOKEN_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "minTokensOut", "type": "uint256"}],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "minEthOut", "type": "uint256"}
    ],
    "name": "sell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenAmount", "type": "uint256"}],
    "name": "getBuyPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenAmount", "type": "uint256"}],
    "name": "getSellPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "ethAmount", "type": "uint256"}],
    "name": "calculateTokensForEth",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMarketCap",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "creatorName",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "minutes", "type": "uint256"}],
    "name": "requestVideoCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "minutes", "type": "uint256"}],
    "name": "requestVoiceCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "tokensAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "ethAmount", "type": "uint256"}
    ],
    "name": "Buy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "seller", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "tokensAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "ethAmount", "type": "uint256"}
    ],
    "name": "Sell",
    "type": "event"
  }
] as const

import { FACTORY_ADDRESS, USE_MOCK_DATA, SAMPLE_TOKENS } from '../config/contracts'

// Types
export interface TokenInfo {
  address: Address
  name: string
  symbol: string
  creator: Address
  totalSupply: bigint
  currentPrice: bigint
  marketCap: bigint
  tradingEnabled: boolean
  creatorName?: string
  description?: string
}

export interface PriceData {
  timestamp: number
  price: number
  volume: number
}

// Hook to get all tokens from factory
export function useAllTokens() {
  const { data: tokens, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getAllTokens',
    query: {
      enabled: !USE_MOCK_DATA
    }
  })

  // Return mock data if contracts not deployed
  if (USE_MOCK_DATA) {
    return {
      tokens: SAMPLE_TOKENS,
      isLoading: false,
      error: null
    }
  }

  return {
    tokens: tokens || [],
    isLoading,
    error
  }
}

// Hook to get trending tokens
export function useTrendingTokens(limit: number = 10) {
  const { data: tokens, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getTrendingTokens',
    args: [BigInt(limit)],
    query: {
      enabled: !USE_MOCK_DATA
    }
  })

  // Return mock data if contracts not deployed
  if (USE_MOCK_DATA) {
    return {
      tokens: SAMPLE_TOKENS.slice(0, limit),
      isLoading: false,
      error: null
    }
  }

  return {
    tokens: tokens || [],
    isLoading,
    error
  }
}

// Hook to get token info
export function useTokenInfo(tokenAddress: Address) {
  const { data, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getTokenInfo',
    args: [tokenAddress],
  })

  const tokenInfo: TokenInfo | null = data ? {
    address: tokenAddress,
    name: data[0],
    symbol: data[1],
    creator: data[2],
    totalSupply: data[3],
    currentPrice: data[4],
    marketCap: data[5],
    tradingEnabled: data[6]
  } : null

  return {
    tokenInfo,
    isLoading,
    error
  }
}

// Hook to get token balance for user
export function useTokenBalance(tokenAddress: Address, userAddress?: Address) {
  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })

  return {
    balance: balance || 0n,
    balanceFormatted: balance ? formatEther(balance) : '0',
    isLoading
  }
}

// Hook to buy tokens
export function useBuyTokens() {
  const { writeContract, isPending, error } = useWriteContract()

  const buyTokens = async (tokenAddress: Address, ethAmount: string, slippage: number = 5) => {
    try {
      const ethValue = parseEther(ethAmount)
      const minTokensOut = 0n // Could calculate based on slippage
      
      await writeContract({
        address: tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'buy',
        args: [minTokensOut],
        value: ethValue,
      })
    } catch (err) {
      console.error('Buy failed:', err)
      throw err
    }
  }

  return {
    buyTokens,
    isPending,
    error
  }
}

// Hook to sell tokens
export function useSellTokens() {
  const { writeContract, isPending, error } = useWriteContract()

  const sellTokens = async (tokenAddress: Address, tokenAmount: string, slippage: number = 5) => {
    try {
      const tokenValue = parseEther(tokenAmount)
      const minEthOut = 0n // Could calculate based on slippage
      
      await writeContract({
        address: tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'sell',
        args: [tokenValue, minEthOut],
      })
    } catch (err) {
      console.error('Sell failed:', err)
      throw err
    }
  }

  return {
    sellTokens,
    isPending,
    error
  }
}

// Hook to get buy/sell prices
export function useTokenPrices(tokenAddress: Address, amount: string = '1') {
  const tokenAmount = parseEther(amount)
  
  const { data: buyPrice } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'getBuyPrice',
    args: [tokenAmount],
  })

  const { data: sellPrice } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'getSellPrice',
    args: [tokenAmount],
    query: {
      enabled: tokenAmount > 0n
    }
  })

  return {
    buyPrice: buyPrice || 0n,
    sellPrice: sellPrice || 0n,
    buyPriceFormatted: buyPrice ? formatEther(buyPrice) : '0',
    sellPriceFormatted: sellPrice ? formatEther(sellPrice) : '0'
  }
}

// Hook to watch price changes and build chart data
export function usePriceHistory(tokenAddress: Address) {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([])

  // Watch for buy/sell events to update price history
  useWatchContractEvent({
    address: tokenAddress,
    abi: TOKEN_ABI,
    eventName: 'Buy',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const price = Number(formatEther(log.args.ethAmount || 0n)) / Number(formatEther(log.args.tokensAmount || 1n))
        setPriceHistory(prev => [...prev, {
          timestamp: Date.now(),
          price,
          volume: Number(formatEther(log.args.ethAmount || 0n))
        }].slice(-100)) // Keep last 100 data points
      })
    }
  })

  useWatchContractEvent({
    address: tokenAddress,
    abi: TOKEN_ABI,
    eventName: 'Sell',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const price = Number(formatEther(log.args.ethAmount || 0n)) / Number(formatEther(log.args.tokensAmount || 1n))
        setPriceHistory(prev => [...prev, {
          timestamp: Date.now(),
          price,
          volume: Number(formatEther(log.args.ethAmount || 0n))
        }].slice(-100))
      })
    }
  })

  return priceHistory
}

// Hook for communication requests
export function useCommunication() {
  const { writeContract, isPending, error } = useWriteContract()

  const requestVideoCall = async (tokenAddress: Address, minutes: number, pricePerMinute: bigint) => {
    const totalCost = pricePerMinute * BigInt(minutes)
    
    await writeContract({
      address: tokenAddress,
      abi: TOKEN_ABI,
      functionName: 'requestVideoCall',
      args: [BigInt(minutes)],
      value: totalCost,
    })
  }

  const requestVoiceCall = async (tokenAddress: Address, minutes: number, pricePerMinute: bigint) => {
    const totalCost = pricePerMinute * BigInt(minutes)
    
    await writeContract({
      address: tokenAddress,
      abi: TOKEN_ABI,
      functionName: 'requestVoiceCall',
      args: [BigInt(minutes)],
      value: totalCost,
    })
  }

  const sendMessage = async (tokenAddress: Address, messagePrice: bigint) => {
    await writeContract({
      address: tokenAddress,
      abi: TOKEN_ABI,
      functionName: 'sendMessage',
      value: messagePrice,
    })
  }

  return {
    requestVideoCall,
    requestVoiceCall,
    sendMessage,
    isPending,
    error
  }
} 