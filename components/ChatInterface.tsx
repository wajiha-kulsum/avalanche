'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { useUserSharesForAddress, useUserAccess } from '@/hooks/useTimeFun'
import { toast } from 'react-hot-toast'

interface Message {
  id: string
  sender: 'user' | 'influencer'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  creatorId: number
  creatorName: string
  isOpen: boolean
  onClose: () => void
}

export default function ChatInterface({ creatorId, creatorName, isOpen, onClose }: ChatInterfaceProps) {
  const { address } = useAccount()
  const { shares: userShares } = useUserSharesForAddress(creatorId, address)
  const { hasAccess } = useUserAccess(creatorId, address)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate welcome message when user gets access
  useEffect(() => {
    if (isOpen && hasAccess && userShares > 0 && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'influencer',
        content: `Hey there! Thanks for supporting me with ${userShares} shares! I'm excited to chat with you. What's on your mind?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, hasAccess, userShares, messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !hasAccess) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate influencer response (in real app, this would be WebSocket/API)
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more about that.",
        "I appreciate you sharing that with me. What made you think of that?",
        "That's a great point! I'd love to hear your perspective on this.",
        "Thanks for reaching out! I'm here to help and chat.",
        "That's fascinating! I'm learning a lot from our conversation.",
        "I'm glad you brought that up. What are your thoughts on...",
        "That's something I've been thinking about too!",
        "I love your energy! Keep the questions coming.",
        "That's a brilliant observation! You really get it.",
        "I'm here for you! What else would you like to discuss?"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const influencerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'influencer',
        content: randomResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, influencerMessage])
    }, 1000 + Math.random() * 2000) // Random delay 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  if (!address) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Not Connected</h3>
            <p className="text-gray-600 mb-4">Please connect your wallet to access the chat.</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat Access Required</h3>
            <p className="text-gray-600 mb-4">
              You need to own shares of {creatorName} to chat with them.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Current shares: {userShares}
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Chat with {creatorName}</h3>
              <p className="text-sm opacity-90">You own {userShares} shares</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!hasAccess}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !hasAccess}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • You have access to chat with {userShares} shares
          </p>
        </div>
      </div>
    </div>
  )
} 