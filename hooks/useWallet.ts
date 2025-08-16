'use client'

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { WalletState, NetworkStatus, WalletConnection } from '../types/wallet'
import { avalancheFuji } from 'wagmi/chains'

export function useWallet(): WalletState & WalletConnection {
  const { address, isConnected, isConnecting, isDisconnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const handleConnect = () => {
    const injectedConnector = connectors.find(
      (connector) => connector.id === 'injected'
    )
    if (injectedConnector) {
      connect({ connector: injectedConnector })
    }
  }

  const handleSwitchNetwork = (chainId: number) => {
    switchChain({ chainId })
  }

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chain,
    connect: handleConnect,
    disconnect,
    switchNetwork: handleSwitchNetwork,
  }
}

export function useNetworkStatus(): NetworkStatus {
  const chainId = useChainId()
  const { isConnected } = useAccount()

  return {
    isConnected,
    isCorrectNetwork: chainId === avalancheFuji.id,
    currentChainId: chainId,
    targetChainId: avalancheFuji.id,
  }
} 