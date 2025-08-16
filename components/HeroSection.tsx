'use client'

import { useState, useEffect } from 'react'

export function HeroSection() {
  const [timeValue, setTimeValue] = useState(0.234)
  const [liveUsers, setLiveUsers] = useState(1247)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeValue(prev => prev + (Math.random() - 0.5) * 0.001)
      setLiveUsers(prev => prev + (Math.random() > 0.8 ? Math.floor(Math.random() * 3) - 1 : 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const profiles1 = [
    { 
      id: 1, 
      name: "Kawz", 
      price: "$6.23",
      avatar: "🐻", 
      description: "Founder @ Timefun // Time is the most valuable asset",
      stats: { rating: "5", responseRate: "100% response rate" },
      image: "/images/nfts/12.webp",
      bgColor: "from-orange-600 to-red-700"
    },
    { 
      id: 2, 
      name: "Alex", 
      price: "$12.45",
      avatar: "🚀", 
      description: "Crypto trader & DeFi expert. Building the future of finance",
      stats: { rating: "4.9", responseRate: "98% response rate" },
      image: "/images/nfts/GRVRP3VXkAA8nul.jpg",
      bgColor: "from-blue-600 to-purple-600"
    },
    { 
      id: 3, 
      name: "Sarah", 
      price: "$8.90",
      avatar: "💎", 
      description: "NFT artist & blockchain developer. Creating digital art",
      stats: { rating: "4.8", responseRate: "95% response rate" },
      image: "/images/nfts/tensorians.png",
      bgColor: "from-green-600 to-emerald-600"
    },
  ];

  const profiles2 = [
    { 
      id: 4, 
      name: "toly", 
      price: "$15.79",
      avatar: "⚡", 
      description: "Co-Founder of Solana Labs. Award winning phone creator. NFA, don't trust me, mostly...",
      stats: { rating: "5", responseRate: "100% response rate" },
      image: "/images/nfts/1.webp",
      bgColor: "from-purple-600 to-pink-600"
    },
    { 
      id: 5, 
      name: "Mike", 
      price: "$9.32",
      avatar: "🔥", 
      description: "Founder @ Inversion. Building next-gen protocols",
      stats: { rating: "4.7", responseRate: "92% response rate" },
      image: "/images/nfts/images.jpeg",
      bgColor: "from-yellow-600 to-orange-600"
    },
    { 
      id: 6, 
      name: "Luna", 
      price: "$11.50",
      avatar: "🌙", 
      description: "Web3 consultant & community builder. Connecting people",
      stats: { rating: "4.9", responseRate: "97% response rate" },
      image: "/images/nfts/giga-buds.png",
      bgColor: "from-cyan-600 to-blue-600"
    },
  ];

  return (
    <section className="h-screen w-full m-4 relative overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="h-full w-full relative" style={{background: 'linear-gradient(to right, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #2a2a2a 75%, #3a3a3a 100%)'}}>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-2000"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full w-full relative z-10">
          {/* Left Section - Enhanced Content */}
          <div className="p-12 flex items-center justify-center h-full relative">
            {/* Top blur gradient */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
            {/* Bottom blur gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            
            <div className="max-w-lg relative z-20">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm border border-gray-600/40 rounded-lg px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Live</span>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Trade Time,
                <br />
                <span className="text-purple-400">Not Tokens</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Connect with creators, buy their time, and get exclusive access. 
                Built on Avalanche for fast, cheap transactions.
              </p>

              {/* Live stats */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-lg font-semibold text-white">
                    ${timeValue.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500">avg price/min</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-lg font-semibold text-white">
                    {liveUsers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">online now</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-lg font-semibold text-white">
                    24/7
                  </div>
                  <div className="text-xs text-gray-500">trading</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-lg border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors">
                  Browse Creators
                </button>
              </div>

              {/* Simple features list */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>No monthly fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>Direct creator payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>Instant access</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Enhanced Marquees */}
          <div className="h-full overflow-hidden relative grid grid-cols-2 gap-3 mr-8 p-4">
            {/* Top blur gradient for right side */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-800/90 to-transparent z-20"></div>
            {/* Bottom blur gradient for right side */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/90 to-transparent z-20"></div>
            
            {/* First Marquee */}
            <div className="h-full overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 flex flex-col animate-marquee-vertical px-1">
                {[...profiles1, ...profiles1, ...profiles1].map((profile, index) => (
                  <div 
                    key={`${profile.id}-${index}`}
                    className="bg-gray-900/95 backdrop-blur-lg my-2 p-4 rounded-2xl shadow-2xl flex-shrink-0 h-80 w-full flex flex-col border border-gray-700/50 hover:border-purple-500/50 transition-all relative overflow-hidden"
                  >
                    {/* NFT Background Image */}
                    <div className="absolute inset-0 opacity-10">
                      <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Avatar and Header */}
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-3 border-2 border-purple-500/50 shadow-lg">
                          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg drop-shadow-sm">{profile.name}</h3>
                          <div className="text-green-400 font-semibold text-lg drop-shadow-sm">
                            {profile.price} <span className="text-gray-300 text-sm">/ min</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-200 text-sm leading-relaxed mb-4 flex-1 drop-shadow-sm">
                        {profile.description}
                      </p>

                      {/* Stats */}
                      <div className="border-t border-gray-600/50 pt-3 bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white ml-1 font-semibold drop-shadow-sm">{profile.stats.rating}</span>
                          </div>
                          <div className="text-green-400 font-medium drop-shadow-sm">
                            {profile.stats.responseRate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Marquee */}
            <div className="h-full overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 flex flex-col animate-marquee-vertical-reverse px-1">
                {[...profiles2, ...profiles2, ...profiles2].map((profile, index) => (
                  <div 
                    key={`${profile.id}-${index}`}
                    className="bg-gray-900/95 backdrop-blur-lg my-2 p-4 rounded-2xl shadow-2xl flex-shrink-0 h-80 w-full flex flex-col border border-gray-700/50 hover:border-pink-500/50 transition-all relative overflow-hidden"
                  >
                    {/* NFT Background Image */}
                    <div className="absolute inset-0 opacity-10">
                      <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Avatar and Header */}
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-3 border-2 border-pink-500/50 shadow-lg">
                          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg drop-shadow-sm">{profile.name}</h3>
                          <div className="text-green-400 font-semibold text-lg drop-shadow-sm">
                            {profile.price} <span className="text-gray-300 text-sm">/ min</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-200 text-sm leading-relaxed mb-4 flex-1 drop-shadow-sm">
                        {profile.description}
                      </p>

                      {/* Stats */}
                      <div className="border-t border-gray-600/50 pt-3 bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white ml-1 font-semibold drop-shadow-sm">{profile.stats.rating}</span>
                          </div>
                          <div className="text-green-400 font-medium drop-shadow-sm">
                            {profile.stats.responseRate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient mask to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-30"></div>
      
      <style jsx>{`
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }

        @keyframes marquee-vertical-reverse {
          0% {
            transform: translateY(-33.33%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-marquee-vertical {
          animation: marquee-vertical 20s linear infinite;
        }

        .animate-marquee-vertical-reverse {
          animation: marquee-vertical-reverse 20s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
} 