"use strict";
exports.__esModule = true;
exports.handleInitialize = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var pricing_1 = require("../../common/pricing");
var intervalUpdates_1 = require("./intervalUpdates");
function handleInitialize(event) {
    // update pool sqrt price and tick
    var pool = schema_1.Pool.load(event.address);
    pool.sqrtPrice = event.params.sqrtPriceX96;
    pool.tick = graph_ts_1.BigInt.fromI32(event.params.tick);
    pool.save();
    // update token prices
    var token0 = schema_1.Token.load(pool.token0);
    var token1 = schema_1.Token.load(pool.token1);
    // update ETH price now that prices could have changed
    var bundle = schema_1.Bundle.load('1');
    bundle.ethPriceUSD = (0, pricing_1.getEthPriceInUSD)();
    bundle.save();
    (0, intervalUpdates_1.updatePoolDayData)(event);
    (0, intervalUpdates_1.updatePoolHourData)(event);
    // update token prices
    if (token0 && token1) {
        token0.derivedETH = (0, pricing_1.findEthPerToken)(token0);
        token1.derivedETH = (0, pricing_1.findEthPerToken)(token1);
        token0.save();
        token1.save();
    }
}
exports.handleInitialize = handleInitialize;
