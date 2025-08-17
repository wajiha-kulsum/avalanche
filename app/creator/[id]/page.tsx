'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { CreatorProfilePage } from '../../../components/CreatorProfilePage'

// This would normally come from an API or database
const creatorsData = [
  {
    id: 1,
    name: "AshClaw (Ash)",
    description: "Ash Claw is a shadowy hatchling with charred scales and ember-streaked claws, leaving trails of ash wherever it moves.",
    creator: "HtmF5S",
    timeAgo: "26m ago",
    marketCap: "$5.4K",
    replies: 10,
    image: "/images/nfts/12.webp",
    bgColor: "from-orange-600 to-red-700"
  },
  {
    id: 2,
    name: "UNENCRYPTED COIN ($UNCRYPTED)",
    description: "Welcome to $UNCRYPTED, where everything meant to be secure is profane. Forget wallets, forget blockchains, forget meaning. Our cult worships the freedom of being unencrypted: losing data is meditation, failing transactions is enlightenment, and mocking crypto logic is daily sacrifice. SAY YES TO THE CULT!",
    creator: "3pR7Bh",
    timeAgo: "21h ago",
    marketCap: "$29.9K",
    replies: 117,
    image: "/images/nfts/GRVRP3VXkAA8nul.jpg",
    bgColor: "from-yellow-600 to-orange-600",
    isLive: true,
    liveCount: 35
  },
  {
    id: 3,
    name: "Standing on business ($OB)",
    description: "",
    creator: "8zTSv0",
    timeAgo: "46m ago",
    marketCap: "$20.0K",
    replies: 1,
    image: "/images/nfts/tensorians.png",
    bgColor: "from-blue-600 to-cyan-600"
  },
  {
    id: 4,
    name: "you must be (patient)",
    description: "you must be patient",
    creator: "FVu2MZ",
    timeAgo: "54m ago",
    marketCap: "$7.2K",
    replies: 23,
    image: "/images/nfts/1.webp",
    bgColor: "from-gray-600 to-blue-600"
  },
  {
    id: 5,
    name: "Methin Around (Methsquad)",
    description: "Viral Ukrainian group being heavily memed on social media.",
    creator: "F4FcgD",
    timeAgo: "1d ago",
    marketCap: "$140.5K",
    replies: 38,
    image: "/images/nfts/images.jpeg",
    bgColor: "from-purple-600 to-pink-600"
  },
  {
    id: 6,
    name: "Lick Price (LICK)",
    description: "This slang phrase, meaning to make quick money, often illegally, is of more recent origin.",
    creator: "C6RJsJ",
    timeAgo: "5h ago",
    marketCap: "$144.4K",
    replies: 25,
    image: "/images/nfts/giga-buds.png",
    bgColor: "from-green-600 to-emerald-600"
  },
  {
    id: 7,
    name: "My new life begins Monday (MONDAY)",
    description: "",
    creator: "8CnRLz",
    timeAgo: "5m ago",
    marketCap: "$5.8K",
    replies: 0,
    image: "/images/nfts/12.webp",
    bgColor: "from-green-500 to-blue-500"
  },
  {
    id: 8,
    name: "Hell (Hell)",
    description: "Hell – The unholy coin for pure degeneracy. Where angels get liquidated, and only the strongest memes survive. No halos, no salvation—just chaos, fire, and alpha that burns brighter than Heaven could ever handle",
    creator: "8uX9WM",
    timeAgo: "5m ago",
    marketCap: "$6.0K",
    replies: 1,
    image: "/images/nfts/GRVRP3VXkAA8nul.jpg",
    bgColor: "from-red-600 to-orange-700"
  },
  {
    id: 9,
    name: "potato fry 薯蛋 (potato)",
    description: "",
    creator: "556pbL",
    timeAgo: "4m ago",
    marketCap: "$5.3K",
    replies: 2,
    image: "/images/nfts/tensorians.png",
    bgColor: "from-yellow-500 to-orange-500"
  }
];

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function CreatorPage({ params }: PageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const creatorId = parseInt(resolvedParams.id)
  const creator = creatorsData.find(c => c.id === creatorId)

  const handleBack = () => {
    router.push('/')
  }

  if (!creator) {
    return (
      <div className="bg-black min-h-[80vh] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Creator Not Found</h1>
          <p className="text-gray-400 mb-6">The creator you're looking for doesn't exist.</p>
          <button 
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return <CreatorProfilePage creator={creator} onBack={handleBack} />
} 