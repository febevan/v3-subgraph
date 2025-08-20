"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0x7a5028BDa40e7B173C278C5342087826455ea25a';
exports.REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006';
exports.STABLE_TOKEN_POOL = '0x5f835420502a7702de50cd0e78d8aa3608b2137e';
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
    '0x4200000000000000000000000000000000000006',
    '0x79a02482a880bce3f13e09da970dc34db4cd24d1',
    '0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3',
    '0x2cfc85d8e48f8eab294be644d9e25c3030863003',
    '0x859dbe24b90c9f2f7742083d3cf59ca41f55be5d', // sDAI
];
exports.STABLE_COINS = [
    '0x79a02482a880bce3f13e09da970dc34db4cd24d1', // USDC.e
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
