"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
exports.REFERENCE_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
exports.STABLE_TOKEN_POOL = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8';
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
    exports.REFERENCE_TOKEN,
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x0000000000085d4780b73119b644ae5ecd22b376',
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    '0x86fadb80d8d2cff3c3680819e4da99c10232ba0f',
    '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    '0xc00e94cb662c3520282e6f5717214004a7f26888',
    '0x514910771af9ca656af840dff83e8264ecf986ca',
    '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    '0x111111111117dc0aa78b770fa6a738034120c302',
    '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
    '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    '0xfe2e637202056d30016725477c5da089ab0a043a', // sETH2
];
exports.STABLE_COINS = [
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x0000000000085d4780b73119b644ae5ecd22b376',
    '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
    '0x4dd28568d05f09b02220b09c2cb307bfd837cb95',
];
exports.SKIP_POOLS = ['0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248'];
exports.POOL_MAPINGS = [];
var TokenDefinition = /** @class */ (function () {
    function TokenDefinition() {
    }
    return TokenDefinition;
}());
exports.TokenDefinition = TokenDefinition;
exports.STATIC_TOKEN_DEFINITIONS = [
    {
        address: graph_ts_1.Address.fromString('0xe0b7927c4af23765cb51314a0e0521a9645f0e2a'),
        symbol: 'DGD',
        name: 'DGD',
        decimals: graph_ts_1.BigInt.fromI32(9)
    },
    {
        address: graph_ts_1.Address.fromString('0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'),
        symbol: 'AAVE',
        name: 'Aave Token',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
    {
        address: graph_ts_1.Address.fromString('0xeb9951021698b42e4399f9cbb6267aa35f82d59d'),
        symbol: 'LIF',
        name: 'Lif',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
    {
        address: graph_ts_1.Address.fromString('0xbdeb4b83251fb146687fa19d1c660f99411eefe3'),
        symbol: 'SVD',
        name: 'savedroid',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
    {
        address: graph_ts_1.Address.fromString('0xbb9bc244d798123fde783fcc1c72d3bb8c189413'),
        symbol: 'TheDAO',
        name: 'TheDAO',
        decimals: graph_ts_1.BigInt.fromI32(16)
    },
    {
        address: graph_ts_1.Address.fromString('0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2'),
        symbol: 'HPB',
        name: 'HPBCoin',
        decimals: graph_ts_1.BigInt.fromI32(18)
    },
];
