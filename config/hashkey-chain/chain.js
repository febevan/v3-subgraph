"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = '0xd02b0aF9b4A8062D13e07431eDbC6bE9c9BDdb3A';
exports.REFERENCE_TOKEN = '0xB210D2120d57b758EE163cFfb43e73728c471Cf1'; // 需要替换为实际的 WETH 地址
exports.STABLE_TOKEN_POOL = '0x6f3823656df23dc53bcf94b41294967726804107'; // 需要替换为实际的稳定币池地址
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('20');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// 需要根据实际情况配置白名单代币
exports.WHITELIST_TOKENS = [
    exports.REFERENCE_TOKEN,
    '0x60EFCa24B785391C6063ba37fF917Ff0edEb9f4a',
    '0x47725537961326e4b906558BD208012c6C11aCa2',
    '0x710324576c5933f2C0446136516DC3E91226f916' // DAI
];
exports.STABLE_COINS = [];
exports.SKIP_POOLS = [];
exports.POOL_MAPINGS = [];
var TokenDefinition = /** @class */ (function () {
    function TokenDefinition() {
    }
    return TokenDefinition;
}());
exports.TokenDefinition = TokenDefinition;
exports.STATIC_TOKEN_DEFINITIONS = [];
