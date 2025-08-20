"use strict";
exports.__esModule = true;
exports.handleInitialize = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var entityGetters_1 = require("../../common/entityGetters");
var pricing_1 = require("../../common/pricing");
function handleInitialize(event) {
    // update pool sqrt price and tick
    var pool = (0, entityGetters_1.getPool)(event.address);
    if (pool) {
        pool.sqrtPrice = event.params.sqrtPriceX96;
        pool.tick = graph_ts_1.BigInt.fromI32(event.params.tick);
        // update token prices
        var token0 = schema_1.Token.load(pool.token0);
        var token1 = schema_1.Token.load(pool.token1);
        if (token0 && token1) {
            var prices = (0, pricing_1.sqrtPriceX96ToTokenPrices)(event.params.sqrtPriceX96, token0, token1);
            pool.token0Price = prices[0];
            pool.token1Price = prices[1];
        }
        pool.save();
        // update ETH price now that prices could have changed
        var bundle = schema_1.Bundle.load('1');
        if (bundle) {
            bundle.ethPriceUSD = (0, pricing_1.getEthPriceInUSD)();
            bundle.save();
        }
        if (token0 && token1) {
            // update token prices
            token0.derivedETH = (0, pricing_1.findEthPerToken)(token0);
            token1.derivedETH = (0, pricing_1.findEthPerToken)(token1);
            token0.save();
            token1.save();
        }
    }
}
exports.handleInitialize = handleInitialize;
