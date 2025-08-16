'use client'

export function FeaturesSection() {
  const features = [
    {
      icon: "⏰",
      title: "Time Mining",
      description: "Earn minutes by engaging with the platform. Hold creator tokens to mine time automatically.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: "👥",
      title: "Creator Connections",
      description: "Spend your minutes to access exclusive content, chat with creators, and join private communities.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: "💎",
      title: "Time Tokens",
      description: "Launch your own time-based tokens. Fans earn minutes by holding, creating sustainable creator economies.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🚀",
      title: "Social Trading",
      description: "Trade time and creator tokens in real-time. Build your portfolio of favorite creators and communities.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "🎯",
      title: "Exclusive Access",
      description: "Use accumulated minutes for priority access to events, AMAs, and limited creator interactions.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: "📊",
      title: "Time Analytics",
      description: "Track your time earnings, spending patterns, and creator engagement with detailed analytics.",
      color: "from-cyan-500 to-blue-500"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Where Time Meets
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Social
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how time.avax revolutionizes creator-fan relationships through innovative time-based economics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                1
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Connect & Earn</h4>
              <p className="text-gray-400">
                Connect your wallet and start earning minutes through platform activities and creator token holdings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                2
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Discover Creators</h4>
              <p className="text-gray-400">
                Explore creator profiles, check their time costs, and find communities that match your interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                3
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Spend & Connect</h4>
              <p className="text-gray-400">
                Use your earned minutes to access exclusive content, chat with creators, and join special events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 