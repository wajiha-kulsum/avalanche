'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWallet, useNetworkStatus } from '../hooks/useWallet'
import { useBalance } from '../hooks/useBalance'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { formatAddress } from '../lib/utils'

export function WalletConnect() {
  const { address, isConnected, chain } = useWallet()
  const { balance, symbol } = useBalance()
  const { isCorrectNetwork, targetChainId, currentChainId } = useNetworkStatus()

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Connect Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ConnectButton />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Wallet Connected</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-mono text-lg">{formatAddress(address || '')}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-semibold">{balance} {symbol}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Network</p>
          <p className="font-medium">{chain?.name}</p>
          {!isCorrectNetwork && (
            <p className="text-sm text-red-500 mt-1">
              Please switch to Avalanche Fuji (Chain ID: {targetChainId})
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </CardContent>
    </Card>
  )
} 