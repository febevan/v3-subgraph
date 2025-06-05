import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0xd02b0aF9b4A8062D13e07431eDbC6bE9c9BDdb3A'

export const REFERENCE_TOKEN = '0xB210D2120d57b758EE163cFfb43e73728c471Cf1' // 需要替换为实际的 WETH 地址
export const STABLE_TOKEN_POOL = '0x6f3823656df23dc53bcf94b41294967726804107' // 需要替换为实际的稳定币池地址

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
  '0x60EFCa24B785391C6063ba37fF917Ff0edEb9f4a', // USDT
  '0x47725537961326e4b906558BD208012c6C11aCa2', // USDC
  '0x710324576c5933f2C0446136516DC3E91226f916' // DAI
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

