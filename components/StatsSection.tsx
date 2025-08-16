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
    <section className="py-20 px-4 bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Metrics
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time statistics showing the growth of our time-based economy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Minutes Traded */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
            <div className="text-4xl mb-2">⏰</div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.totalMinutes)}
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">
              Minutes Traded
            </div>
            <div className="text-green-400 text-sm mt-2">
              ↗ +12.5% this week
            </div>
          </div>

          {/* Active Creators */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.activeCreators)}
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">
              Active Creators
            </div>
            <div className="text-green-400 text-sm mt-2">
              ↗ +8.2% this month
            </div>
          </div>

          {/* Total Transactions */}
          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.totalTransactions)}
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">
              Transactions
            </div>
            <div className="text-green-400 text-sm mt-2">
              ↗ +15.7% today
            </div>
          </div>

          {/* Average Time Value */}
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 text-center">
            <div className="text-4xl mb-2">💎</div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {stats.avgTimeValue.toFixed(3)}
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">
              AVAX per Minute
            </div>
            <div className="text-green-400 text-sm mt-2">
              ↗ +3.1% (24h)
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Live Activity
          </h3>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { user: "Creator Alice", action: "earned 45 minutes", time: "2s ago", color: "text-green-400" },
                { user: "Fan Bob", action: "spent 20 minutes on exclusive chat", time: "5s ago", color: "text-purple-400" },
                { user: "Creator Charlie", action: "launched new time token", time: "12s ago", color: "text-blue-400" },
                { user: "Fan Diana", action: "joined premium community", time: "18s ago", color: "text-pink-400" },
                { user: "Creator Eve", action: "earned 120 minutes", time: "25s ago", color: "text-green-400" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">{activity.user}</span>
                    <span className="text-gray-400">{activity.action}</span>
                  </div>
                  <div className="text-gray-500 text-sm">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 