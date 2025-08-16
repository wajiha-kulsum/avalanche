export const APP_NAME = 'Avalanche Pump'
export const APP_DESCRIPTION = 'Pump.fun style token launcher on Avalanche'

export const SUPPORTED_CHAINS = {
  FUJI: 43113,
  MAINNET: 43114,
} as const

export const DEFAULT_CHAIN = SUPPORTED_CHAINS.FUJI

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const CONTRACT_ADDRESSES = {
  TOKEN_FACTORY: '0x...', // Add your contract address here
  PUMP_ROUTER: '0x...', // Add your router address here
} as const

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/avalanche',
  DISCORD: 'https://discord.gg/avalanche',
  GITHUB: 'https://github.com/ava-labs',
} as const 