"use strict";
exports.__esModule = true;
exports.updateTokenHourData = exports.updateTokenDayData = exports.updatePoolHourData = exports.updatePoolDayData = exports.updateUniswapDayData = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var constants_1 = require("../../common/constants");
/**
 * Tracks global aggregate data over daily windows
 * @param event
 */
function updateUniswapDayData(event, factoryAddress) {
    var uniswap = schema_1.Factory.load(factoryAddress);
    var timestamp = event.block.timestamp.toI32();
    var dayID = timestamp / 86400; // rounded
    var dayStartTimestamp = dayID * 86400;
    var uniswapDayData = schema_1.UniswapDayData.load(dayID.toString());
    if (uniswapDayData === null) {
        uniswapDayData = new schema_1.UniswapDayData(dayID.toString());
        uniswapDayData.date = dayStartTimestamp;
        uniswapDayData.volumeETH = constants_1.ZERO_BD;
        uniswapDayData.volumeUSD = constants_1.ZERO_BD;
        uniswapDayData.volumeUSDUntracked = constants_1.ZERO_BD;
        uniswapDayData.feesUSD = constants_1.ZERO_BD;
    }
    uniswapDayData.tvlUSD = uniswap.totalValueLockedUSD;
    uniswapDayData.txCount = uniswap.txCount;
    uniswapDayData.save();
    return uniswapDayData;
}
exports.updateUniswapDayData = updateUniswapDayData;
function updatePoolDayData(event) {
    var timestamp = event.block.timestamp.toI32();
    var dayID = timestamp / 86400;
    var dayStartTimestamp = dayID * 86400;
    var dayPoolID = event.address.toHexString().concat('-').concat(dayID.toString());
    var pool = schema_1.Pool.load(event.address);
    var poolDayData = schema_1.PoolDayData.load(dayPoolID);
    if (poolDayData === null) {
        poolDayData = new schema_1.PoolDayData(dayPoolID);
        poolDayData.date = dayStartTimestamp;
        poolDayData.pool = pool.id;
        // things that dont get initialized always
        poolDayData.volumeToken0 = constants_1.ZERO_BD;
        poolDayData.volumeToken1 = constants_1.ZERO_BD;
        poolDayData.volumeUSD = constants_1.ZERO_BD;
        poolDayData.feesUSD = constants_1.ZERO_BD;
        poolDayData.txCount = constants_1.ZERO_BI;
        poolDayData.open = pool.token0Price;
        poolDayData.high = pool.token0Price;
        poolDayData.low = pool.token0Price;
        poolDayData.close = pool.token0Price;
    }
    if (pool.token0Price.gt(poolDayData.high)) {
        poolDayData.high = pool.token0Price;
    }
    if (pool.token0Price.lt(poolDayData.low)) {
        poolDayData.low = pool.token0Price;
    }
    poolDayData.liquidity = pool.liquidity;
    poolDayData.sqrtPrice = pool.sqrtPrice;
    poolDayData.token0Price = pool.token0Price;
    poolDayData.token1Price = pool.token1Price;
    poolDayData.close = pool.token0Price;
    poolDayData.tick = pool.tick;
    poolDayData.tvlUSD = pool.totalValueLockedUSD;
    poolDayData.txCount = poolDayData.txCount.plus(constants_1.ONE_BI);
    poolDayData.save();
    return poolDayData;
}
exports.updatePoolDayData = updatePoolDayData;
function updatePoolHourData(event) {
    var timestamp = event.block.timestamp.toI32();
    var hourIndex = timestamp / 3600; // get unique hour within unix history
    var hourStartUnix = hourIndex * 3600; // want the rounded effect
    var hourPoolID = event.address.toHexString().concat('-').concat(hourIndex.toString());
    var pool = schema_1.Pool.load(event.address);
    var poolHourData = schema_1.PoolHourData.load(hourPoolID);
    if (poolHourData === null) {
        poolHourData = new schema_1.PoolHourData(hourPoolID);
        poolHourData.periodStartUnix = hourStartUnix;
        poolHourData.pool = pool.id;
        // things that dont get initialized always
        poolHourData.volumeToken0 = constants_1.ZERO_BD;
        poolHourData.volumeToken1 = constants_1.ZERO_BD;
        poolHourData.volumeUSD = constants_1.ZERO_BD;
        poolHourData.txCount = constants_1.ZERO_BI;
        poolHourData.feesUSD = constants_1.ZERO_BD;
        poolHourData.open = pool.token0Price;
        poolHourData.high = pool.token0Price;
        poolHourData.low = pool.token0Price;
        poolHourData.close = pool.token0Price;
    }
    if (pool.token0Price.gt(poolHourData.high)) {
        poolHourData.high = pool.token0Price;
    }
    if (pool.token0Price.lt(poolHourData.low)) {
        poolHourData.low = pool.token0Price;
    }
    poolHourData.liquidity = pool.liquidity;
    poolHourData.sqrtPrice = pool.sqrtPrice;
    poolHourData.token0Price = pool.token0Price;
    poolHourData.token1Price = pool.token1Price;
    poolHourData.close = pool.token0Price;
    poolHourData.tick = pool.tick;
    poolHourData.tvlUSD = pool.totalValueLockedUSD;
    poolHourData.txCount = poolHourData.txCount.plus(constants_1.ONE_BI);
    poolHourData.save();
    // test
    return poolHourData;
}
exports.updatePoolHourData = updatePoolHourData;
function updateTokenDayData(token, event) {
    var bundle = schema_1.Bundle.load('1');
    var timestamp = event.block.timestamp.toI32();
    var dayID = timestamp / 86400;
    var dayStartTimestamp = dayID * 86400;
    var tokenDayID = graph_ts_1.Address.fromBytes(token.id).toHexString().concat('-').concat(dayID.toString());
    var tokenPrice = token.derivedETH.times(bundle.ethPriceUSD);
    var tokenDayData = schema_1.TokenDayData.load(tokenDayID);
    if (tokenDayData === null) {
        tokenDayData = new schema_1.TokenDayData(tokenDayID);
        tokenDayData.date = dayStartTimestamp;
        tokenDayData.token = token.id;
        tokenDayData.volume = constants_1.ZERO_BD;
        tokenDayData.volumeUSD = constants_1.ZERO_BD;
        tokenDayData.feesUSD = constants_1.ZERO_BD;
        tokenDayData.untrackedVolumeUSD = constants_1.ZERO_BD;
        tokenDayData.open = tokenPrice;
        tokenDayData.high = tokenPrice;
        tokenDayData.low = tokenPrice;
        tokenDayData.close = tokenPrice;
    }
    if (tokenPrice.gt(tokenDayData.high)) {
        tokenDayData.high = tokenPrice;
    }
    if (tokenPrice.lt(tokenDayData.low)) {
        tokenDayData.low = tokenPrice;
    }
    tokenDayData.close = tokenPrice;
    tokenDayData.priceUSD = token.derivedETH.times(bundle.ethPriceUSD);
    tokenDayData.totalValueLocked = token.totalValueLocked;
    tokenDayData.totalValueLockedUSD = token.totalValueLockedUSD;
    tokenDayData.save();
    return tokenDayData;
}
exports.updateTokenDayData = updateTokenDayData;
function updateTokenHourData(token, event) {
    var bundle = schema_1.Bundle.load('1');
    var timestamp = event.block.timestamp.toI32();
    var hourIndex = timestamp / 3600; // get unique hour within unix history
    var hourStartUnix = hourIndex * 3600; // want the rounded effect
    var tokenHourID = graph_ts_1.Address.fromBytes(token.id).toHexString().concat('-').concat(hourIndex.toString());
    var tokenHourData = schema_1.TokenHourData.load(tokenHourID);
    var tokenPrice = token.derivedETH.times(bundle.ethPriceUSD);
    if (tokenHourData === null) {
        tokenHourData = new schema_1.TokenHourData(tokenHourID);
        tokenHourData.periodStartUnix = hourStartUnix;
        tokenHourData.token = token.id;
        tokenHourData.volume = constants_1.ZERO_BD;
        tokenHourData.volumeUSD = constants_1.ZERO_BD;
        tokenHourData.untrackedVolumeUSD = constants_1.ZERO_BD;
        tokenHourData.feesUSD = constants_1.ZERO_BD;
        tokenHourData.open = tokenPrice;
        tokenHourData.high = tokenPrice;
        tokenHourData.low = tokenPrice;
        tokenHourData.close = tokenPrice;
    }
    if (tokenPrice.gt(tokenHourData.high)) {
        tokenHourData.high = tokenPrice;
    }
    if (tokenPrice.lt(tokenHourData.low)) {
        tokenHourData.low = tokenPrice;
    }
    tokenHourData.close = tokenPrice;
    tokenHourData.priceUSD = tokenPrice;
    tokenHourData.totalValueLocked = token.totalValueLocked;
    tokenHourData.totalValueLockedUSD = token.totalValueLockedUSD;
    tokenHourData.save();
    return tokenHourData;
}
exports.updateTokenHourData = updateTokenHourData;
