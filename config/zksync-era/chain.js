"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x8fda5a7a8dca67bbcdd10f02fa0649a937215422';
exports.REFERENCE_TOKEN = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91';
exports.STABLE_TOKEN_POOL = '0x3e3dd517fec2e70eddba2a626422a4ba286e8c38';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('1');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
    '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
    '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
    '0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4',
    '0x5a7d6b2f92c77fad6ccabd7ee0624e64907eaf3e', // ZK
];
exports.STABLE_COINS = [
    '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
    '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
    '0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4', // USDC
];
exports.SKIP_POOLS = [];
exports.POOL_MAPINGS = [];
var TokenDefinition = /** @class */ (function () {
    function TokenDefinition() {
    }
    return TokenDefinition;
}());
exports.TokenDefinition = TokenDefinition;
exports.STATIC_TOKEN_DEFINITIONS = [
    {
        address: graph_ts_1.Address.fromString('0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'),
        symbol: 'USDC.e',
        name: 'Bridged USDC (zkSync)',
        decimals: graph_ts_1.BigInt.fromI32(6)
    },
];
