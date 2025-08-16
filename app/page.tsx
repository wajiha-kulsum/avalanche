import { WalletConnect } from "../components/WalletConnect";
import { NetworkStatus } from "../components/NetworkStatus";
import { CreatorGrid } from "../components/CreatorGrid";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⏰</span>
              </div>
              <span className="text-xl font-bold">TIME.AVAX</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>



      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                TIME IS MONEY.
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Get instant access to and invest in your favorite creators & experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                  Explore creators
                </button>
                <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                  Get paid for your time
                </button>
              </div>
            </div>

            {/* Creator Cards Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Sample Creator Card 1 */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
                      🧑‍💻
                    </div>
                    <div>
                      <h3 className="font-semibold">Alex Chen</h3>
                      <p className="text-sm text-gray-400">Co-Founder of Avalanche Labs</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">$12.50<span className="text-sm text-gray-400">/min</span></div>
                    <div className="text-xs text-green-400 flex items-center">
                      ▲ 24%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  DeFi strategist sharing alpha and market insights. Award winning protocol creator.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">@alexcrypto</span>
                  <button className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-xs hover:bg-purple-600/30 transition-colors">
                    Connect
                  </button>
                </div>
              </div>

              {/* Sample Creator Card 2 */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Kim</h3>
                      <p className="text-sm text-gray-400">Founder @ Timefun</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">$8.26<span className="text-sm text-gray-400">/min</span></div>
                    <div className="text-xs text-green-400 flex items-center">
                      ▲ 49%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Time is the most valuable asset. Creating unique digital experiences.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">@sarahdesigns</span>
                  <button className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-xs hover:bg-purple-600/30 transition-colors">
                    Connect
                  </button>
                </div>
              </div>

              {/* Sample Creator Card 3 */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">
                      📊
                    </div>
                    <div>
                      <h3 className="font-semibold">Mike Torres</h3>
                      <p className="text-sm text-gray-400">Founder @ Inversion</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">$0.32<span className="text-sm text-gray-400">/min</span></div>
                    <div className="text-xs text-red-400 flex items-center">
                      ▼ 12%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Building the future of decentralized applications and Web3 infrastructure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">@miketech</span>
                  <button className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-xs hover:bg-purple-600/30 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Categories */}
        <section className="py-8 px-6 border-t border-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <h2 className="text-xl font-bold">Top Creators</h2>
                  <p className="text-sm text-gray-400">Featured Creators</p>
                </div>
              </div>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center space-x-1">
                <span>See all</span>
                <span>→</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                'All Creators', 'Top Creators', 'Founders', 'Influencers', 
                'Investors', 'UI/UX Design', 'Athletes', 'Avalanche', 
                'Musicians', 'Media & Marketing', 'Time.avax Team'
              ].map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    index === 0 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Creator Grid */}
            <CreatorGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
