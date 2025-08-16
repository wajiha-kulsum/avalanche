import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createConfig } from 'wagmi'
import { avalancheFuji, avalancheMainnet } from '../config/avalanche'
import { WALLETCONNECT_PROJECT_ID, APP_NAME } from '../config/constants'
import { http } from 'viem'

// Use a fallback project ID to prevent connection errors
const projectId = WALLETCONNECT_PROJECT_ID || 'demo-project-id'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: APP_NAME,
    projectId: projectId,
  }
)

export const wagmiConfig = createConfig({
  connectors,
  chains: [avalancheFuji, avalancheMainnet],
  transports: {
    [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
    [avalancheMainnet.id]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
  ssr: true,
}) 