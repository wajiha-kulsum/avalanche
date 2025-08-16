import { WalletConnect } from "../components/WalletConnect";
import { SearchBar } from "../components/SearchBar";
import { HeroSection } from "../components/HeroSection";
import { TopCreatorsSection } from "../components/TopCreatorsSection";
import { StatsSection } from "../components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">avax.fun</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Creators</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Marketplace</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Analytics</a>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Launch App
              </button>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Top Creators Section */}
      <TopCreatorsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Call to Action Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Top gradient mask to blend with previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 via-gray-800/50 to-transparent z-0"></div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-pink-900/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Trade
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Time?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of creators and fans who are already earning and spending time on the most innovative social platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl">
              Start as Creator
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all shadow-lg">
              Explore Marketplace
            </button>
          </div>

          {/* Mini stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-gray-400 text-sm">Minutes Traded</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-600"></div>
            <div>
              <div className="text-2xl font-bold text-white">5K+</div>
              <div className="text-gray-400 text-sm">Active Creators</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-600"></div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">Live Trading</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
