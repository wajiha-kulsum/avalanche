'use client'

import { useState, useEffect } from 'react'

export function StatsSection() {
  const [stats, setStats] = useState({
    totalMinutes: 1234567,
    activeCreators: 5847,
    totalTransactions: 98765,
    avgTimeValue: 0.234
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalMinutes: prev.totalMinutes + Math.floor(Math.random() * 10),
        activeCreators: prev.activeCreators + (Math.random() > 0.9 ? 1 : 0),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3),
        avgTimeValue: prev.avgTimeValue + (Math.random() - 0.5) * 0.001
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Top gradient mask to blend with previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 via-gray-800/50 to-transparent z-0"></div>
      
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20"></div>
      
      {/* Bottom gradient mask to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Statistics</h2>
          <p className="text-gray-400 text-lg">Real-time metrics from our growing ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Minutes */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
              ⏰
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatNumber(stats.totalMinutes)}
            </div>
            <div className="text-gray-400 text-sm">Total Minutes Traded</div>
            <div className="text-green-400 text-xs mt-1">↗ +2.4% (24h)</div>
          </div>

          {/* Active Creators */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
              👥
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatNumber(stats.activeCreators)}
            </div>
            <div className="text-gray-400 text-sm">Active Creators</div>
            <div className="text-green-400 text-xs mt-1">↗ +1.8% (24h)</div>
          </div>

          {/* Total Transactions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
              💎
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatNumber(stats.totalTransactions)}
            </div>
            <div className="text-gray-400 text-sm">Total Transactions</div>
            <div className="text-green-400 text-xs mt-1">↗ +5.2% (24h)</div>
          </div>

          {/* Average Time Value */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-yellow-500 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
              📈
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${stats.avgTimeValue.toFixed(3)}
            </div>
            <div className="text-gray-400 text-sm">Avg Time Value (AVAX/min)</div>
            <div className="text-red-400 text-xs mt-1">↘ -0.8% (24h)</div>
          </div>
        </div>
      </div>
    </section>
  )
} 