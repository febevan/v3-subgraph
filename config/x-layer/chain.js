"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0xba98FAD3B122B0B03dA78A73c2374DD8170C3B3e';
exports.REFERENCE_TOKEN = '0xe538905cf8410324e03a5a23c1c177a474d59b2b'; // WOKB
exports.STABLE_TOKEN_POOL = ''; // 暂时为空，等待添加池子后更新
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('20');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
exports.WHITELIST_TOKENS = [
    '0xe538905cf8410324e03a5a23c1c177a474d59b2b',
    '0x1e4a5963abfd975d8c9021ce480b42188849d41d',
    '0x5a77f1443d16ee5761d310e38b62f77f726bc71c', // WETH
];
exports.STABLE_COINS = [
    '0x1e4a5963abfd975d8c9021ce480b42188849d41d', // USDT
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
        address: graph_ts_1.Address.fromString('0xe538905cf8410324e03a5a23c1c177a474d59b2b'),
        symbol: 'WOKB',
        name: 'Wrapped OKB',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
    {
        address: graph_ts_1.Address.fromString('0x1e4a5963abfd975d8c9021ce480b42188849d41d'),
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: graph_ts_1.BigInt.fromI32(6)
    },
    {
        address: graph_ts_1.Address.fromString('0x5a77f1443d16ee5761d310e38b62f77f726bc71c'),
        symbol: 'WETH',
        name: 'Wrapped Ether',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
];
