'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


interface Creator {
  id: number
  name: string
  description: string
  creator: string
  timeAgo: string
  marketCap: string
  replies: number
  image: string
  bgColor: string
  isLive?: boolean
  liveCount?: number
}

export function TopCreatorsSection() {
  const router = useRouter()

  const handleBuyTimeClick = (creator: Creator) => {
    router.push(`/creator/${creator.id}`)
  }

  const creators = [
    {
      id: 1,
      name: "AshClaw (Ash)",
      description: "Ash Claw is a shadowy hatchling with charred scales and ember-streaked claws, leaving trails of ash wherever it moves.",
      creator: "HtmF5S",
      timeAgo: "26m ago",
      marketCap: "$5.4K",
      replies: 10,
      image: "/images/nfts/12.webp",
      bgColor: "from-orange-600 to-red-700"
    },
    {
      id: 2,
      name: "UNENCRYPTED COIN ($UNCRYPTED)",
      description: "Welcome to $UNCRYPTED, where everything meant to be secure is profane. Forget wallets, forget blockchains, forget meaning. Our cult worships the freedom of being unencrypted: losing data is meditation, failing transactions is enlightenment, and mocking crypto logic is daily sacrifice. SAY YES TO THE CULT!",
      creator: "3pR7Bh",
      timeAgo: "21h ago",
      marketCap: "$29.9K",
      replies: 117,
      image: "/images/nfts/GRVRP3VXkAA8nul.jpg",
      bgColor: "from-yellow-600 to-orange-600",
      isLive: true,
      liveCount: 35
    },
    {
      id: 3,
      name: "Standing on business ($OB)",
      description: "",
      creator: "8zTSv0",
      timeAgo: "46m ago",
      marketCap: "$20.0K",
      replies: 1,
      image: "/images/nfts/tensorians.png",
      bgColor: "from-blue-600 to-cyan-600"
    },
    {
      id: 4,
      name: "you must be (patient)",
      description: "you must be patient",
      creator: "FVu2MZ",
      timeAgo: "54m ago",
      marketCap: "$7.2K",
      replies: 23,
      image: "/images/nfts/1.webp",
      bgColor: "from-gray-600 to-blue-600"
    },
    {
      id: 5,
      name: "Methin Around (Methsquad)",
      description: "Viral Ukrainian group being heavily memed on social media.",
      creator: "F4FcgD",
      timeAgo: "1d ago",
      marketCap: "$140.5K",
      replies: 38,
      image: "/images/nfts/images.jpeg",
      bgColor: "from-purple-600 to-pink-600"
    },
    {
      id: 6,
      name: "Lick Price (LICK)",
      description: "This slang phrase, meaning to make quick money, often illegally, is of more recent origin.",
      creator: "C6RJsJ",
      timeAgo: "5h ago",
      marketCap: "$144.4K",
      replies: 25,
      image: "/images/nfts/giga-buds.png",
      bgColor: "from-green-600 to-emerald-600"
    },
    {
      id: 7,
      name: "My new life begins Monday (MONDAY)",
      description: "",
      creator: "8CnRLz",
      timeAgo: "5m ago",
      marketCap: "$5.8K",
      replies: 0,
      image: "/images/nfts/12.webp",
      bgColor: "from-green-500 to-blue-500"
    },
    {
      id: 8,
      name: "Hell (Hell)",
      description: "Hell – The unholy coin for pure degeneracy. Where angels get liquidated, and only the strongest memes survive. No halos, no salvation—just chaos, fire, and alpha that burns brighter than Heaven could ever handle",
      creator: "8uX9WM",
      timeAgo: "5m ago",
      marketCap: "$6.0K",
      replies: 1,
      image: "/images/nfts/GRVRP3VXkAA8nul.jpg",
      bgColor: "from-red-600 to-orange-700"
    },
    {
      id: 9,
      name: "potato fry 薯蛋 (potato)",
      description: "",
      creator: "556pbL",
      timeAgo: "4m ago",
      marketCap: "$5.3K",
      replies: 2,
      image: "/images/nfts/tensorians.png",
      bgColor: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
      {/* Top gradient mask to blend with hero section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-gray-900/50 to-transparent z-0"></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      {/* Bottom gradient mask to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Top <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Creators</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Discover the most innovative creators building the future of time-based social interactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <div 
              key={creator.id}
              className="bg-gray-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-white transition-all duration-300 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex h-64">
                {/* Left Half - NFT Image */}
                <div className={`w-1/2 bg-gradient-to-br ${creator.bgColor} flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Live indicator overlay */}
                  {creator.isLive && (
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                      <div className="flex items-center text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="mr-1">👥</span>
                        {creator.liveCount}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Half - Description */}
                <div className="w-1/2 p-5 flex flex-col">
                  {/* Creator info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2 text-xs">
                      <span className="text-gray-400">created by</span>
                      <span className="text-green-400">🟢</span>
                      <span className="text-white font-medium">{creator.creator}</span>
                      <span className="text-gray-500">{creator.timeAgo}</span>
                    </div>
                    <div className="text-gray-400 text-xs mb-1">
                      market cap: <span className="text-green-400 font-semibold">{creator.marketCap}</span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      replies: <span className="text-white">{creator.replies}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 group-hover:text-green-300 transition-colors">
                    {creator.name}
                  </h3>

                  {/* Description */}
                  {creator.description && (
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-4 flex-1">
                      {creator.description}
                    </p>
                  )}

                  {/* Buy Time Button */}
                  <div className="mt-auto pt-3">
                    <button 
                      onClick={() => handleBuyTimeClick(creator)}
                      className="w-full py-2 px-3 bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white text-xs font-semibold rounded-lg opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:shadow-lg group-hover:shadow-green-500/25 group-hover:scale-105 transition-all duration-300 ease-out hover:from-green-500 hover:to-emerald-500"
                    >
                      Buy Time
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
            View All Creators
          </button>
        </div>
      </div>


    </section>
  )
} 