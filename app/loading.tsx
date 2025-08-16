export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Avalanche Pump...</p>
      </div>
    </div>
  )
} 