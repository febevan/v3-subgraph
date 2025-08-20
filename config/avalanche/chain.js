"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD';
exports.REFERENCE_TOKEN = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7';
exports.STABLE_TOKEN_POOL = '0xfae3f424a0a47706811521e3ee268f00cfb5c45e';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('1000');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    exports.REFERENCE_TOKEN,
    '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
    '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a',
    '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    '0xc7198437980c041c805a1edcba50c1ce5db95118',
    '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    '0x130966628846bfd36ff31a822705796e8cb8c18d', // mim
];
exports.STABLE_COINS = [
    '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
    '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a',
    '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    '0xc7198437980c041c805a1edcba50c1ce5db95118',
    '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7', // usdt
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
