import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0xa4eE64Df948e3FB4C5EA9974729E9F10557aE14E'

export const REFERENCE_TOKEN = '0xCA8aAceEC5Db1e91B9Ed3a344bA026c4a2B3ebF6' // 需要替换为实际的 WETH 地址
export const STABLE_TOKEN_POOL = '0xbE6cAD380f232d848C788d2d7D65DC9A50d2eCC3' // 需要替换为实际的稳定币池地址

export const TVL_MULTIPLIER_THRESHOLD = '2'
export const MATURE_MARKET = '1000000'
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('20')

export const ROLL_DELETE_HOUR = 768
export const ROLL_DELETE_MINUTE = 1680

export const ROLL_DELETE_HOUR_LIMITER = BigInt.fromI32(500)
export const ROLL_DELETE_MINUTE_LIMITER = BigInt.fromI32(1000)

// 需要根据实际情况配置白名单代币
export const WHITELIST_TOKENS: string[] = [
  REFERENCE_TOKEN, // WETH
  '0xbE6cAD380f232d848C788d2d7D65DC9A50d2eCC3', // USDT
]

export const STABLE_COINS: string[] = []

export const SKIP_POOLS: string[] = []

export const POOL_MAPINGS: Array<Address[]> = []

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = []

