export const APP_NAME = 'Avalanche Ava.fun'
export const APP_DESCRIPTION = 'Share your time with the world and get rewarded'

export const SUPPORTED_CHAINS = {
  FUJI: 43113,
  MAINNET: 43114,
  LOCAL: 31337,
} as const

export const DEFAULT_CHAIN = SUPPORTED_CHAINS.LOCAL

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const CONTRACT_ADDRESSES = {
  TOKEN_FACTORY: '0x...', // Add your contract address here
  PUMP_ROUTER: '0x...', // Add your router address here  
  TIMEFUN: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', // TimeFun contract address (fixed gas issues)
} as const

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/avalanche',
  DISCORD: 'https://discord.gg/avalanche',
  GITHUB: 'https://github.com/ava-labs',
} as const 