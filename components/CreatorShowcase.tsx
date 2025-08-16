'use client'

export function CreatorShowcase() {
  const creators = [
    {
      name: "Alex Chen",
      handle: "@alexcrypto",
      category: "DeFi Expert",
      timeRate: "5 min/chat",
      followers: "24.5K",
      avatar: "🧑‍💻",
      gradient: "from-blue-500 to-cyan-500",
      description: "DeFi strategist sharing alpha and market insights"
    },
    {
      name: "Sarah Kim",
      handle: "@sarahdesigns",
      category: "NFT Artist",
      timeRate: "3 min/view",
      followers: "18.2K",
      avatar: "🎨",
      gradient: "from-pink-500 to-purple-500",
      description: "Creating unique digital art and NFT collections"
    },
    {
      name: "Mike Torres",
      handle: "@miketech",
      category: "Web3 Developer",
      timeRate: "8 min/review",
      followers: "31.7K",
      avatar: "👨‍💻",
      gradient: "from-green-500 to-teal-500",
      description: "Building the future of decentralized applications"
    },
    {
      name: "Luna Park",
      handle: "@lunatrader",
      category: "Trading Coach",
      timeRate: "12 min/session",
      followers: "42.1K",
      avatar: "📈",
      gradient: "from-orange-500 to-red-500",
      description: "Teaching profitable trading strategies and risk management"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Creators
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover amazing creators and connect with them using your earned time minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {creators.map((creator, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:transform hover:scale-105"
            >
              {/* Creator Avatar */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${creator.gradient} rounded-full flex items-center justify-center text-3xl mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  {creator.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{creator.name}</h3>
                <p className="text-purple-300 text-sm">{creator.handle}</p>
              </div>

              {/* Creator Info */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Category</span>
                  <span className="text-white text-sm font-medium">{creator.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Time Rate</span>
                  <span className="text-purple-300 text-sm font-medium">{creator.timeRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Followers</span>
                  <span className="text-white text-sm font-medium">{creator.followers}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {creator.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  Connect Now
                </button>
                <button className="w-full px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Stats */}
        <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Active Creators</div>
              <div className="text-purple-300 text-sm mt-1">Across all categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">2.1M</div>
              <div className="text-gray-300">Minutes Earned</div>
              <div className="text-purple-300 text-sm mt-1">By creators this month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
              <div className="text-purple-300 text-sm mt-1">From fan interactions</div>
            </div>
          </div>
        </div>

        {/* Become a Creator CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Become a Creator?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our creator program and start earning minutes from your content and fan interactions
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
            Apply to be a Creator
          </button>
        </div>
      </div>
    </section>
  )
} 