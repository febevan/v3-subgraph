"use strict";
exports.__esModule = true;
exports.getTrackedAmountUSD = exports.findEthPerToken = exports.getEthPriceInUSD = exports.sqrtPriceX96ToTokenPrices = void 0;
/* eslint-disable prefer-const */
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../generated/schema");
var chain_1 = require("./chain");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var Q192 = graph_ts_1.BigInt.fromI32(2).pow(192);
function sqrtPriceX96ToTokenPrices(sqrtPriceX96, token0, token1) {
    var num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal();
    var denom = graph_ts_1.BigDecimal.fromString(Q192.toString());
    var price1 = (0, utils_1.safeDiv)((0, utils_1.safeDiv)(num, denom).times((0, utils_1.exponentToBigDecimal)(token0.decimals)), (0, utils_1.exponentToBigDecimal)(token1.decimals));
    var price0 = (0, utils_1.safeDiv)(graph_ts_1.BigDecimal.fromString('1'), price1);
    return [price0, price1];
}
exports.sqrtPriceX96ToTokenPrices = sqrtPriceX96ToTokenPrices;
function getEthPriceInUSD() {
    // fetch eth prices for each stablecoin
    var stablePool = chain_1.STABLE_TOKEN_POOL;
    var usdcPool = schema_1.Pool.load(graph_ts_1.Address.fromString(stablePool)); // dai is token0
    if (usdcPool) {
        if (usdcPool.token0 == graph_ts_1.Address.fromString(chain_1.REFERENCE_TOKEN))
            return usdcPool.token1Price;
        else
            return usdcPool.token0Price;
    }
    else {
        return constants_1.ZERO_BD;
    }
}
exports.getEthPriceInUSD = getEthPriceInUSD;
/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/
function findEthPerToken(token) {
    if (token.id == graph_ts_1.Address.fromString(chain_1.REFERENCE_TOKEN)) {
        return constants_1.ONE_BD;
    }
    var whiteList = token.whitelistPools;
    // for now just take USD from pool with greatest TVL
    // need to update this to actually detect best rate based on liquidity distribution
    var largestLiquidityETH = constants_1.ZERO_BD;
    var priceSoFar = constants_1.ZERO_BD;
    var bundle = schema_1.Bundle.load('1');
    // hardcoded fix for incorrect rates
    // if whitelist includes token - get the safe price
    if (chain_1.STABLE_COINS.includes(token.id.toHexString())) {
        priceSoFar = (0, utils_1.safeDiv)(constants_1.ONE_BD, bundle.ethPriceUSD);
    }
    else {
        for (var i = 0; i < whiteList.length; ++i) {
            var poolAddress = whiteList[i];
            var pool = schema_1.Pool.load(poolAddress);
            if (pool) {
                if (pool.liquidity.gt(constants_1.ZERO_BI)) {
                    if (pool.token0 == token.id) {
                        // whitelist token is token1
                        var token1 = schema_1.Token.load(pool.token1);
                        // get the derived ETH in pool
                        if (token1) {
                            var ethLocked = pool.totalValueLockedToken1.times(token1.derivedETH);
                            if (ethLocked.gt(largestLiquidityETH) && ethLocked.gt(chain_1.MINIMUM_NATIVE_LOCKED)) {
                                largestLiquidityETH = ethLocked;
                                // token1 per our token * Eth per token1
                                priceSoFar = pool.token1Price.times(token1.derivedETH);
                            }
                        }
                    }
                    if (pool.token1 == token.id) {
                        var token0 = schema_1.Token.load(pool.token0);
                        // get the derived ETH in pool
                        if (token0) {
                            var ethLocked = pool.totalValueLockedToken0.times(token0.derivedETH);
                            if (ethLocked.gt(largestLiquidityETH) && ethLocked.gt(chain_1.MINIMUM_NATIVE_LOCKED)) {
                                largestLiquidityETH = ethLocked;
                                // token0 per our token * ETH per token0
                                priceSoFar = pool.token0Price.times(token0.derivedETH);
                            }
                        }
                    }
                }
            }
        }
    }
    return priceSoFar; // nothing was found return 0
}
exports.findEthPerToken = findEthPerToken;
/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
function getTrackedAmountUSD(tokenAmount0, token0, tokenAmount1, token1) {
    var bundle = schema_1.Bundle.load('1');
    var price0USD = token0.derivedETH.times(bundle.ethPriceUSD);
    var price1USD = token1.derivedETH.times(bundle.ethPriceUSD);
    // both are whitelist tokens, return sum of both amounts
    if (chain_1.WHITELIST_TOKENS.includes(token0.id.toHexString()) && chain_1.WHITELIST_TOKENS.includes(token1.id.toHexString())) {
        return tokenAmount0.times(price0USD).plus(tokenAmount1.times(price1USD));
    }
    // take double value of the whitelisted token amount
    if (chain_1.WHITELIST_TOKENS.includes(token0.id.toHexString()) && !chain_1.WHITELIST_TOKENS.includes(token1.id.toHexString())) {
        return tokenAmount0.times(price0USD).times(graph_ts_1.BigDecimal.fromString('2'));
    }
    // take double value of the whitelisted token amount
    if (!chain_1.WHITELIST_TOKENS.includes(token0.id.toHexString()) && chain_1.WHITELIST_TOKENS.includes(token1.id.toHexString())) {
        return tokenAmount1.times(price1USD).times(graph_ts_1.BigDecimal.fromString('2'));
    }
    // neither token is on white list, tracked amount is 0
    return constants_1.ZERO_BD;
}
exports.getTrackedAmountUSD = getTrackedAmountUSD;
