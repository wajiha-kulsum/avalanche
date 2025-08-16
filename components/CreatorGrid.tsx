'use client'

export function CreatorGrid() {
  const creators = [
    {
      name: "Emin Gün Sirer",
      handle: "@el33th4xor",
      role: "Founder & CEO of Avalanche",
      price: "$45.20",
      change: "+18%",
      changeType: "up",
      avatar: "🔬",
      gradient: "from-blue-500 to-cyan-500",
      description: "Computer scientist and founder of Avalanche. Building the future of finance.",
    },
    {
      name: "Kevin Sekniqi",
      handle: "@kevinsekniqi",
      role: "Co-Founder of Avalanche",
      price: "$32.80",
      change: "+12%",
      changeType: "up",
      avatar: "⚡",
      gradient: "from-purple-500 to-pink-500",
      description: "Avalanche co-founder focused on consensus protocols and distributed systems.",
    },
    {
      name: "Ted Yin",
      handle: "@tedyin",
      role: "Chief Protocol Architect",
      price: "$28.50",
      change: "+8%",
      changeType: "up",
      avatar: "🧮",
      gradient: "from-green-500 to-teal-500",
      description: "Protocol architect building scalable blockchain infrastructure.",
    },
    {
      name: "Luigi D'Onorio DeMeo",
      handle: "@luigidm",
      role: "Head of DeFi at Avalanche",
      price: "$22.30",
      change: "-3%",
      changeType: "down",
      avatar: "💎",
      gradient: "from-orange-500 to-red-500",
      description: "Leading DeFi innovation and ecosystem growth on Avalanche.",
    },
    {
      name: "Lydia Chiu",
      handle: "@lydiachiu",
      role: "Head of Ecosystem",
      price: "$18.90",
      change: "+25%",
      changeType: "up",
      avatar: "🌱",
      gradient: "from-pink-500 to-purple-500",
      description: "Growing the Avalanche ecosystem and supporting developers worldwide.",
    },
    {
      name: "Patrick O'Grady",
      handle: "@_patrickogrady",
      role: "VP of Engineering",
      price: "$35.60",
      change: "+15%",
      changeType: "up",
      avatar: "⚙️",
      gradient: "from-indigo-500 to-blue-500",
      description: "Leading engineering efforts to scale Avalanche infrastructure.",
    },
    {
      name: "Aaron Buchwald",
      handle: "@aaronbuchwald",
      role: "Senior Engineer",
      price: "$24.70",
      change: "+7%",
      changeType: "up",
      avatar: "🔧",
      gradient: "from-cyan-500 to-teal-500",
      description: "Core contributor building next-generation blockchain technology.",
    },
    {
      name: "Stephen Buttolph",
      handle: "@stephenbuttolph",
      role: "Senior Engineer",
      price: "$26.40",
      change: "+11%",
      changeType: "up",
      avatar: "💻",
      gradient: "from-violet-500 to-purple-500",
      description: "Avalanche core developer working on consensus and networking.",
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {creators.map((creator, index) => (
        <div 
          key={index}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:transform hover:scale-[1.02]"
        >
          {/* Creator Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${creator.gradient} rounded-xl flex items-center justify-center text-xl group-hover:rotate-6 transition-transform duration-300`}>
                {creator.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{creator.name}</h3>
                <p className="text-sm text-gray-400 truncate">{creator.role}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-white">
                {creator.price}<span className="text-sm text-gray-400">/min</span>
              </div>
              <div className={`text-xs flex items-center justify-end ${
                creator.changeType === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {creator.changeType === 'up' ? '▲' : '▼'} {creator.change.replace(/[+-]/, '')}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4 leading-relaxed overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const
          }}>
            {creator.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 truncate">{creator.handle}</span>
            <button className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-xs hover:bg-purple-600/30 transition-colors flex-shrink-0">
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  )
} 