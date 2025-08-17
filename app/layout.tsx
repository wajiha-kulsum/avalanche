import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { WalletProvider } from "../providers/WalletProvider";
import { WalletConnect } from "../components/WalletConnect";
import { SearchBar } from "../components/SearchBar";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avalanche Ava.fun",
  description: "Share your time with the world and get rewarded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          {/* Top Navigation */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-700/50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ava.fun</span>
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
          <main className="pt-20">
            {children}
          </main>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid #374151',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f9fafb',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f9fafb',
                },
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  );
}
