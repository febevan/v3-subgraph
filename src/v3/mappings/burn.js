"use strict";
exports.__esModule = true;
exports.handleBurn = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var utils_1 = require("../../common/utils");
var intervalUpdates_1 = require("./intervalUpdates");
var utils_2 = require("./utils");
function handleBurn(event) {
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
        // update globals
        factory.txCount = factory.txCount.plus(constants_1.ONE_BI);
        // update token0 data
        token0.txCount = token0.txCount.plus(constants_1.ONE_BI);
        // update token1 data
        token1.txCount = token1.txCount.plus(constants_1.ONE_BI);
        // pool data
        pool.txCount = pool.txCount.plus(constants_1.ONE_BI);
        // Pools liquidity tracks the currently active liquidity given pools current tick.
        // We only want to update it on burn if the position being burnt includes the current tick.
        if (pool.tick !== null &&
            graph_ts_1.BigInt.fromI32(event.params.tickLower).le(pool.tick) &&
            graph_ts_1.BigInt.fromI32(event.params.tickUpper).gt(pool.tick)) {
            // todo: this liquidity can be calculated from the real reserves and
            // current price instead of incrementally from every burned amount which
            // may not be accurate: https://linear.app/uniswap/issue/DAT-336/fix-pool-liquidity
            pool.liquidity = pool.liquidity.minus(event.params.amount);
        }
        // burn entity
        var transaction = (0, utils_2.loadTransaction)(event);
        var burn = new schema_1.Burn(transaction.id + '-' + event.logIndex.toString());
        burn.transaction = transaction.id;
        burn.timestamp = transaction.timestamp;
        burn.pool = pool.id;
        burn.token0 = pool.token0;
        burn.token1 = pool.token1;
        burn.owner = event.params.owner;
        burn.origin = event.transaction.from;
        burn.amount = event.params.amount;
        burn.amount0 = amount0;
        burn.amount1 = amount1;
        burn.amountUSD = amountUSD;
        burn.tickLower = graph_ts_1.BigInt.fromI32(event.params.tickLower);
        burn.tickUpper = graph_ts_1.BigInt.fromI32(event.params.tickUpper);
        burn.logIndex = event.logIndex;
        // tick entities
        var lowerTickId = pool.id.toHexString() + '#' + graph_ts_1.BigInt.fromI32(event.params.tickLower).toString();
        var upperTickId = pool.id.toHexString() + '#' + graph_ts_1.BigInt.fromI32(event.params.tickUpper).toString();
        var lowerTick = schema_1.Tick.load(lowerTickId);
        var upperTick = schema_1.Tick.load(upperTickId);
        if (lowerTick && upperTick) {
            var amount = event.params.amount;
            lowerTick.liquidityGross = lowerTick.liquidityGross.minus(amount);
            lowerTick.liquidityNet = lowerTick.liquidityNet.minus(amount);
            upperTick.liquidityGross = upperTick.liquidityGross.minus(amount);
            upperTick.liquidityNet = upperTick.liquidityNet.plus(amount);
            lowerTick.save();
            upperTick.save();
        }
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
        burn.save();
    }
}
exports.handleBurn = handleBurn;
