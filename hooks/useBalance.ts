'use client'

import { useBalance as useWagmiBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import { formatBalance } from '../lib/utils'
import { TokenBalance } from '../types/wallet'

export function useBalance() {
  const { address } = useAccount()
  const { data, isError, isLoading } = useWagmiBalance({
    address,
  })

  return {
    balance: data ? formatBalance(data.formatted) : '0',
    symbol: data?.symbol || 'AVAX',
    isLoading,
    isError,
    raw: data,
  }
}

export function useTokenBalance(tokenAddress?: string): TokenBalance | null {
  const { address } = useAccount()
  const { data, isError, isLoading } = useWagmiBalance({
    address,
    token: tokenAddress as `0x${string}`,
  })

  if (!data || isError || isLoading) return null

  return {
    address: tokenAddress || '',
    symbol: data.symbol,
    decimals: data.decimals,
    balance: data.value.toString(),
    formatted: data.formatted,
  }
} 