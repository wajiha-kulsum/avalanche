export * from './wallet'

export interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
  totalSupply: string
  creator: string
  createdAt: number
  description?: string
  image?: string
  website?: string
  twitter?: string
  telegram?: string
}

export interface PumpToken extends Token {
  marketCap: number
  price: number
  volume24h: number
  holders: number
  isGraduated: boolean
  bondingCurveProgress: number
} 