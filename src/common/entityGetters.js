"use strict";
exports.__esModule = true;
exports.getToken = exports.getPool = exports.getFactory = exports.getBundle = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../generated/schema");
var chain_1 = require("./chain");
var constants_1 = require("./constants");
function getBundle() {
    var bundle = schema_1.Bundle.load('1');
    if (!bundle) {
        bundle = new schema_1.Bundle('1');
        bundle.ethPriceUSD = constants_1.ZERO_BD;
        bundle.save();
    }
    return bundle;
}
exports.getBundle = getBundle;
function getFactory() {
    var factory = schema_1.Factory.load(graph_ts_1.Address.fromString(chain_1.FACTORY_ADDRESS));
    if (!factory) {
        factory = new schema_1.Factory(graph_ts_1.Address.fromString(chain_1.FACTORY_ADDRESS));
        factory.poolCount = constants_1.ZERO_BI;
        factory.totalVolumeETH = constants_1.ZERO_BD;
        factory.totalVolumeUSD = constants_1.ZERO_BD;
        factory.untrackedVolumeUSD = constants_1.ZERO_BD;
        factory.totalFeesUSD = constants_1.ZERO_BD;
        factory.totalFeesETH = constants_1.ZERO_BD;
        factory.totalValueLockedETH = constants_1.ZERO_BD;
        factory.totalValueLockedUSD = constants_1.ZERO_BD;
        factory.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
        factory.totalValueLockedETHUntracked = constants_1.ZERO_BD;
        factory.txCount = constants_1.ZERO_BI;
        factory.owner = constants_1.ADDRESS_ZERO;
        getBundle();
    }
    return factory;
}
exports.getFactory = getFactory;
// Function should only be called from core when pools are gaurenteed (they are created in factory)
function getPool(address) {
    var pool = schema_1.Pool.load(address);
    return pool;
}
exports.getPool = getPool;
// Function should only be called from core when tokens are gaurenteed (they are created in factory)
function getToken(address) {
    var token = schema_1.Token.load(address);
    return token;
}
exports.getToken = getToken;
