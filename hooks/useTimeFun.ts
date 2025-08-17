import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESSES } from '../config/constants'
import type { Creator } from '../types'
import toast from 'react-hot-toast'
import React from 'react'

// TimeFun contract ABI - exact match to deployed contract
const TIMEFUN_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "bio", "type": "string"},
      {"internalType": "string", "name": "profileImage", "type": "string"},
      {"internalType": "string", "name": "twitter", "type": "string"}
    ],
    "name": "joinAsCreator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "name": "buyShares",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "name": "sellShares",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"}
    ],
    "name": "getCreatorInfo",
    "outputs": [
      {"internalType": "address", "name": "creatorAddress", "type": "address"},
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "bio", "type": "string"},
      {"internalType": "string", "name": "profileImage", "type": "string"},
      {"internalType": "string", "name": "twitter", "type": "string"},
      {"internalType": "uint256", "name": "totalShares", "type": "uint256"},
      {"internalType": "uint256", "name": "currentPrice", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCreators",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "name": "getBuyPrice",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "name": "getSellPrice",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "address", "name": "holder", "type": "address"}
    ],
    "name": "getSharesOwned",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "creatorId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "hasAccessTo",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "name": "creatorToId",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Add transaction state management
let isTransactionPending = false

export function useTimeFun() {
  const { address } = useAccount()
  const { writeContract, isPending, data: hash, reset, error } = useWriteContract()

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Reset transaction state when confirmed
  React.useEffect(() => {
    if (isConfirmed) {
      isTransactionPending = false
      reset() // Reset writeContract state
    }
  }, [isConfirmed, reset])

  // Helper functions with toast notifications
  const joinCreator = async (name: string, bio: string, profileImage: string, twitter: string) => {
    if (isTransactionPending) {
      toast.error('Please wait for the current transaction to complete')
      return
    }

    try {
      isTransactionPending = true
      
      writeContract({
        address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
        abi: TIMEFUN_ABI,
        functionName: 'joinAsCreator',
        args: [name, bio, profileImage, twitter]
      })

    } catch (error: any) {
      isTransactionPending = false
      console.error('Join creator error:', error)
      if (error.message?.includes('Already registered')) {
        toast.error('You are already registered as a creator!')
      } else if (error.message?.includes('User rejected')) {
        toast.error('Transaction cancelled by user')
      } else {
        toast.error('Failed to join as creator. Please try again.')
      }
      throw error
    }
  }

  const purchaseShares = async (creatorId: number, shares: number, priceInEth: string) => {
    if (isTransactionPending) {
      toast.error('Please wait for the current transaction to complete')
      return
    }

    try {
      isTransactionPending = true
      console.log(`PURCHASING: CreatorId=${creatorId}, Shares=${shares}, ETH=${priceInEth}`)
      
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
        abi: TIMEFUN_ABI,
        functionName: 'buyShares',
        args: [BigInt(creatorId), BigInt(shares)],
        value: parseEther(priceInEth),
        gas: BigInt(200000) // Set reasonable gas limit
      })

      console.log('Transaction submitted:', result)

    } catch (error: any) {
      isTransactionPending = false
      console.error('Buy shares error:', error)
      if (error.message?.includes('User rejected')) {
        toast.error('Transaction cancelled by user')
      } else if (error.message?.includes('Insufficient payment')) {
        toast.error('Not enough ETH for the shares')
      } else {
        toast.error('Failed to buy shares. Please try again.')
      }
      throw error
    }
  }

  const sellCreatorShares = async (creatorId: number, shares: number) => {
    if (isTransactionPending) {
      toast.error('Please wait for the current transaction to complete')
      return
    }

    try {
      isTransactionPending = true
      
      writeContract({
        address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
        abi: TIMEFUN_ABI,
        functionName: 'sellShares',
        args: [BigInt(creatorId), BigInt(shares)]
      })

    } catch (error: any) {
      isTransactionPending = false
      console.error('Sell shares error:', error)
      if (error.message?.includes('Insufficient shares')) {
        toast.error('You don\'t have enough shares to sell!')
      } else if (error.message?.includes('Insufficient contract balance')) {
        toast.error('Contract doesn\'t have enough funds. Try again later.')
      } else if (error.message?.includes('User rejected')) {
        toast.error('Transaction cancelled by user')
      } else {
        toast.error('Failed to sell shares. Please try again.')
      }
      throw error
    }
  }

  // Get all creator IDs
  const { data: creatorIds, refetch: refetchCreators } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getAllCreators',
  })

  // Handle transaction confirmation notifications and data refresh
  React.useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed! ✅')
      // Immediately refetch all data to update balances
      refetchCreators()
    }
  }, [isConfirmed, refetchCreators])

  // Handle transaction errors
  React.useEffect(() => {
    if (error) {
      isTransactionPending = false
      console.error('Transaction error:', error)
    }
  }, [error])

  return {
    // Write functions
    joinCreator,
    purchaseShares, 
    sellCreatorShares,
    
    // Loading states
    isPending,
    isConfirming,
    isConfirmed,
    
    // Data
    creatorIds: creatorIds as number[] | undefined,
    refetchCreators,
    
    // Contract info
    contractAddress: CONTRACT_ADDRESSES.TIMEFUN
  }
}

// Hook to get individual creator info
export function useCreatorInfo(creatorId: number) {
  const { data: creatorData, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getCreatorInfo',
    args: [BigInt(creatorId)],
    query: { 
      enabled: !!creatorId,
      refetchOnWindowFocus: false,
    }
  })

  const creator: Creator | undefined = creatorData ? {
    id: creatorId,
    address: creatorData[0],
    name: creatorData[1],
    bio: creatorData[2], 
    profileImage: creatorData[3],
    twitter: creatorData[4],
    totalShares: Number(creatorData[5]),
    currentPrice: Number(formatEther(creatorData[6])),
    joinedAt: Date.now(), // TODO: Add this to contract
    isActive: true
  } : undefined

  return {
    creator,
    refetch
  }
}

// Hook to get shares owned for a specific user (for ChatInterface)
export function useUserSharesForAddress(creatorId: number, userAddress?: string) {
  const { data: shares, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getSharesOwned',
    args: userAddress ? [BigInt(creatorId), userAddress as `0x${string}`] : undefined,
    query: { 
      enabled: !!creatorId && !!userAddress,
      refetchOnWindowFocus: false,
    }
  })

  return {
    shares: shares ? Number(shares) : 0,
    refetch
  }
}

// Hook to check access for a specific user (for ChatInterface)
export function useUserAccess(creatorId: number, userAddress?: string) {
  const { data: hasAccess, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'hasAccessTo',
    args: userAddress ? [BigInt(creatorId), userAddress as `0x${string}`] : undefined,
    query: { 
      enabled: !!creatorId && !!userAddress,
      refetchOnWindowFocus: false,
    }
  })

  return {
    hasAccess: Boolean(hasAccess),
    refetch
  }
}

// Hook to get share price
export function useSharePrice(creatorId: number, shares: number = 1) {
  const { data: priceWei, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getBuyPrice',
    args: [BigInt(creatorId), BigInt(shares)],
    query: { 
      enabled: !!creatorId && shares > 0,
      refetchOnWindowFocus: false,
    }
  })

  const priceInEth = priceWei ? formatEther(priceWei) : '0'

  return {
    priceInEth,
    priceWei,
    refetch
  }
}

// Hook to get user's shares in a creator
export function useUserShares(creatorId: number) {
  const { address } = useAccount()
  
  const { data: shares, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getSharesOwned',
    args: [BigInt(creatorId), address as `0x${string}`],
    query: { 
      enabled: !!creatorId && !!address,
      refetchOnWindowFocus: false,
    }
  })

  return {
    shares: shares ? Number(shares) : 0,
    refetch
  }
} 

// Hook to check if user is already a creator
export function useIsCreator(address?: string) {
  const { data: creatorId } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'creatorToId',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address }
  })

  return {
    isCreator: !!creatorId && creatorId !== BigInt(0),
    creatorId: creatorId ? Number(creatorId) : 0
  }
} 

// Hook to get sell price
export function useSellPrice(creatorId: number, shares: number = 1) {
  const { data: sellPriceWei, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.TIMEFUN as `0x${string}`,
    abi: TIMEFUN_ABI,
    functionName: 'getSellPrice',
    args: [BigInt(creatorId), BigInt(shares)],
    query: { 
      enabled: !!creatorId && shares > 0,
      refetchOnWindowFocus: false,
    }
  })

  const sellPriceInEth = sellPriceWei ? formatEther(sellPriceWei) : '0'

  return {
    sellPriceInEth,
    sellPriceWei,
    refetch
  }
} 