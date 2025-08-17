'use client'

import { useState, useMemo } from 'react'
import { ArrowLeft, Phone, Video, MessageCircle, Calendar, Star, CheckCircle, Plus, X, ExternalLink, MessageSquare } from 'lucide-react'
import { TradingChart } from './TradingChart'
import { useCreatorToken } from '../hooks/useCreatorToken'
import ChatInterface from './ChatInterface'

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

interface CreatorProfilePageProps {
  creator: Creator
  onBack: () => void
  tokenAddress?: string // Add token address prop
}

// Randomized content arrays
const professions = [
  "Founder @ Ava.fun",
  "Crypto Trader & DeFi Expert", 
  "NFT Artist & Creator",
  "Blockchain Developer",
  "Content Creator & Influencer",
  "Investment Advisor",
  "GameFi Entrepreneur",
  "Web3 Consultant",
  "Avalanche Ecosystem Builder",
  "DeFi Protocol Founder"
]

const mottos = [
  "Time is the most valuable asset",
  "Building the future of Web3",
  "Democratizing access to financial knowledge",
  "Creating value through decentralized innovation",
  "Bridging traditional finance and DeFi",
  "Empowering the next generation of builders",
  "Making blockchain accessible to everyone",
  "Turning passion into profit",
  "Innovating at the speed of thought",
  "Leading the decentralized revolution"
]

const descriptions = [
  "I founded Ava.fun so anyone can get instant access to creators, influencers, experts and more.",
  "I help investors navigate the complex world of cryptocurrency and DeFi protocols.",
  "I create digital art and NFTs that push the boundaries of what's possible on blockchain.",
  "I build smart contracts and dApps that solve real-world problems.",
  "I share my knowledge about crypto markets and trading strategies with my community.",
  "I provide personalized investment advice based on years of market experience.",
  "I develop play-to-earn games that combine fun with financial opportunity.", 
  "I consult for companies looking to integrate blockchain technology into their business.",
  "I contribute to the Avalanche ecosystem by building innovative protocols and tools.",
  "I run a DeFi protocol that has processed millions in trading volume."
]

const callToActions = [
  "Feel free to reach out with any questions about crypto, DeFi, or Web3!",
  "Let's discuss your investment strategy and how to maximize your returns.",
  "I'm here to help you understand the latest trends in blockchain technology.",
  "Book a session to learn about profitable trading opportunities.",
  "Get personalized advice on building your crypto portfolio.",
  "Let's explore how you can get involved in the NFT space.",
  "I can help you understand smart contracts and how to use them safely.",
  "Reach out to discuss potential collaboration opportunities.",
  "Ask me anything about the Avalanche ecosystem and upcoming projects.",
  "Let's chat about the future of decentralized finance and where it's heading."
]

const teamBadges = [
  "Ava.fun Team",
  "Verified Creator", 
  "Expert Trader",
  "Avalanche Builder",
  "DeFi Pioneer",
  "Web3 Innovator",
  "Crypto Educator",
  "Blockchain Expert",
  "Community Leader",
  "Protocol Founder"
]

export function CreatorProfilePage({ creator, onBack, tokenAddress }: CreatorProfilePageProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('30')
  const [activeTab, setActiveTab] = useState('about')
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Generate consistent randomized content based on creator ID
  const randomizedContent = useMemo(() => {
    const seed = creator.id
    const professionIndex = seed % professions.length
    const mottoIndex = (seed * 2) % mottos.length
    const descriptionIndex = (seed * 3) % descriptions.length
    const ctaIndex = (seed * 4) % callToActions.length
    const teamBadgeIndex = (seed * 5) % teamBadges.length
    const rating = (4.2 + (seed % 8) * 0.1).toFixed(1)
    const reviews = 45 + (seed % 100)
    const responseRate = 85 + (seed % 16)
    const messagePrice = (0.005 + (seed % 20) * 0.001).toFixed(3)
    const usdPrice = ((parseFloat(messagePrice) * 3000).toFixed(2))
    
    return {
      profession: professions[professionIndex],
      motto: mottos[mottoIndex], 
      description: descriptions[descriptionIndex],
      callToAction: callToActions[ctaIndex],
      teamBadge: teamBadges[teamBadgeIndex],
      rating,
      reviews,
      responseRate,
      messagePrice,
      usdPrice
    }
  }, [creator.id])

  // Creator token integration
  const {
    tokenData,
    requestVideo,
    requestVoice,
    sendDirectMessage,
    isCommunicating,
    isConnected
  } = useCreatorToken(creator.id.toString())

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2">
            {/* Creator Header */}
            <div className="flex items-start gap-6 mb-8">
              <button 
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors mt-2"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${creator.bgColor} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                <img 
                  src={creator.image} 
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">{creator.name}</h1>
                  <CheckCircle className="text-blue-500" size={20} />
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">{randomizedContent.teamBadge}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{randomizedContent.profession} // {randomizedContent.motto}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`${i < Math.floor(parseFloat(randomizedContent.rating)) ? 'text-yellow-400' : 'text-gray-600'}`} size={16} fill="currentColor" />
                    ))}
                    <span className="text-white font-semibold ml-2">{randomizedContent.rating}</span>
                    <span className="text-gray-400">• {randomizedContent.reviews} reviews</span>
                    <span className="text-gray-400">• {randomizedContent.responseRate}% response rate</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageSquare size={16} />
                    Chat with {creator.name}
                  </button>
                  <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus size={16} />
                    Add to watchlist
                  </button>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <X size={16} />
                  </button>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>



            {/* Navigation Tabs */}
            <div className="border-b border-gray-800 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'about', label: 'About Me' },
                  { id: 'market', label: 'Market' },
                  { id: 'activity', label: 'Activity' },
                  { id: 'auctions', label: 'Auctions' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <p className="text-gray-300 mb-6">
                    {randomizedContent.description}
                  </p>
                  <p className="text-gray-300 mb-8">
                    {randomizedContent.callToAction}
                  </p>
                </div>

                {/* Get Access Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Get access to {creator.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">Use your purchased shares to connect with {creator.name}</p>
                  
                  {/* Direct Message Card */}
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-800 rounded-xl">
                        <MessageCircle className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-2">Direct Message</h4>
                        <p className="text-gray-400 text-sm mb-6">
                          Send a direct message for a quick connection. Keep the conversation going with additional messages if needed.
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-gray-400 text-sm">Price</span>
                            <span className="text-white font-semibold text-lg ml-2">{randomizedContent.messagePrice} ETH</span>
                            <span className="text-gray-500 ml-1">~${randomizedContent.usdPrice}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-pink-600/20 rounded-full">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                            <span className="text-pink-400 text-sm">Refund if no response</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsChatOpen(true)}
                            disabled={!isConnected}
                            className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                          >
                            {!isConnected ? (
                              'Connect Wallet to Chat'
                            ) : (
                              'Open Chat'
                            )}
                          </button>
                          <button
                            onClick={async () => {
                              if (!isConnected) {
                                alert('Please connect your wallet first')
                                return
                              }
                              try {
                                await sendDirectMessage()
                                alert('Message request sent! The creator will respond soon.')
                              } catch (error) {
                                console.error('Failed to send message:', error)
                                alert('Failed to send message. Please try again.')
                              }
                            }}
                            disabled={isCommunicating || !isConnected}
                            className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                          >
                            {isCommunicating ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                              </div>
                            ) : !isConnected ? (
                              'Connect Wallet to Message'
                            ) : (
                              'Send Direct Message'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Trading Chart and Position */}
          <div className="space-y-6">
            <TradingChart creatorId={creator.id.toString()} />
            
            {/* Your Position */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Your position</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shares owned</span>
                  <span className="text-white">
                    {isConnected ? `${tokenData.userBalance} shares` : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market value</span>
                  <span className="text-white">
                    {isConnected ? 
                      `$${(parseFloat(tokenData.userBalance || '0') * tokenData.currentPrice * 3000).toFixed(2)}` 
                      : '$0.00'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Share price</span>
                  <span className="text-white">${tokenData.currentPrice.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market cap</span>
                  <span className="text-green-400 font-semibold">${tokenData.marketCap.toFixed(2)}</span>
                </div>
                
                {/* Chat Access Status */}
                {isConnected && (
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Chat access</span>
                      <div className="flex items-center gap-2">
                        {parseFloat(tokenData.userBalance || '0') > 0 ? (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-400 text-sm">Active</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-red-400 text-sm">No access</span>
                          </>
                        )}
                      </div>
                    </div>
                    {parseFloat(tokenData.userBalance || '0') > 0 && (
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-full mt-3 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Start Chatting
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Interface */}
      <ChatInterface
        creatorId={creator.id}
        creatorName={creator.name}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  )
} 