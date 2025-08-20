"use strict";
exports.__esModule = true;
exports.handleMint = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var utils_1 = require("../../common/utils");
var intervalUpdates_1 = require("./intervalUpdates");
var tick_1 = require("./tick");
var utils_2 = require("./utils");
function handleMint(event) {
    var factoryAddress = chain_1.FACTORY_ADDRESS;
    var bundle = schema_1.Bundle.load('1');
    var pool = schema_1.Pool.load(event.address);
    var factory = schema_1.Factory.load(factoryAddress);
    var token0 = schema_1.Token.load(pool.token0);
    var token1 = schema_1.Token.load(pool.token1);
    if (token0 && token1) {
        var amount0 = (0, utils_1.convertTokenToDecimal)(event.params.amount0, token0.decimals);
        var amount1 = (0, utils_1.convertTokenToDecimal)(event.params.amount1, token1.decimals);
        var amountUSD = amount0
            .times(token0.derivedETH.times(bundle.ethPriceUSD))
            .plus(amount1.times(token1.derivedETH.times(bundle.ethPriceUSD)));
        // reset tvl aggregates until new amounts calculated
        factory.totalValueLockedETH = factory.totalValueLockedETH.minus(pool.totalValueLockedETH);
        // update globals
        factory.txCount = factory.txCount.plus(constants_1.ONE_BI);
        // update token0 data
        token0.txCount = token0.txCount.plus(constants_1.ONE_BI);
        token0.totalValueLocked = token0.totalValueLocked.plus(amount0);
        token0.totalValueLockedUSD = token0.totalValueLocked.times(token0.derivedETH.times(bundle.ethPriceUSD));
        // update token1 data
        token1.txCount = token1.txCount.plus(constants_1.ONE_BI);
        token1.totalValueLocked = token1.totalValueLocked.plus(amount1);
        token1.totalValueLockedUSD = token1.totalValueLocked.times(token1.derivedETH.times(bundle.ethPriceUSD));
        // pool data
        pool.txCount = pool.txCount.plus(constants_1.ONE_BI);
        // Pools liquidity tracks the currently active liquidity given pools current tick.
        // We only want to update it on mint if the new position includes the current tick.
        if (pool.tick !== null &&
            graph_ts_1.BigInt.fromI32(event.params.tickLower).le(pool.tick) &&
            graph_ts_1.BigInt.fromI32(event.params.tickUpper).gt(pool.tick)) {
            pool.liquidity = pool.liquidity.plus(event.params.amount);
        }
        pool.totalValueLockedToken0 = pool.totalValueLockedToken0.plus(amount0);
        pool.totalValueLockedToken1 = pool.totalValueLockedToken1.plus(amount1);
        pool.totalValueLockedETH = pool.totalValueLockedToken0
            .times(token0.derivedETH)
            .plus(pool.totalValueLockedToken1.times(token1.derivedETH));
        pool.totalValueLockedUSD = pool.totalValueLockedETH.times(bundle.ethPriceUSD);
        // reset aggregates with new amounts
        factory.totalValueLockedETH = factory.totalValueLockedETH.plus(pool.totalValueLockedETH);
        factory.totalValueLockedUSD = factory.totalValueLockedETH.times(bundle.ethPriceUSD);
        var transaction = (0, utils_2.loadTransaction)(event);
        var mint = new schema_1.Mint(transaction.id.toString() + '-' + event.logIndex.toString());
        mint.transaction = transaction.id;
        mint.timestamp = transaction.timestamp;
        mint.pool = pool.id;
        mint.token0 = pool.token0;
        mint.token1 = pool.token1;
        mint.owner = event.params.owner;
        mint.sender = event.params.sender;
        mint.origin = event.transaction.from;
        mint.amount = event.params.amount;
        mint.amount0 = amount0;
        mint.amount1 = amount1;
        mint.amountUSD = amountUSD;
        mint.tickLower = graph_ts_1.BigInt.fromI32(event.params.tickLower);
        mint.tickUpper = graph_ts_1.BigInt.fromI32(event.params.tickUpper);
        mint.logIndex = event.logIndex;
        // tick entities
        var lowerTickIdx = event.params.tickLower;
        var upperTickIdx = event.params.tickUpper;
        var lowerTickId = pool.id.toHexString() + '#' + graph_ts_1.BigInt.fromI32(event.params.tickLower).toString();
        var upperTickId = pool.id.toHexString() + '#' + graph_ts_1.BigInt.fromI32(event.params.tickUpper).toString();
        var lowerTick = schema_1.Tick.load(lowerTickId);
        var upperTick = schema_1.Tick.load(upperTickId);
        if (lowerTick === null) {
            lowerTick = (0, tick_1.createTick)(lowerTickId, lowerTickIdx, pool.id, event);
        }
        if (upperTick === null) {
            upperTick = (0, tick_1.createTick)(upperTickId, upperTickIdx, pool.id, event);
        }
        var amount = event.params.amount;
        lowerTick.liquidityGross = lowerTick.liquidityGross.plus(amount);
        lowerTick.liquidityNet = lowerTick.liquidityNet.plus(amount);
        upperTick.liquidityGross = upperTick.liquidityGross.plus(amount);
        upperTick.liquidityNet = upperTick.liquidityNet.minus(amount);
        lowerTick.save();
        upperTick.save();
        // TODO: Update Tick's volume, fees, and liquidity provider count. Computing these on the tick
        // level requires reimplementing some of the swapping code from v3-core.
        (0, intervalUpdates_1.updateUniswapDayData)(event, factoryAddress);
        (0, intervalUpdates_1.updatePoolDayData)(event);
        (0, intervalUpdates_1.updatePoolHourData)(event);
        (0, intervalUpdates_1.updateTokenDayData)(token0, event);
        (0, intervalUpdates_1.updateTokenDayData)(token1, event);
        (0, intervalUpdates_1.updateTokenHourData)(token0, event);
        (0, intervalUpdates_1.updateTokenHourData)(token1, event);
        token0.save();
        token1.save();
        pool.save();
        factory.save();
        mint.save();
    }
}
exports.handleMint = handleMint;
