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
              <span className="text-xl font-bold">avax.fun</span>
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
   </main>
  );
}
