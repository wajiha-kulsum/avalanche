import { WalletConnect } from "../components/WalletConnect";
import { NetworkStatus } from "../components/NetworkStatus";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white">🚀 Avalanche Pump</h1>
            <p className="text-gray-300 mt-2">Launch tokens on Avalanche with ease</p>
          </div>
          <NetworkStatus />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Section */}
          <div className="space-y-6">
            <WalletConnect />
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Token Creation</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Bonding Curve Trading</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Token Discovery</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Real-time Charts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
