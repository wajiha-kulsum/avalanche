import { Address } from 'viem'
import { avalancheFuji } from 'wagmi/chains'
import { anvilChain, getContractAddress, getSampleTokens, defaultChainId } from './networks'

// Network configuration
export const SUPPORTED_CHAINS = [anvilChain, avalancheFuji]
export const CURRENT_CHAIN_ID = defaultChainId

// Contract addresses - dynamically determined by network
export const FACTORY_ADDRESS: Address = getContractAddress(CURRENT_CHAIN_ID) || '0x...' as Address
export const SAMPLE_TOKENS: Address[] = getSampleTokens(CURRENT_CHAIN_ID)

// Contract deployment info
export const CONTRACT_DEPLOYMENT = {
  factory: FACTORY_ADDRESS,
  chainId: CURRENT_CHAIN_ID,
  blockNumber: 0, // Set after deployment
}

// Development mode flag
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

// Use mock data when contracts aren't deployed
export const USE_MOCK_DATA = FACTORY_ADDRESS === '0x...' || IS_DEVELOPMENT 