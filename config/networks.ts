import { Chain } from 'wagmi/chains'
import { Address } from 'viem'

// Local Anvil chain configuration
export const anvilChain: Chain = {
  id: 31337,
  name: 'Anvil Local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Local', url: 'http://localhost:8545' },
  },
}

// Network-specific contract addresses
export const NETWORK_CONTRACTS: Record<number, {
  timeFun?: Address
  factory?: Address
}> = {
  // Anvil Local
  31337: {
    timeFun: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as Address,
    factory: undefined, // TimeFunFactory not needed for this implementation
  },
  // Avalanche Fuji
  43113: {
    timeFun: undefined, // Will be set after deployment
    factory: undefined,
  },
}

// Current network configuration
export const isDevelopment = process.env.NODE_ENV === 'development'
export const defaultChainId = isDevelopment ? 31337 : 43113

export function getTimeFunAddress(chainId: number): Address | undefined {
  return NETWORK_CONTRACTS[chainId]?.timeFun
}

export function getContractAddress(chainId: number): Address | undefined {
  return NETWORK_CONTRACTS[chainId]?.factory
} 