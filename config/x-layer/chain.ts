import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0xba98FAD3B122B0B03dA78A73c2374DD8170C3B3e'

export const REFERENCE_TOKEN = '0xe538905cf8410324e03a5a23c1c177a474d59b2b' // WOKB
export const STABLE_TOKEN_POOL = '' // 暂时为空，等待添加池子后更新

export const TVL_MULTIPLIER_THRESHOLD = '2'
export const MATURE_MARKET = '1000000'
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('20')

export const ROLL_DELETE_HOUR = 768
export const ROLL_DELETE_MINUTE = 1680

export const ROLL_DELETE_HOUR_LIMITER = BigInt.fromI32(500)
export const ROLL_DELETE_MINUTE_LIMITER = BigInt.fromI32(1000)

// token where amounts should contribute to tracked volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xe538905cf8410324e03a5a23c1c177a474d59b2b', // WOKB
  '0x1e4a5963abfd975d8c9021ce480b42188849d41d', // USDT
  '0x5a77f1443d16ee5761d310e38b62f77f726bc71c', // WETH
]

export const STABLE_COINS: string[] = [
  '0x1e4a5963abfd975d8c9021ce480b42188849d41d', // USDT
]

export const SKIP_POOLS: string[] = []

export const POOL_MAPINGS: Array<Address[]> = []

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = [
  {
    address: Address.fromString('0xe538905cf8410324e03a5a23c1c177a474d59b2b'),
    symbol: 'WOKB',
    name: 'Wrapped OKB',
    decimals: BigInt.fromI32(18),
  },
  {
    address: Address.fromString('0x1e4a5963abfd975d8c9021ce480b42188849d41d'),
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: BigInt.fromI32(6),
  },
  {
    address: Address.fromString('0x5a77f1443d16ee5761d310e38b62f77f726bc71c'),
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: BigInt.fromI32(18),
  },
]
