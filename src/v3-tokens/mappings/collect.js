"use strict";
exports.__esModule = true;
exports.handleCollect = void 0;
/* eslint-disable prefer-const */
var graph_ts_1 = require("@graphprotocol/graph-ts");
var ERC20_1 = require("../../../generated/templates/Pool/ERC20");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var entityGetters_1 = require("../../common/entityGetters");
var utils_1 = require("../../common/utils");
// @TODO Prior NonfungiblePositionManager Collect code, to be updated to Pool collect code
function handleCollect(event) {
    var bundle = (0, entityGetters_1.getBundle)();
    var factory = (0, entityGetters_1.getFactory)();
    var pool = (0, entityGetters_1.getPool)(event.address);
    var token0 = (0, entityGetters_1.getToken)(pool.token0);
    var token1 = (0, entityGetters_1.getToken)(pool.token1);
    // reset aggregate tvl before individual pool tvl updates
    var amount0 = (0, utils_1.convertTokenToDecimal)(event.params.amount0, token0.decimals);
    var amount1 = (0, utils_1.convertTokenToDecimal)(event.params.amount1, token1.decimals);
    // KENT TODO: MOVE LOWER - AFTER CHECKING IF POOL APPROVED
    pool.txCount = pool.txCount.plus(constants_1.ONE_BI);
    factory.txCount = factory.txCount.plus(constants_1.ONE_BI);
    token0.txCount = token0.txCount.plus(constants_1.ONE_BI);
    token1.txCount = token1.txCount.plus(constants_1.ONE_BI);
    if (pool.balanceOfBlock < event.block.number) {
        var currentPoolTvlETH = pool.totalValueLockedETH;
        factory.totalValueLockedETH = factory.totalValueLockedETH.minus(currentPoolTvlETH);
        // pool data
        var tvlToken0 = pool.totalValueLockedToken0.minus(amount0);
        var tvlToken1 = pool.totalValueLockedToken1.minus(amount1);
        var tvlToken0Actual = tvlToken0;
        var tvlToken1Actual = tvlToken1;
        if (tvlToken0.lt(constants_1.ZERO_BD) || tvlToken1.lt(constants_1.ZERO_BD)) {
            var balanceCall0 = ERC20_1.ERC20.bind(graph_ts_1.Address.fromBytes(token0.id)).try_balanceOf(graph_ts_1.Address.fromBytes(pool.id));
            if (!balanceCall0.reverted) {
                tvlToken0Actual = (0, utils_1.convertTokenToDecimal)(balanceCall0.value, token0.decimals);
                pool.balanceOfBlock = event.block.number;
            }
            var balanceCall1 = ERC20_1.ERC20.bind(graph_ts_1.Address.fromBytes(token1.id)).try_balanceOf(graph_ts_1.Address.fromBytes(pool.id));
            if (!balanceCall1.reverted) {
                tvlToken1Actual = (0, utils_1.convertTokenToDecimal)(balanceCall1.value, token1.decimals);
                pool.balanceOfBlock = event.block.number;
            }
        }
        pool.totalValueLockedToken0 = tvlToken0Actual;
        pool.totalValueLockedToken1 = tvlToken1Actual;
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
        // KENT TODO: MOVE LOWER - AFTER CHECKING IF POOL APPROVED
        factory.totalValueLockedETH = factory.totalValueLockedETH.plus(pool.totalValueLockedETH);
        factory.totalValueLockedUSD = factory.totalValueLockedETH.times(bundle.ethPriceUSD);
    }
    token0.totalValueLocked = token0.totalValueLocked.minus(amount0);
    token0.totalValueLockedUSD = token0.totalValueLocked.times(token0.derivedETH.times(bundle.ethPriceUSD));
    token1.totalValueLocked = token1.totalValueLocked.minus(amount1);
    token1.totalValueLockedUSD = token1.totalValueLocked.times(token1.derivedETH.times(bundle.ethPriceUSD));
    factory.save();
    pool.save();
    token0.save();
    token1.save();
}
exports.handleCollect = handleCollect;
