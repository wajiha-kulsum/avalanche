'use client'

import React from 'react'
import { MessageSquare, Bell } from 'lucide-react'

interface ChatNotificationProps {
  hasUnreadMessages: boolean
  unreadCount: number
  onClick: () => void
}

export default function ChatNotification({ hasUnreadMessages, unreadCount, onClick }: ChatNotificationProps) {
  if (!hasUnreadMessages) return null

  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
      title="You have unread messages"
    >
      <MessageSquare size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  )
} 