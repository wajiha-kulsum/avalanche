'use client'

export function Footer() {
  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-gray-800"></div>
      
      {/* Top blur gradient */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900/80 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-white">avax.fun</span>
            </div>
            <p className="text-gray-400 text-lg mb-6 max-w-md">
              The first social platform where time becomes currency. Trade time, connect with creators, and unlock exclusive experiences on Avalanche.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-white">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-white">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-white">📧</span>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Creators</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Time Trading</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Communities</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 avax.fun. All rights reserved. Built on Avalanche.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

        {/* Live network status */}
        <div className="mt-8 flex items-center justify-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Avalanche Network: </span>
            <span className="text-green-400 text-sm font-medium">Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 