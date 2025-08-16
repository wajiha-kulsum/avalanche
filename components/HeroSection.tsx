'use client'

import { useState, useEffect } from 'react'

export function HeroSection() {
  const [timeValue, setTimeValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeValue(prev => prev + 0.1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Trade
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Time
            </span>
            <br />
            Not Just Tokens
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The first social platform where time becomes currency. 
            Connect with creators, earn minutes, and unlock exclusive experiences on Avalanche.
          </p>

          {/* Time Value Display */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-md mx-auto border border-purple-500/20">
            <div className="text-sm text-purple-300 mb-2">Current Time Value</div>
            <div className="text-3xl font-bold text-white">
              {timeValue.toFixed(1)} <span className="text-lg text-gray-400">AVAX/min</span>
            </div>
            <div className="text-sm text-green-400 mt-1">↗ +2.4% (24h)</div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
              Start Earning Time
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1.2M+</div>
              <div className="text-gray-400">Minutes Traded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5.8K+</div>
              <div className="text-gray-400">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24K+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 