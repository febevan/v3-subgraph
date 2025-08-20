"use strict";
exports.__esModule = true;
exports.feeTierToTickSpacing = exports.createTick = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../generated/schema");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
function createTick(tickId, tickIdx, poolId, event) {
    var tick = new schema_1.Tick(tickId);
    tick.tickIdx = graph_ts_1.BigInt.fromI32(tickIdx);
    tick.pool = poolId;
    tick.poolAddress = poolId;
    tick.createdAtTimestamp = event.block.timestamp;
    tick.createdAtBlockNumber = event.block.number;
    tick.liquidityGross = constants_1.ZERO_BI;
    tick.liquidityNet = constants_1.ZERO_BI;
    tick.liquidityProviderCount = constants_1.ZERO_BI;
    tick.price0 = constants_1.ONE_BD;
    tick.price1 = constants_1.ONE_BD;
    // 1.0001^tick is token1/token0.
    var price0 = (0, utils_1.bigDecimalExponated)(graph_ts_1.BigDecimal.fromString('1.0001'), graph_ts_1.BigInt.fromI32(tickIdx));
    tick.price0 = price0;
    tick.price1 = (0, utils_1.safeDiv)(constants_1.ONE_BD, price0);
    tick.volumeToken0 = constants_1.ZERO_BD;
    tick.volumeToken1 = constants_1.ZERO_BD;
    tick.volumeUSD = constants_1.ZERO_BD;
    tick.feesUSD = constants_1.ZERO_BD;
    tick.untrackedVolumeUSD = constants_1.ZERO_BD;
    tick.collectedFeesToken0 = constants_1.ZERO_BD;
    tick.collectedFeesToken1 = constants_1.ZERO_BD;
    tick.collectedFeesUSD = constants_1.ZERO_BD;
    tick.liquidityProviderCount = constants_1.ZERO_BI;
    tick.feeGrowthOutside0X128 = constants_1.ZERO_BI;
    tick.feeGrowthOutside1X128 = constants_1.ZERO_BI;
    return tick;
}
exports.createTick = createTick;
function feeTierToTickSpacing(feeTier) {
    if (feeTier.equals(graph_ts_1.BigInt.fromI32(10000))) {
        return graph_ts_1.BigInt.fromI32(200);
    }
    if (feeTier.equals(graph_ts_1.BigInt.fromI32(3000))) {
        return graph_ts_1.BigInt.fromI32(60);
    }
    if (feeTier.equals(graph_ts_1.BigInt.fromI32(500))) {
        return graph_ts_1.BigInt.fromI32(10);
    }
    if (feeTier.equals(graph_ts_1.BigInt.fromI32(100))) {
        return graph_ts_1.BigInt.fromI32(1);
    }
    throw Error('Unexpected fee tier');
}
exports.feeTierToTickSpacing = feeTierToTickSpacing;
