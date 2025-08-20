"use strict";
exports.__esModule = true;
exports.handleCollect = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var pricing_1 = require("../../common/pricing");
var utils_1 = require("../../common/utils");
var intervalUpdates_1 = require("./intervalUpdates");
var utils_2 = require("./utils");
function handleCollect(event) {
    var factoryAddress = chain_1.FACTORY_ADDRESS;
    var bundle = schema_1.Bundle.load('1');
    var pool = schema_1.Pool.load(event.address);
    if (pool == null) {
        return;
    }
    var transaction = (0, utils_2.loadTransaction)(event);
    var factory = schema_1.Factory.load(factoryAddress);
    var token0 = schema_1.Token.load(pool.token0);
    var token1 = schema_1.Token.load(pool.token1);
    if (token0 == null || token1 == null) {
        return;
    }
    // Get formatted amounts collected.
    var collectedAmountToken0 = (0, utils_1.convertTokenToDecimal)(event.params.amount0, token0.decimals);
    var collectedAmountToken1 = (0, utils_1.convertTokenToDecimal)(event.params.amount1, token1.decimals);
    var trackedCollectedAmountUSD = (0, pricing_1.getTrackedAmountUSD)(collectedAmountToken0, token0, collectedAmountToken1, token1);
    // Reset tvl aggregates until new amounts calculated
    factory.totalValueLockedETH = factory.totalValueLockedETH.minus(pool.totalValueLockedETH);
    // Update globals
    factory.txCount = factory.txCount.plus(constants_1.ONE_BI);
    // update token data
    token0.txCount = token0.txCount.plus(constants_1.ONE_BI);
    token0.totalValueLocked = token0.totalValueLocked.minus(collectedAmountToken0);
    token0.totalValueLockedUSD = token0.totalValueLocked.times(token0.derivedETH.times(bundle.ethPriceUSD));
    token1.txCount = token1.txCount.plus(constants_1.ONE_BI);
    token1.totalValueLocked = token1.totalValueLocked.minus(collectedAmountToken1);
    token1.totalValueLockedUSD = token1.totalValueLocked.times(token1.derivedETH.times(bundle.ethPriceUSD));
    // Adjust pool TVL based on amount collected.
    pool.txCount = pool.txCount.plus(constants_1.ONE_BI);
    pool.totalValueLockedToken0 = pool.totalValueLockedToken0.minus(collectedAmountToken0);
    pool.totalValueLockedToken1 = pool.totalValueLockedToken1.minus(collectedAmountToken1);
    pool.totalValueLockedETH = pool.totalValueLockedToken0
        .times(token0.derivedETH)
        .plus(pool.totalValueLockedToken1.times(token1.derivedETH));
    pool.totalValueLockedUSD = pool.totalValueLockedETH.times(bundle.ethPriceUSD);
    // Update aggregate fee collection values.
    pool.collectedFeesToken0 = pool.collectedFeesToken0.plus(collectedAmountToken0);
    pool.collectedFeesToken1 = pool.collectedFeesToken1.plus(collectedAmountToken1);
    pool.collectedFeesUSD = pool.collectedFeesUSD.plus(trackedCollectedAmountUSD);
    // reset aggregates with new amounts
    factory.totalValueLockedETH = factory.totalValueLockedETH.plus(pool.totalValueLockedETH);
    factory.totalValueLockedUSD = factory.totalValueLockedETH.times(bundle.ethPriceUSD);
    var collect = new schema_1.Collect(transaction.id + '-' + event.logIndex.toString());
    collect.transaction = transaction.id;
    collect.timestamp = event.block.timestamp;
    collect.pool = pool.id;
    collect.owner = event.params.owner;
    collect.amount0 = collectedAmountToken0;
    collect.amount1 = collectedAmountToken1;
    collect.amountUSD = trackedCollectedAmountUSD;
    collect.tickLower = graph_ts_1.BigInt.fromI32(event.params.tickLower);
    collect.tickUpper = graph_ts_1.BigInt.fromI32(event.params.tickUpper);
    collect.logIndex = event.logIndex;
    (0, intervalUpdates_1.updateUniswapDayData)(event, factoryAddress);
    (0, intervalUpdates_1.updatePoolDayData)(event);
    (0, intervalUpdates_1.updatePoolHourData)(event);
    (0, intervalUpdates_1.updateTokenDayData)(token0, event);
    (0, intervalUpdates_1.updateTokenDayData)(token1, event);
    (0, intervalUpdates_1.updateTokenHourData)(token0, event);
    (0, intervalUpdates_1.updateTokenHourData)(token1, event);
    token0.save();
    token1.save();
    factory.save();
    pool.save();
    collect.save();
    return;
}
exports.handleCollect = handleCollect;
