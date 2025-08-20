"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x33128a8fC17869897dcE68Ed026d694621f6FDfD';
exports.REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006';
exports.STABLE_TOKEN_POOL = '0x4c36388be6f416a29c8d8eee81c771ce6be14b18';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('4');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    exports.REFERENCE_TOKEN,
    '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC
];
exports.STABLE_COINS = [
    '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC
];
exports.SKIP_POOLS = [];
exports.POOL_MAPINGS = [];
var TokenDefinition = /** @class */ (function () {
    function TokenDefinition() {
    }
    return TokenDefinition;
}());
exports.TokenDefinition = TokenDefinition;
exports.STATIC_TOKEN_DEFINITIONS = [];
