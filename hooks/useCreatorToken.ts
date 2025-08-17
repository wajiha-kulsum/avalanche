'use client'

import { useState, useEffect } from 'react'
import { Address, parseEther, formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { useBuyTokens, useSellTokens, useTokenPrices, useTokenBalance, usePriceHistory, useCommunication } from './useTimeFun'

// Creator to token address mapping
// Try to load local contracts first, fallback to mock addresses
let CREATOR_TOKEN_MAPPING: Record<string, Address> = {}

try {
  // Try to import local contracts if they exist
  const localContracts = require('../config/local-contracts')
  if (localContracts?.LOCAL_CONTRACTS?.tokens) {
    CREATOR_TOKEN_MAPPING = localContracts.LOCAL_CONTRACTS.tokens
  }
} catch (error) {
  // Fallback to mock addresses for development
  CREATOR_TOKEN_MAPPING = {
    '1': '0x1234567890123456789012345678901234567890' as Address, // Kawz
    '2': '0x2345678901234567890123456789012345678901' as Address, // Sarah Chen
    '3': '0x3456789012345678901234567890123456789012' as Address, // Alex Rivera
    '4': '0x4567890123456789012345678901234567890123' as Address, // Maya Patel
    '5': '0x5678901234567890123456789012345678901234' as Address, // Jordan Kim
    '6': '0x6789012345678901234567890123456789012345' as Address, // Casey Morgan
    '7': '0x7890123456789012345678901234567890123456' as Address, // Riley Chen
    '8': '0x8901234567890123456789012345678901234567' as Address, // Sam Taylor
    '9': '0x9012345678901234567890123456789012345678' as Address, // Avery Johnson
  }
}

// Mock token info for development
const MOCK_TOKEN_INFO: Record<string, {
  name: string
  symbol: string
  currentPrice: number
  marketCap: number
  totalSupply: number
  tradingEnabled: boolean
}> = {
  '1': {
    name: 'Kawz Token',
    symbol: 'KAWZ',
    currentPrice: 0.0125,
    marketCap: 12.5,
    totalSupply: 850000,
    tradingEnabled: true,
  },
  '2': {
    name: 'Sarah Chen Token',
    symbol: 'SARAH',
    currentPrice: 0.0089,
    marketCap: 8.9,
    totalSupply: 750000,
    tradingEnabled: true,
  },
  '3': {
    name: 'Alex Rivera Token',
    symbol: 'ALEX',
    currentPrice: 0.0156,
    marketCap: 15.6,
    totalSupply: 920000,
    tradingEnabled: true,
  },
  // Add more as needed...
}

interface CreatorTokenData {
  tokenAddress: Address
  name: string
  symbol: string
  currentPrice: number
  marketCap: number
  totalSupply: number
  tradingEnabled: boolean
  userBalance: string
  isLoading: boolean
}

export function useCreatorToken(creatorId: string) {
  const { address: userAddress } = useAccount()
  const tokenAddress = CREATOR_TOKEN_MAPPING[creatorId]
  
  // Get token data from hooks
  const { buyTokens, isPending: isBuying, error: buyError } = useBuyTokens()
  const { sellTokens, isPending: isSelling, error: sellError } = useSellTokens()
  const { buyPriceFormatted, sellPriceFormatted } = useTokenPrices(tokenAddress || '0x' as Address, '1')
  const { balanceFormatted, isLoading: balanceLoading } = useTokenBalance(tokenAddress || '0x' as Address, userAddress)
  const priceHistory = usePriceHistory(tokenAddress || '0x' as Address)
  const { requestVideoCall, requestVoiceCall, sendMessage, isPending: isCommunicating } = useCommunication()

  // Mock data fallback
  const mockData = MOCK_TOKEN_INFO[creatorId]
  
  const tokenData: CreatorTokenData = {
    tokenAddress: tokenAddress || '0x' as Address,
    name: mockData?.name || `Creator ${creatorId} Token`,
    symbol: mockData?.symbol || `CR${creatorId}`,
    currentPrice: mockData?.currentPrice || 0.01,
    marketCap: mockData?.marketCap || 10,
    totalSupply: mockData?.totalSupply || 1000000,
    tradingEnabled: mockData?.tradingEnabled || true,
    userBalance: balanceFormatted,
    isLoading: balanceLoading,
  }

  // Buy function
  const buyCreatorTokens = async (ethAmount: string, slippage: number = 5) => {
    if (!tokenAddress || !userAddress) {
      throw new Error('Token address or user address not available')
    }
    
    try {
      await buyTokens(tokenAddress, ethAmount, slippage)
    } catch (error) {
      console.error('Failed to buy creator tokens:', error)
      throw error
    }
  }

  // Sell function
  const sellCreatorTokens = async (tokenAmount: string, slippage: number = 5) => {
    if (!tokenAddress || !userAddress) {
      throw new Error('Token address or user address not available')
    }
    
    try {
      await sellTokens(tokenAddress, tokenAmount, slippage)
    } catch (error) {
      console.error('Failed to sell creator tokens:', error)
      throw error
    }
  }

  // Communication functions
  const requestVideo = async (minutes: number) => {
    if (!tokenAddress) throw new Error('Token address not available')
    
    const pricePerMinute = parseEther('0.05') // $50/hour equivalent
    await requestVideoCall(tokenAddress, minutes, pricePerMinute)
  }

  const requestVoice = async (minutes: number) => {
    if (!tokenAddress) throw new Error('Token address not available')
    
    const pricePerMinute = parseEther('0.025') // $25/hour equivalent
    await requestVoiceCall(tokenAddress, minutes, pricePerMinute)
  }

  const sendDirectMessage = async () => {
    if (!tokenAddress) throw new Error('Token address not available')
    
    const messagePrice = parseEther('0.01') // $10/message equivalent
    await sendMessage(tokenAddress, messagePrice)
  }

  // Calculate estimated costs
  const getEstimatedCost = (ethAmount: string) => {
    const amount = parseFloat(ethAmount)
    return {
      ethCost: amount,
      usdCost: amount * 3000, // Assume ETH = $3000 for demo
      estimatedTokens: amount / tokenData.currentPrice,
    }
  }

  const getEstimatedReturn = (tokenAmount: string) => {
    const amount = parseFloat(tokenAmount)
    return {
      tokenAmount: amount,
      ethReturn: amount * tokenData.currentPrice * 0.95, // 5% fee
      usdReturn: amount * tokenData.currentPrice * 0.95 * 3000,
    }
  }

  return {
    // Token data
    tokenData,
    tokenAddress,
    priceHistory,
    
    // Trading functions
    buyCreatorTokens,
    sellCreatorTokens,
    isBuying,
    isSelling,
    buyError,
    sellError,
    
    // Communication functions
    requestVideo,
    requestVoice,
    sendDirectMessage,
    isCommunicating,
    
    // Utility functions
    getEstimatedCost,
    getEstimatedReturn,
    
    // Prices
    buyPriceFormatted,
    sellPriceFormatted,
    
    // User state
    userAddress,
    isConnected: !!userAddress,
  }
} 