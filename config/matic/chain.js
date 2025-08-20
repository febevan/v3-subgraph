"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
exports.REFERENCE_TOKEN = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
exports.STABLE_TOKEN_POOL = '0xA374094527e1673A86dE625aa59517c5dE346d32';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('20000');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DA
];
exports.STABLE_COINS = [
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
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
