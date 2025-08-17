'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts'
import { useCreatorToken } from '../hooks/useCreatorToken'
import { Address, formatEther } from 'viem'

interface TradingChartProps {
  creatorId?: string
}

export function TradingChart({ creatorId }: TradingChartProps = {}) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('0.1')
  const [selectedDuration, setSelectedDuration] = useState('15')
  
  // Chart refs
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  // Creator token hook
  const {
    tokenData,
    tokenAddress,
    priceHistory,
    buyCreatorTokens,
    sellCreatorTokens,
    isBuying,
    isSelling,
    buyError,
    sellError,
    getEstimatedCost,
    getEstimatedReturn,
    userAddress,
    isConnected
  } = useCreatorToken(creatorId || '1')

  const currentPrice = tokenData.currentPrice
  const priceChange = 2.5 // Mock price change percentage

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    try {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: '#d1d5db',
        },
        grid: {
          vertLines: { color: '#374151' },
          horzLines: { color: '#374151' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#374151',
        },
        timeScale: {
          borderColor: '#374151',
          timeVisible: true,
          secondsVisible: false,
        },
        width: chartContainerRef.current.clientWidth,
        height: 200,
      })

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#10B981',
        downColor: '#EF4444',
        borderDownColor: '#EF4444',
        borderUpColor: '#10B981',
        wickDownColor: '#EF4444',
        wickUpColor: '#10B981',
      })

      chartRef.current = chart
      seriesRef.current = candlestickSeries

      // Add initial mock candlestick data if no real data
      if (priceHistory.length === 0) {
        const mockData = Array.from({ length: 20 }, (_, i) => {
          const time = Math.floor(Date.now() / 1000) - (20 - i) * 300 // 5 minute intervals
          const basePrice = currentPrice + Math.sin(i * 0.3) * 0.002
          const volatility = 0.001 + Math.random() * 0.002
          
          const open = basePrice + (Math.random() - 0.5) * volatility
          const close = basePrice + (Math.random() - 0.5) * volatility
          const high = Math.max(open, close) + Math.random() * volatility * 0.5
          const low = Math.min(open, close) - Math.random() * volatility * 0.5
          
          return {
            time,
            open: Math.max(0, open),
            high: Math.max(0, high),
            low: Math.max(0, low),
            close: Math.max(0, close),
          }
        })
        candlestickSeries.setData(mockData)
      }

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          })
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
        }
      }
    } catch (error) {
      console.error('Chart initialization error:', error)
    }
  }, [])

  // Update chart with real price data
  useEffect(() => {
    if (seriesRef.current && priceHistory.length > 0) {
      // Convert price history to candlestick data
      // Group by time intervals (5 minutes)
      const intervalMs = 5 * 60 * 1000 // 5 minutes
      const groupedData: { [key: number]: { prices: number[], timestamp: number } } = {}
      
      priceHistory.forEach(point => {
        const intervalStart = Math.floor(point.timestamp / intervalMs) * intervalMs
        if (!groupedData[intervalStart]) {
          groupedData[intervalStart] = { prices: [], timestamp: intervalStart }
        }
        groupedData[intervalStart].prices.push(point.price)
      })
      
      const candlestickData = Object.values(groupedData).map(group => {
        const prices = group.prices.sort((a, b) => a - b)
        const open = prices[0]
        const close = prices[prices.length - 1]
        const high = Math.max(...prices)
        const low = Math.min(...prices)
        
        return {
          time: Math.floor(group.timestamp / 1000),
          open,
          high,
          low,
          close,
        }
      }).sort((a, b) => a.time - b.time)
      
      seriesRef.current.setData(candlestickData)
    }
  }, [priceHistory])

  // Handle buy/sell
  const handleBuy = async () => {
    if (!isConnected) return
    
    try {
      await buyCreatorTokens(amount)
      // Show success message or update UI
    } catch (error) {
      console.error('Buy failed:', error)
      // Show error message
    }
  }

  const handleSell = async () => {
    if (!isConnected) return
    
    try {
      // Convert amount to token amount for selling
      const estimatedTokens = getEstimatedReturn(amount).tokenAmount
      await sellCreatorTokens(estimatedTokens.toString())
      // Show success message or update UI
    } catch (error) {
      console.error('Sell failed:', error)
      // Show error message
    }
  }

  return (
    <Card className="bg-gray-900/90 border-gray-800">
      <CardHeader className="pb-4">
        {/* Buy/Sell Tabs */}
        <div className="flex bg-gray-800/50 rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'buy'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sell'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Title and Price */}
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold mb-1">
            {activeTab === 'buy' ? 'Buy minutes' : 'Sell minutes'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">${currentPrice}</span>
            <div className="flex items-center gap-1">
              {priceChange > 0 ? (
                <TrendingUp className="text-green-500" size={16} />
              ) : (
                <TrendingDown className="text-red-500" size={16} />
              )}
              <span className={`text-sm font-medium ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                +{priceChange}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* TradingView Chart */}
        <div className="bg-black/50 rounded-lg p-4">
          <div ref={chartContainerRef} className="w-full h-48" />
          <div className="flex justify-end mt-2">
            <button className="text-gray-400 text-xs hover:text-white">
              See full chart
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex bg-gray-800/50 rounded-lg">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-white text-lg focus:outline-none"
              placeholder="1.0"
            />
            <div className="flex">
              <button className="px-4 py-3 text-gray-400 hover:text-white border-r border-gray-700">
                Minutes
              </button>
              <button className="px-4 py-3 text-gray-400 hover:text-white">
                USD
              </button>
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2">
          {['15', '30', '60'].map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                selectedDuration === duration
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {duration} min
            </button>
          ))}
        </div>

        {/* Available Balance */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Available Balance</span>
          <span className="text-white font-medium">
            {isConnected ? `${tokenData.userBalance} ${tokenData.symbol}` : '$0.00'}
          </span>
        </div>

        {/* Buy/Sell Button */}
        <button 
          onClick={activeTab === 'buy' ? handleBuy : handleSell}
          disabled={isBuying || isSelling || !isConnected}
          className={`w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            activeTab === 'buy'
              ? 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
          }`}
        >
          {isBuying || isSelling ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {activeTab === 'buy' ? 'Buying...' : 'Selling...'}
            </div>
          ) : !isConnected ? (
            'Connect Wallet'
          ) : (
            `${activeTab === 'buy' ? 'Buy' : 'Sell'} ${amount} AVAX`
          )}
        </button>

        {/* Footer Info */}
        <div className="text-center space-y-1">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            Estimate based on current market price
          </p>
          <p className="text-gray-500 text-xs">Minimum buy amount is $2</p>
        </div>
      </CardContent>
    </Card>
  )
} 