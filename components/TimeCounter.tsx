'use client'

import { useState, useEffect } from 'react'

export function TimeCounter() {
  const [timeData, setTimeData] = useState({
    totalMinutesTraded: 1234567,
    currentPrice: 0.234,
    priceChange: 2.4,
    volume24h: 45678
  })

  const [recentTrades, setRecentTrades] = useState([
    { type: 'buy', amount: 150, price: 0.235, user: 'Creator Alice' },
    { type: 'sell', amount: 75, price: 0.233, user: 'Fan Bob' },
    { type: 'buy', amount: 200, price: 0.234, user: 'Creator Charlie' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setTimeData(prev => ({
        ...prev,
        totalMinutesTraded: prev.totalMinutesTraded + Math.floor(Math.random() * 20),
        currentPrice: prev.currentPrice + (Math.random() - 0.5) * 0.002,
        volume24h: prev.volume24h + Math.floor(Math.random() * 10)
      }))

      // Simulate new trades
      if (Math.random() > 0.7) {
        const newTrade = {
          type: Math.random() > 0.5 ? 'buy' : 'sell',
          amount: Math.floor(Math.random() * 300) + 50,
          price: timeData.currentPrice + (Math.random() - 0.5) * 0.01,
          user: ['Creator Alice', 'Fan Bob', 'Creator Charlie', 'Fan Diana', 'Creator Eve'][Math.floor(Math.random() * 5)]
        }
        
        setRecentTrades(prev => [newTrade as any, ...prev.slice(0, 4)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [timeData.currentPrice])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  return (
    <section className="py-16 px-4 bg-black/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live Time Trading
          </h2>
          <p className="text-gray-300 text-lg">
            Watch time being traded in real-time across the platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Time Market Stats */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Market Overview</h3>
            
            <div className="space-y-6">
              {/* Current Price */}
              <div className="text-center">
                <div className="text-sm text-gray-300 mb-2">Current Time Price</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {timeData.currentPrice.toFixed(3)} AVAX
                </div>
                <div className={`text-sm ${timeData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {timeData.priceChange >= 0 ? '↗' : '↘'} {Math.abs(timeData.priceChange).toFixed(1)}% (24h)
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {formatNumber(timeData.totalMinutesTraded)}
                  </div>
                  <div className="text-sm text-gray-300">Total Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {formatNumber(timeData.volume24h)}
                  </div>
                  <div className="text-sm text-gray-300">24h Volume</div>
                </div>
              </div>

              {/* Price Chart Simulation */}
              <div className="bg-black/30 rounded-xl p-4">
                <div className="flex items-end justify-between h-20 space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm opacity-70 hover:opacity-100 transition-opacity"
                      style={{ 
                        height: `${Math.random() * 60 + 20}%`,
                        width: '4%'
                      }}
                    />
                  ))}
                </div>
                <div className="text-center text-xs text-gray-400 mt-2">
                  24H Price Chart
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Recent Trades</h3>
            
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="text-white font-medium">{trade.user}</div>
                      <div className="text-gray-400 text-sm">
                        {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} minutes
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {trade.price.toFixed(3)} AVAX
                    </div>
                    <div className="text-gray-400 text-sm">per minute</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trading Actions */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all">
                Buy Time
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all">
                Sell Time
              </button>
            </div>
          </div>
        </div>

        {/* Global Time Counter */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Global Time Economy
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-purple-300">
                  {Math.floor(timeData.totalMinutesTraded / 1000)}K+
                </div>
                <div className="text-sm text-gray-400">Minutes in Circulation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-300">
                  {Math.floor(timeData.volume24h / 100)}+
                </div>
                <div className="text-sm text-gray-400">Active Traders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">
                  ${(timeData.currentPrice * timeData.totalMinutesTraded).toFixed(0)}K
                </div>
                <div className="text-sm text-gray-400">Market Cap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 