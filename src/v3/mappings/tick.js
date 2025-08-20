"use strict";
exports.__esModule = true;
exports.createTick = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var constants_1 = require("../../common/constants");
var utils_1 = require("../../common/utils");
function createTick(tickId, tickIdx, poolId, event) {
    var tick = new schema_1.Tick(tickId);
    tick.tickIdx = graph_ts_1.BigInt.fromI32(tickIdx);
    tick.pool = poolId;
    tick.poolAddress = poolId;
    tick.createdAtTimestamp = event.block.timestamp;
    tick.createdAtBlockNumber = event.block.number;
    tick.liquidityGross = constants_1.ZERO_BI;
    tick.liquidityNet = constants_1.ZERO_BI;
    tick.price0 = constants_1.ONE_BD;
    tick.price1 = constants_1.ONE_BD;
    // 1.0001^tick is token1/token0.
    var price0 = (0, utils_1.fastExponentiation)(graph_ts_1.BigDecimal.fromString('1.0001'), tickIdx);
    tick.price0 = price0;
    tick.price1 = (0, utils_1.safeDiv)(constants_1.ONE_BD, price0);
    return tick;
}
exports.createTick = createTick;
