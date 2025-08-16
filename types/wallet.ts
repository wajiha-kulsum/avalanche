export interface WalletState {
  address: string | undefined
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  chain: {
    id: number
    name: string
    unsupported?: boolean
  } | undefined
}

export interface TokenBalance {
  address: string
  symbol: string
  decimals: number
  balance: string
  formatted: string
}

export interface NetworkStatus {
  isConnected: boolean
  isCorrectNetwork: boolean
  currentChainId: number | undefined
  targetChainId: number
}

export interface WalletConnection {
  connect: () => void
  disconnect: () => void
  switchNetwork: (chainId: number) => void
} 