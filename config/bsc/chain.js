"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = graph_ts_1.Address.fromString('0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7');
exports.REFERENCE_TOKEN = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'; // WBNB
exports.STABLE_TOKEN_POOL = '0x6fe9e9de56356f7edbfcbb29fab7cd69471a4869'; // WBNB/USDT 0.05%
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('100');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    exports.REFERENCE_TOKEN,
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    '0x55d398326f99059ff775485246999027b3197955', // USDT
];
exports.STABLE_COINS = [
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    '0x55d398326f99059ff775485246999027b3197955',
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
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
