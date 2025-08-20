"use strict";
exports.__esModule = true;
exports.handlePoolCreated = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var schema_2 = require("../../../generated/schema");
var templates_1 = require("../../../generated/templates");
var backfill_1 = require("../../common/backfill");
var chain_1 = require("../../common/chain");
var token_1 = require("../../common/token");
var constants_1 = require("./../../common/constants");
function handlePoolCreated(event) {
    var factoryAddress = chain_1.FACTORY_ADDRESS;
    var whitelistTokens = chain_1.WHITELIST_TOKENS;
    var poolsToSkip = chain_1.SKIP_POOLS;
    var poolMappings = chain_1.POOL_MAPINGS;
    // temp fix
    if (poolsToSkip.includes(event.params.pool.toHexString())) {
        return;
    }
    // load factory
    var factory = schema_1.Factory.load(factoryAddress);
    if (factory === null) {
        factory = new schema_1.Factory(factoryAddress);
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
        // create new bundle for tracking eth price
        var bundle = new schema_2.Bundle('1');
        bundle.ethPriceUSD = constants_1.ZERO_BD;
        bundle.save();
        (0, backfill_1.populateEmptyPools)(event, poolMappings, whitelistTokens);
    }
    factory.poolCount = factory.poolCount.plus(constants_1.ONE_BI);
    var pool = new schema_2.Pool(event.params.pool);
    var token0 = schema_2.Token.load(event.params.token0);
    var token1 = schema_2.Token.load(event.params.token1);
    // fetch info if null
    if (token0 === null) {
        token0 = new schema_2.Token(event.params.token0);
        token0.symbol = (0, token_1.fetchTokenSymbol)(event.params.token0);
        token0.name = (0, token_1.fetchTokenName)(event.params.token0);
        token0.totalSupply = (0, token_1.fetchTokenTotalSupply)(event.params.token0);
        var decimals = (0, token_1.fetchTokenDecimals)(event.params.token0);
        // bail if we couldn't figure out the decimals
        if (decimals === null) {
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
    }
    if (token1 === null) {
        token1 = new schema_2.Token(event.params.token1);
        token1.symbol = (0, token_1.fetchTokenSymbol)(event.params.token1);
        token1.name = (0, token_1.fetchTokenName)(event.params.token1);
        token1.totalSupply = (0, token_1.fetchTokenTotalSupply)(event.params.token1);
        var decimals = (0, token_1.fetchTokenDecimals)(event.params.token1);
        // bail if we couldn't figure out the decimals
        if (decimals === null) {
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
    }
    // update white listed pools
    if (whitelistTokens.includes(token0.id.toHexString())) {
        var newPools = token1.whitelistPools;
        newPools.push(pool.id);
        token1.whitelistPools = newPools;
    }
    if (whitelistTokens.includes(token1.id.toHexString())) {
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
    pool.collectedFeesToken0 = constants_1.ZERO_BD;
    pool.collectedFeesToken1 = constants_1.ZERO_BD;
    pool.collectedFeesUSD = constants_1.ZERO_BD;
    pool.save();
    // create the tracked contract based on the template
    templates_1.Pool.create(event.params.pool);
    token0.save();
    token1.save();
    factory.save();
}
exports.handlePoolCreated = handlePoolCreated;
