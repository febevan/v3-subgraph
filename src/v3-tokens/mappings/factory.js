"use strict";
exports.__esModule = true;
exports.handlePoolCreated = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var templates_1 = require("../../../generated/templates");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
var entityGetters_1 = require("../../common/entityGetters");
var token_1 = require("../../common/token");
function handlePoolCreated(event) {
    // Temp limitation for data testing
    // if (
    //   event.params.pool != Address.fromHexString('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8') &&
    //   event.params.pool != Address.fromHexString('0x0e2c4be9f3408e5b1ff631576d946eb8c224b5ed') &&
    //   event.params.pool != Address.fromHexString('0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640')
    // )
    //   return
    // // temp fix
    // if (event.params.pool != Address.fromHexString('0xbfe6843B931C9c1b7B705195B7Af57B228fa8561')) {
    //   return
    // }
    // load factory
    var factory = (0, entityGetters_1.getFactory)();
    factory.poolCount = factory.poolCount.plus(constants_1.ONE_BI);
    var pool = new schema_1.Pool(event.params.pool);
    var token0 = schema_1.Token.load(event.params.token0);
    var token1 = schema_1.Token.load(event.params.token1);
    // fetch info if null
    if (!token0) {
        token0 = new schema_1.Token(event.params.token0);
        token0.tokenAddress = event.params.token0.toHexString();
        token0.symbol = (0, token_1.fetchTokenSymbol)(event.params.token0);
        token0.name = (0, token_1.fetchTokenName)(event.params.token0);
        token0.totalSupply = (0, token_1.fetchTokenTotalSupply)(event.params.token0);
        token0.lastMinuteArchived = graph_ts_1.BigInt.fromI32(0);
        token0.lastHourArchived = graph_ts_1.BigInt.fromI32(0);
        token0.lastMinuteRecorded = graph_ts_1.BigInt.fromI32(0);
        token0.lastHourRecorded = graph_ts_1.BigInt.fromI32(0);
        var decimals = (0, token_1.fetchTokenDecimals)(event.params.token0);
        // bail if we couldn't figure out the decimals
        if (!decimals) {
            graph_ts_1.log.debug('mybug the decimal on token 0 was null', []);
            return;
        }
        token0.decimals = decimals;
        token0.derivedETH = constants_1.ZERO_BD;
        token0.volume = constants_1.ZERO_BD;
        token0.volumeUSD = constants_1.ZERO_BD;
        token0.feesUSD = constants_1.ZERO_BD;
        token0.untrackedVolumeUSD = constants_1.ZERO_BD;
        token0.totalValueLocked = constants_1.ZERO_BD;
        token0.totalValueLockedUSD = constants_1.ZERO_BD;
        token0.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
        token0.txCount = constants_1.ZERO_BI;
        token0.poolCount = constants_1.ZERO_BI;
        token0.whitelistPools = [];
        token0.minuteArray = [];
        token0.hourArray = [];
    }
    if (!token1) {
        token1 = new schema_1.Token(event.params.token1);
        token1.tokenAddress = event.params.token0.toHexString();
        token1.symbol = (0, token_1.fetchTokenSymbol)(event.params.token1);
        token1.name = (0, token_1.fetchTokenName)(event.params.token1);
        token1.totalSupply = (0, token_1.fetchTokenTotalSupply)(event.params.token1);
        token1.lastMinuteArchived = graph_ts_1.BigInt.fromI32(0);
        token1.lastHourArchived = graph_ts_1.BigInt.fromI32(0);
        token1.lastMinuteRecorded = graph_ts_1.BigInt.fromI32(0);
        token1.lastHourRecorded = graph_ts_1.BigInt.fromI32(0);
        var decimals = (0, token_1.fetchTokenDecimals)(event.params.token1);
        // bail if we couldn't figure out the decimals
        if (!decimals) {
            graph_ts_1.log.debug('mybug the decimal on token 0 was null', []);
            return;
        }
        token1.decimals = decimals;
        token1.derivedETH = constants_1.ZERO_BD;
        token1.volume = constants_1.ZERO_BD;
        token1.volumeUSD = constants_1.ZERO_BD;
        token1.untrackedVolumeUSD = constants_1.ZERO_BD;
        token1.feesUSD = constants_1.ZERO_BD;
        token1.totalValueLocked = constants_1.ZERO_BD;
        token1.totalValueLockedUSD = constants_1.ZERO_BD;
        token1.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
        token1.txCount = constants_1.ZERO_BI;
        token1.poolCount = constants_1.ZERO_BI;
        token1.whitelistPools = [];
        token1.minuteArray = [];
        token1.hourArray = [];
    }
    // update white listed pools
    if (chain_1.WHITELIST_TOKENS.includes(token0.id.toHexString())) {
        var newPools = token1.whitelistPools;
        newPools.push(pool.id);
        token1.whitelistPools = newPools;
    }
    if (chain_1.WHITELIST_TOKENS.includes(token1.id.toHexString())) {
        var newPools = token0.whitelistPools;
        newPools.push(pool.id);
        token0.whitelistPools = newPools;
    }
    pool.token0 = token0.id;
    pool.token1 = token1.id;
    pool.feeTier = graph_ts_1.BigInt.fromI32(event.params.fee);
    pool.createdAtTimestamp = event.block.timestamp;
    pool.createdAtBlockNumber = event.block.number;
    pool.liquidityProviderCount = constants_1.ZERO_BI;
    pool.txCount = constants_1.ZERO_BI;
    pool.liquidity = constants_1.ZERO_BI;
    pool.sqrtPrice = constants_1.ZERO_BI;
    pool.feeGrowthGlobal0X128 = constants_1.ZERO_BI;
    pool.feeGrowthGlobal1X128 = constants_1.ZERO_BI;
    pool.token0Price = constants_1.ZERO_BD;
    pool.token1Price = constants_1.ZERO_BD;
    pool.observationIndex = constants_1.ZERO_BI;
    pool.totalValueLockedToken0 = constants_1.ZERO_BD;
    pool.totalValueLockedToken1 = constants_1.ZERO_BD;
    pool.totalValueLockedUSD = constants_1.ZERO_BD;
    pool.totalValueLockedETH = constants_1.ZERO_BD;
    pool.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
    pool.volumeToken0 = constants_1.ZERO_BD;
    pool.volumeToken1 = constants_1.ZERO_BD;
    pool.volumeUSD = constants_1.ZERO_BD;
    pool.feesUSD = constants_1.ZERO_BD;
    pool.untrackedVolumeUSD = constants_1.ZERO_BD;
    pool.balanceOfBlock = constants_1.ZERO_BI;
    pool.collectedFeesToken0 = constants_1.ZERO_BD;
    pool.collectedFeesToken1 = constants_1.ZERO_BD;
    pool.collectedFeesUSD = constants_1.ZERO_BD;
    pool.save();
    token0.save();
    token1.save();
    factory.save();
    // create the tracked contract based on the template
    templates_1.Pool.create(event.params.pool);
}
exports.handlePoolCreated = handlePoolCreated;
