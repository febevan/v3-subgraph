"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
exports.REFERENCE_TOKEN = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
exports.STABLE_TOKEN_POOL = '0x17c14d2c404d167802b16c450d3c99f88f2c4f4d';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('20');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
exports.WHITELIST_TOKENS = [
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
];
exports.STABLE_COINS = [
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
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
        address: graph_ts_1.Address.fromString(exports.REFERENCE_TOKEN),
        symbol: 'WETH',
        name: 'Wrapped Ethereum',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
    {
        address: graph_ts_1.Address.fromString('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'),
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: graph_ts_1.BigInt.fromI32(6)
    },
];
