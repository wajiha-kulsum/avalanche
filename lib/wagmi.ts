import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { WALLETCONNECT_PROJECT_ID, APP_NAME } from '../config/constants'
import { anvilChain } from '../config/networks'

// Use a fallback project ID to prevent connection errors
const projectId = WALLETCONNECT_PROJECT_ID || 'demo-project-id'

export const wagmiConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId: projectId,
  chains: [anvilChain, avalancheFuji, avalanche],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet, // This will detect Core Wallet, MetaMask, etc.
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  ssr: true,
}) 