"use strict";
exports.__esModule = true;
exports.STATIC_TOKEN_DEFINITIONS = exports.TokenDefinition = exports.POOL_MAPINGS = exports.SKIP_POOLS = exports.STABLE_COINS = exports.WHITELIST_TOKENS = exports.ROLL_DELETE_MINUTE_LIMITER = exports.ROLL_DELETE_HOUR_LIMITER = exports.ROLL_DELETE_MINUTE = exports.ROLL_DELETE_HOUR = exports.MINIMUM_NATIVE_LOCKED = exports.MATURE_MARKET = exports.TVL_MULTIPLIER_THRESHOLD = exports.STABLE_TOKEN_POOL = exports.REFERENCE_TOKEN = exports.FACTORY_ADDRESS = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
exports.FACTORY_ADDRESS = graph_ts_1.Address.fromString('0x1F98431c8aD98523631AE4a59f267346ea31F984');
exports.REFERENCE_TOKEN = '0x471ece3750da237f93b8e339c536989b8978a438';
exports.STABLE_TOKEN_POOL = '0x079e7a44f42e9cd2442c3b9536244be634e8f888';
exports.TVL_MULTIPLIER_THRESHOLD = '2';
exports.MATURE_MARKET = '1000000';
exports.MINIMUM_NATIVE_LOCKED = graph_ts_1.BigDecimal.fromString('3600');
exports.ROLL_DELETE_HOUR = 768;
exports.ROLL_DELETE_MINUTE = 1680;
exports.ROLL_DELETE_HOUR_LIMITER = graph_ts_1.BigInt.fromI32(500);
exports.ROLL_DELETE_MINUTE_LIMITER = graph_ts_1.BigInt.fromI32(1000);
// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with
exports.WHITELIST_TOKENS = [
    '0x471ece3750da237f93b8e339c536989b8978a438',
    '0x765de816845861e75a25fca122bb6898b8b1282a',
    '0xef4229c8c3250c675f21bcefa42f58efbff6002a',
    '0xceba9300f2b948710d2653dd7b07f33a8b32118c',
    '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
    '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
    '0x46c9757c5497c5b1f2eb73ae79b6b67d119b0b58',
    '0x17700282592d6917f6a73d0bf8accf4d578c131e',
    '0x66803fb87abd4aac3cbb3fad7c3aa01f6f3fb207',
    '0xbaab46e28388d2779e6e31fd00cf0e5ad95e327b', // WBTC
];
exports.STABLE_COINS = [
    '0x765de816845861e75a25fca122bb6898b8b1282a',
    '0xef4229c8c3250c675f21bcefa42f58efbff6002a',
    '0xceba9300f2b948710d2653dd7b07f33a8b32118c', // Native USDC
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
