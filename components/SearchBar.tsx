'use client'

import { useState } from 'react'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <kbd className="inline-flex items-center px-2 py-1 border border-gray-600 rounded text-xs text-gray-400">
          ⌘K
        </kbd>
      </div>
    </div>
  )
} 