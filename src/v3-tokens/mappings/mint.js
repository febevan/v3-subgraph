"use strict";
exports.__esModule = true;
exports.handleMint = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var entityGetters_1 = require("../../common/entityGetters");
var utils_1 = require("../../common/utils");
function handleMint(event) {
    var bundle = (0, entityGetters_1.getBundle)();
    var poolAddress = event.address;
    var pool = (0, entityGetters_1.getPool)(poolAddress);
    var factory = (0, entityGetters_1.getFactory)();
    var token0 = schema_1.Token.load(pool.token0);
    var token1 = schema_1.Token.load(pool.token1);
    var amount0 = graph_ts_1.BigDecimal.zero();
    var amount1 = graph_ts_1.BigDecimal.zero();
    if (token0 && token1) {
        amount0 = (0, utils_1.convertTokenToDecimal)(event.params.amount0, token0.decimals);
        amount1 = (0, utils_1.convertTokenToDecimal)(event.params.amount1, token1.decimals);
        // reset tvl aggregates until new amounts calculated
        // KENT TODO: MOVE LOWER - AFTER CHECKING IF POOL APPROVED
        //update position
        // update globals
        factory.txCount = factory.txCount.plus(constants_1.ONE_BI);
        // update token0 data
        token0.txCount = token0.txCount.plus(constants_1.ONE_BI);
        token0.totalValueLocked = token0.totalValueLocked.plus(amount0);
        token0.totalValueLockedUSD = token0.totalValueLocked.times(token0.derivedETH.times(bundle.ethPriceUSD));
        // KENT TODO: CHECK IF APPROVED POOL HERE
        // update token1 data
        token1.txCount = token1.txCount.plus(constants_1.ONE_BI);
        token1.totalValueLocked = token1.totalValueLocked.plus(amount1);
        token1.totalValueLockedUSD = token1.totalValueLocked.times(token1.derivedETH.times(bundle.ethPriceUSD));
        // pool data
        pool.txCount = pool.txCount.plus(constants_1.ONE_BI);
        // Pools liquidity tracks the currently active liquidity given pools current tick.
        // We only want to update it on mint if the new position includes the current tick.
        if (pool.tick &&
            graph_ts_1.BigInt.fromI32(event.params.tickLower).le(pool.tick) &&
            graph_ts_1.BigInt.fromI32(event.params.tickUpper).gt(pool.tick)) {
            pool.liquidity = pool.liquidity.plus(event.params.amount);
        }
        if (pool.balanceOfBlock < event.block.number) {
            factory.totalValueLockedETH = factory.totalValueLockedETH.minus(pool.totalValueLockedETH);
            pool.totalValueLockedToken0 = pool.totalValueLockedToken0.plus(amount0);
            pool.totalValueLockedToken1 = pool.totalValueLockedToken1.plus(amount1);
            if (pool.totalValueLockedUSD.lt(graph_ts_1.BigDecimal.fromString(chain_1.MATURE_MARKET))) {
                if (chain_1.WHITELIST_TOKENS.includes(pool.token0.toHexString())) {
                    var tvlNative0 = pool.totalValueLockedToken0.times(token0.derivedETH);
                    var tvlNative1 = pool.totalValueLockedToken1.times(token1.derivedETH);
                    if (tvlNative0.plus(tvlNative1).gt(tvlNative0.times(graph_ts_1.BigDecimal.fromString(chain_1.TVL_MULTIPLIER_THRESHOLD)))) {
                        pool.totalValueLockedETH = pool.totalValueLockedToken0
                            .times(token0.derivedETH)
                            .times(graph_ts_1.BigDecimal.fromString(chain_1.TVL_MULTIPLIER_THRESHOLD));
                    }
                }
                if (chain_1.WHITELIST_TOKENS.includes(pool.token1.toHexString())) {
                    var tvlNative1 = pool.totalValueLockedToken1.times(token1.derivedETH);
                    var tvlNative0 = pool.totalValueLockedToken0.times(token0.derivedETH);
                    if (tvlNative1.plus(tvlNative0).gt(tvlNative1.times(graph_ts_1.BigDecimal.fromString(chain_1.TVL_MULTIPLIER_THRESHOLD)))) {
                        pool.totalValueLockedETH = pool.totalValueLockedToken1
                            .times(token1.derivedETH)
                            .times(graph_ts_1.BigDecimal.fromString(chain_1.TVL_MULTIPLIER_THRESHOLD));
                    }
                }
            }
            else {
                pool.totalValueLockedETH = pool.totalValueLockedToken0
                    .times(token0.derivedETH)
                    .plus(pool.totalValueLockedToken1.times(token1.derivedETH));
            }
            pool.totalValueLockedUSD = pool.totalValueLockedETH.times(bundle.ethPriceUSD);
            factory.totalValueLockedETH = factory.totalValueLockedETH.plus(pool.totalValueLockedETH);
            factory.totalValueLockedUSD = factory.totalValueLockedETH.times(bundle.ethPriceUSD);
        }
        // Removed due to populating 0 value entities with no swaps in that interval.
        // updateTokenDayData(token0 as Token, event)
        // updateTokenDayData(token1 as Token, event)
        // updateTokenHourData(token0 as Token, event)
        // updateTokenHourData(token1 as Token, event)
        // updateTokenMinuteData(token0 as Token, event)
        // updateTokenMinuteData(token1 as Token, event)
        token0.save();
        token1.save();
        pool.save();
        factory.save();
    }
}
exports.handleMint = handleMint;
