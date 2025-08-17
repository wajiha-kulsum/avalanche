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
  factory?: Address
  sampleTokens?: Address[]
}> = {
  // Anvil Local
  31337: {
    factory: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as Address,
    sampleTokens: [
      '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be' as Address, // Kawz
      '0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968' as Address, // Sarah Chen
      '0xeEBe00Ac0756308ac4AaBfD76c05c4F3088B8883' as Address, // Alex Rivera
    ],
  },
  // Avalanche Fuji
  43113: {
    factory: undefined, // Will be set after deployment
    sampleTokens: [],
  },
}

// Current network configuration
export const isDevelopment = process.env.NODE_ENV === 'development'
export const defaultChainId = isDevelopment ? 31337 : 43113

export function getContractAddress(chainId: number): Address | undefined {
  return NETWORK_CONTRACTS[chainId]?.factory
}

export function getSampleTokens(chainId: number): Address[] {
  return NETWORK_CONTRACTS[chainId]?.sampleTokens || []
} 