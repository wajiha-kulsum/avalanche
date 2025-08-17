'use client'

import { useState, useEffect } from 'react'
import { parseEther, formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { useTimeFun, useCreatorInfo, useSharePrice, useUserShares, useSellPrice } from './useTimeFun'
import toast from 'react-hot-toast'

interface CreatorTokenData {
  name: string
  symbol: string
  currentPrice: number
  marketCap: number
  totalSupply: number
  tradingEnabled: boolean
  userBalance: string
  isLoading: boolean
}

// Mock price history for charts
const generateMockPriceHistory = (creatorId: string) => {
  const seed = parseInt(creatorId) || 1
  const basePrice = 0.001 + (seed * 0.0002)
  const dataPoints = []
  
  for (let i = 0; i < 30; i++) {
    const variation = (Math.sin(i * 0.5 + seed) * 0.0001) + (Math.random() * 0.0002 - 0.0001)
    dataPoints.push({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      price: basePrice + variation * i,
      volume: Math.random() * 1000 + 100
    })
  }
  
  return dataPoints
}

export function useCreatorToken(creatorId: string) {
  const { address: userAddress } = useAccount()
  const creatorIdNum = parseInt(creatorId) || 0
  
  // TimeFun contract hooks
  const { 
    purchaseShares, 
    sellCreatorShares, 
    isPending, 
    isConfirming,
    isConfirmed 
  } = useTimeFun()
  
  const { creator, refetch: refetchCreator } = useCreatorInfo(creatorIdNum)
  const { shares: userShares, refetch: refetchShares } = useUserShares(creatorIdNum)
  const { priceInEth: sharePrice } = useSharePrice(creatorIdNum, 1)
  const { sellPriceInEth } = useSellPrice(creatorIdNum, 1)
  
  // Mock price history
  const [priceHistory] = useState(() => generateMockPriceHistory(creatorId))
  
  // Safe price parsing with fallbacks
  const safeParsedSharePrice = parseFloat(sharePrice) || 0.001
  const safeParsedSellPrice = parseFloat(sellPriceInEth) || 0.001
  
  // Token data compatible with existing UI
  const tokenData: CreatorTokenData = {
    name: creator?.name || `Creator ${creatorId}`,
    symbol: `CR${creatorId}`,
    currentPrice: safeParsedSharePrice,
    marketCap: creator ? creator.totalShares * safeParsedSharePrice : 0,
    totalSupply: creator?.totalShares || 0,
    tradingEnabled: true,
    userBalance: userShares.toString(),
    isLoading: false,
  }

  // Buy shares function - SIMPLIFIED TO AVOID CALCULATION ERRORS
  const buyCreatorTokens = async (ethAmount: string, slippage: number = 5) => {
    if (!userAddress || creatorIdNum === 0) {
      toast.error('Please connect your wallet')
      throw new Error('User not connected or invalid creator ID')
    }
    
    if (!creator) {
      toast.error('Creator not found')
      throw new Error('Creator not found')
    }
    
    try {
      // Validate inputs
      const ethValue = parseFloat(ethAmount)
      if (!ethValue || ethValue <= 0 || !isFinite(ethValue)) {
        toast.error('Please enter a valid ETH amount')
        throw new Error('Invalid ETH amount')
      }
      
      // FIXED: Always buy a reasonable number of shares (1-10) based on ETH amount
      let sharesToBuy = 1
      if (ethValue >= 0.01) sharesToBuy = Math.min(10, Math.floor(ethValue / 0.001))
      else sharesToBuy = 1
      
      console.log(`FIXED CALCULATION: Buying ${sharesToBuy} shares for ${ethAmount} ETH`)
      
      // Show loading toast
      const toastId = toast.loading(`Buying ${sharesToBuy} shares...`)
      
      try {
        await purchaseShares(creatorIdNum, sharesToBuy, ethAmount)
        
        toast.dismiss(toastId)
        toast.success(`Successfully bought ${sharesToBuy} shares!`)
        
        // Refetch data after successful purchase
        setTimeout(() => {
          refetchCreator()
          refetchShares()
        }, 3000)
        
      } catch (txError: any) {
        toast.dismiss(toastId)
        
        if (txError.message?.includes('User rejected')) {
          toast.error('Transaction cancelled by user')
        } else if (txError.message?.includes('insufficient funds')) {
          toast.error('Insufficient funds for transaction')
        } else if (txError.message?.includes('Insufficient payment')) {
          toast.error('Not enough ETH sent for shares')
        } else if (txError.message?.includes('gas')) {
          toast.error('Transaction failed due to gas issues')
        } else {
          toast.error('Transaction failed. Please try again.')
        }
        throw txError
      }
      
    } catch (error) {
      console.error('Failed to buy creator shares:', error)
      throw error
    }
  }

  // Sell shares function
  const sellCreatorTokens = async (tokenAmount: string, slippage: number = 5) => {
    if (!userAddress || creatorIdNum === 0) {
      toast.error('Please connect your wallet')
      throw new Error('User not connected or invalid creator ID')
    }
    
    try {
      const sharesToSell = parseInt(tokenAmount)
      
      // Validate inputs
      if (!sharesToSell || sharesToSell < 1 || !isFinite(sharesToSell)) {
        toast.error('Please enter a valid number of shares to sell')
        throw new Error('Invalid number of shares to sell')
      }
      
      if (sharesToSell > userShares) {
        toast.error(`You only own ${userShares} shares`)
        throw new Error(`You only own ${userShares} shares`)
      }
      
      console.log(`Selling ${sharesToSell} shares`)
      
      // Show loading toast
      const toastId = toast.loading(`Selling ${sharesToSell} shares...`)
      
      try {
        await sellCreatorShares(creatorIdNum, sharesToSell)
        
        toast.dismiss(toastId)
        toast.success(`Successfully sold ${sharesToSell} shares!`)
        
        // Refetch data after successful sale
        setTimeout(() => {
          refetchCreator()
          refetchShares()
        }, 3000)
        
      } catch (txError: any) {
        toast.dismiss(toastId)
        
        if (txError.message?.includes('User rejected')) {
          toast.error('Transaction cancelled by user')
        } else if (txError.message?.includes('Insufficient shares')) {
          toast.error('You don\'t have enough shares to sell')
        } else {
          toast.error('Transaction failed. Please try again.')
        }
        throw txError
      }
      
    } catch (error) {
      console.error('Failed to sell creator shares:', error)
      throw error
    }
  }

  // Communication functions (mock for now)
  const requestVideo = async (minutes: number) => {
    if (userShares < 1) {
      toast.error('You need to own at least 1 share to request video calls')
      throw new Error('You need to own at least 1 share to request video calls')
    }
    
    // Mock video call request
    toast.success(`Video call requested for ${minutes} minutes`)
    console.log(`Video call requested for ${minutes} minutes`)
    return Promise.resolve()
  }

  const requestVoice = async (minutes: number) => {
    if (userShares < 1) {
      toast.error('You need to own at least 1 share to request voice calls')
      throw new Error('You need to own at least 1 share to request voice calls')
    }
    
    // Mock voice call request
    toast.success(`Voice call requested for ${minutes} minutes`)
    console.log(`Voice call requested for ${minutes} minutes`)
    return Promise.resolve()
  }

  const sendDirectMessage = async () => {
    if (userShares < 1) {
      toast.error('You need to own at least 1 share to send messages')
      throw new Error('You need to own at least 1 share to send messages')
    }
    
    // Mock message sending
    toast.success('Direct message sent successfully!')
    console.log('Direct message sent')
    return Promise.resolve()
  }

  // Calculate estimated costs - SIMPLIFIED
  const getEstimatedCost = (ethAmount: string) => {
    const amount = parseFloat(ethAmount)
    if (!amount || !isFinite(amount)) {
      return {
        ethCost: 0,
        usdCost: 0,
        estimatedTokens: 0,
      }
    }
    
    let estimatedShares = 1
    if (amount >= 0.01) estimatedShares = Math.min(10, Math.floor(amount / 0.001))
    
    return {
      ethCost: amount,
      usdCost: amount * 3000, // Assume ETH = $3000 for demo
      estimatedTokens: estimatedShares,
    }
  }

  const getEstimatedReturn = (tokenAmount: string) => {
    const amount = parseFloat(tokenAmount)
    if (!amount || !isFinite(amount)) {
      return {
        tokenAmount: 0,
        ethReturn: 0,
        usdReturn: 0,
      }
    }
    
    const ethReturn = amount * safeParsedSellPrice * 0.9 // 10% fees
    return {
      tokenAmount: amount,
      ethReturn,
      usdReturn: ethReturn * 3000,
    }
  }

  return {
    // Token data
    tokenData,
    tokenAddress: creator?.address || '0x',
    priceHistory,
    
    // Trading functions
    buyCreatorTokens,
    sellCreatorTokens,
    isBuying: isPending,
    isSelling: isPending,
    buyError: null,
    sellError: null,
    
    // Communication functions
    requestVideo,
    requestVoice,
    sendDirectMessage,
    isCommunicating: isPending,
    
    // Utility functions
    getEstimatedCost,
    getEstimatedReturn,
    
    // Prices
    buyPriceFormatted: sharePrice,
    sellPriceFormatted: sellPriceInEth,
    
    // User state
    userAddress,
    isConnected: !!userAddress,
  }
} 