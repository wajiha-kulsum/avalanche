'use client'

import { useState } from 'react'
import { ArrowLeft, Phone, Video, MessageCircle, Calendar, Star, CheckCircle, Plus, X, ExternalLink } from 'lucide-react'
import { TradingChart } from './TradingChart'
import { useCreatorToken } from '../hooks/useCreatorToken'

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

export function CreatorProfilePage({ creator, onBack, tokenAddress }: CreatorProfilePageProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('30')
  const [activeTab, setActiveTab] = useState('about')

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
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">Time.fun Team</span>
                </div>
                
                <p className="text-gray-300 mb-4">Founder @ Time.fun // Time is the most valuable asset</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                    ))}
                    <span className="text-white font-semibold ml-2">5</span>
                    <span className="text-gray-400">• 85 reviews</span>
                    <span className="text-gray-400">• 100% response rate</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
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
                    I founded Time.fun so anyone can get instant access to creators, influencers, experts and more.
                  </p>
                  <p className="text-gray-300 mb-8">
                    Feel free to reach out with any suggestions or feedback on the platform!
                  </p>
                </div>

                {/* Get Access Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Get access to Kawz</h3>
                  <p className="text-gray-400 text-sm mb-6">Use your purchased minutes to connect with Kawz</p>
                  
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
                            <span className="text-white font-semibold text-lg ml-2">0.01 ETH</span>
                            <span className="text-gray-500 ml-1">~$30.00</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-pink-600/20 rounded-full">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                            <span className="text-pink-400 text-sm">Refund if no response</span>
                          </div>
                        </div>
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
                          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
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
                  <span className="text-gray-400">Tokens owned</span>
                  <span className="text-white">
                    {isConnected ? `${tokenData.userBalance} ${tokenData.symbol}` : '-'}
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
                  <span className="text-gray-400">Token price</span>
                  <span className="text-white">${tokenData.currentPrice.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market cap</span>
                  <span className="text-green-400 font-semibold">${tokenData.marketCap.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
  )
} 