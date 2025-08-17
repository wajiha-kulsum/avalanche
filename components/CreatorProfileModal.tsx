'use client'

import { useState } from 'react'
import { X, Phone, Video, MessageCircle, Calendar, Clock, Star } from 'lucide-react'
import { TradingChart } from './TradingChart'

interface CreatorProfileModalProps {
  isOpen: boolean
  onClose: () => void
  creator: {
    id: number
    name: string
    description: string
    creator: string
    timeAgo: string
    marketCap: string
    replies: number
    image: string
    bgColor: string
  }
}

export function CreatorProfileModal({ isOpen, onClose, creator }: CreatorProfileModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('30')

  if (!isOpen) return null



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${creator.bgColor} flex items-center justify-center overflow-hidden`}>
              <img 
                src={creator.image} 
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{creator.name}</h2>
              <p className="text-green-400 text-sm">@{creator.creator}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex h-full">
          {/* Left Side - Profile & Communication */}
          <div className="w-2/3 p-6 overflow-y-auto">
            {/* About Me Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="text-green-400" size={20} />
                About Me
              </h3>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  {creator.description || "Passionate creator building innovative experiences in the digital space. Available for consultations, collaborations, and creative sessions."}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap:</span>
                    <span className="text-green-400 font-semibold">{creator.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Replies:</span>
                    <span className="text-white">{creator.replies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <span className="text-yellow-400">⭐ 4.8/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-white">~5 mins</span>
                  </div>
                </div>
              </div>
            </div>

                         {/* Communication Options */}
             <div className="mb-8">
               <h3 className="text-xl font-semibold text-white mb-4">Communication Options</h3>
               <div className="space-y-3">
                 {/* Video Call */}
                 <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                   <div className="flex items-start gap-3">
                     <div className="p-2 bg-gray-800/50 rounded-lg">
                       <Video className="text-white" size={18} />
                     </div>
                     <div className="flex-1">
                       <h4 className="text-white font-medium text-sm mb-1">Video Call</h4>
                       <p className="text-gray-400 text-xs mb-3">Request a video call with Kawz. Screen sharing, video, and chat capabilities available.</p>
                       <div className="flex items-center justify-between">
                         <div>
                           <span className="text-gray-400 text-xs">Fixed price per minute</span>
                           <span className="text-white font-semibold text-sm ml-1">$30.00</span>
                         </div>
                         <div className="flex items-center gap-1 px-2 py-1 bg-red-600/20 rounded-full">
                           <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                           <span className="text-red-400 text-xs">Under maintenance</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Voice Call */}
                 <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                   <div className="flex items-start gap-3">
                     <div className="p-2 bg-gray-800/50 rounded-lg">
                       <Phone className="text-white" size={18} />
                     </div>
                     <div className="flex-1">
                       <h4 className="text-white font-medium text-sm mb-1">Voice Call</h4>
                       <p className="text-gray-400 text-xs mb-3">Request a voice call with Kawz. No screen sharing, video, or chat capabilities.</p>
                       <div className="flex items-center justify-between">
                         <div>
                           <span className="text-gray-400 text-xs">Fixed price per minute</span>
                           <span className="text-white font-semibold text-sm ml-1">$15.00</span>
                         </div>
                         <div className="flex items-center gap-1 px-2 py-1 bg-red-600/20 rounded-full">
                           <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                           <span className="text-red-400 text-xs">Under maintenance</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Group Chat */}
                 <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                   <div className="flex items-start gap-3">
                     <div className="p-2 bg-gray-800/50 rounded-lg">
                       <MessageCircle className="text-white" size={18} />
                     </div>
                     <div className="flex-1">
                       <h4 className="text-white font-medium text-sm mb-1">Group Chat</h4>
                       <p className="text-gray-400 text-xs mb-3">Join and connect with Kawz in an exclusive group chat with other users.</p>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div>
                             <span className="text-gray-400 text-xs">Price</span>
                             <span className="text-white font-semibold text-xs ml-1">free for holders of 200 minutes</span>
                           </div>
                           <div className="flex items-center gap-1">
                             <span className="text-gray-400 text-xs">Chat members</span>
                             <div className="flex -space-x-1 ml-1">
                               <div className="w-4 h-4 bg-blue-500 rounded-full border border-gray-800"></div>
                               <div className="w-4 h-4 bg-green-500 rounded-full border border-gray-800"></div>
                               <div className="w-4 h-4 bg-purple-500 rounded-full border border-gray-800"></div>
                               <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-800 flex items-center justify-center">
                                 <span className="text-xs text-white">+50</span>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Direct Message */}
                 <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                   <div className="flex items-start gap-3">
                     <div className="p-2 bg-gray-800/50 rounded-lg">
                       <MessageCircle className="text-white" size={18} />
                     </div>
                     <div className="flex-1">
                       <h4 className="text-white font-medium text-sm mb-1">Direct Message</h4>
                       <p className="text-gray-400 text-xs mb-3">Send a direct message for a quick connection. Keep the conversation going with additional messages if needed.</p>
                       <div className="flex items-center justify-between">
                         <div>
                           <span className="text-gray-400 text-xs">Price</span>
                           <span className="text-white font-semibold text-sm ml-1">1.71 min</span>
                           <span className="text-gray-500 text-xs ml-1">$10.00</span>
                         </div>
                         <div className="flex items-center gap-1 px-2 py-1 bg-pink-600/20 rounded-full">
                           <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></div>
                           <span className="text-pink-400 text-xs">Refund if no response</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            {/* Booking Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="text-green-400" size={20} />
                Book a Session
              </h3>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <select 
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                    <input 
                      type="datetime-local"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
                                 <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
                   Book Session - {selectedDuration} minutes required
                 </button>
              </div>
            </div>
          </div>

          {/* Right Side - Chart */}
          <div className="w-1/3 p-6 border-l border-gray-700">
            <div className="h-full">
                            <TradingChart creatorId={creator.id.toString()} />

              <div className="mt-6 bg-gray-800/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3">Quick Stats</h4>
                                 <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="text-gray-400">Minutes Balance:</span>
                     <span className="text-green-400">127 minutes</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-400">Minutes Cost:</span>
                     <span className="text-green-400">$1.25/min</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-400">Avg. Session:</span>
                     <span className="text-white">45 mins</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-400">Availability:</span>
                     <span className="text-green-400">●  Online</span>
                   </div>
                 </div>
              </div>

              <div className="mt-4 bg-gray-800/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3">Recent Reviews</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-green-500 pl-3">
                    <p className="text-gray-300">"Great session, very insightful!"</p>
                    <p className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ - 2h ago</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-3">
                    <p className="text-gray-300">"Helped me solve my problem quickly"</p>
                    <p className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ - 1d ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 