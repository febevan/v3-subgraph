"use strict";
exports.__esModule = true;
exports.populateEmptyPools = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var ERC20_1 = require("../../generated/Factory/ERC20");
var Pool_1 = require("../../generated/Factory/Pool");
var schema_1 = require("../../generated/schema");
var templates_1 = require("../../generated/templates");
var constants_1 = require("./constants");
var token_1 = require("./token");
var utils_1 = require("./utils");
function populateToken(tokenAddress) {
    var token = schema_1.Token.load(tokenAddress);
    if (token != null) {
        return;
    }
    token = new schema_1.Token(tokenAddress);
    token.symbol = (0, token_1.fetchTokenSymbol)(tokenAddress);
    token.name = (0, token_1.fetchTokenName)(tokenAddress);
    token.totalSupply = (0, token_1.fetchTokenTotalSupply)(tokenAddress);
    var decimals = (0, token_1.fetchTokenDecimals)(tokenAddress);
    if (decimals === null) {
        return;
    }
    token.decimals = decimals;
    token.derivedETH = constants_1.ZERO_BD;
    token.volume = constants_1.ZERO_BD;
    token.volumeUSD = constants_1.ZERO_BD;
    token.feesUSD = constants_1.ZERO_BD;
    token.untrackedVolumeUSD = constants_1.ZERO_BD;
    token.totalValueLocked = constants_1.ZERO_BD;
    token.totalValueLockedUSD = constants_1.ZERO_BD;
    token.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
    token.txCount = constants_1.ZERO_BI;
    token.poolCount = constants_1.ZERO_BI;
    token.whitelistPools = [];
    token.save();
}
/**
 * Create entries in store for hard-coded pools and tokens. This is only
 * used for generating optimism pre-regenesis data.
 */
function populateEmptyPools(event, poolMappings, whitelistTokens) {
    var length = poolMappings.length;
    for (var i = 0; i < length; ++i) {
        var poolMapping = poolMappings[i];
        var newAddress = poolMapping[1];
        var token0Address = poolMapping[2];
        var token1Address = poolMapping[3];
        var poolContract = Pool_1.Pool.bind(newAddress);
        var pool = new schema_1.Pool(newAddress);
        pool.createdAtBlockNumber = event.block.number;
        pool.createdAtTimestamp = event.block.timestamp;
        pool.token0 = token0Address;
        pool.token1 = token1Address;
        pool.liquidity = poolContract.liquidity();
        pool.sqrtPrice = constants_1.ZERO_BI;
        pool.token0Price = constants_1.ZERO_BD;
        pool.token1Price = constants_1.ZERO_BD;
        pool.observationIndex = constants_1.ZERO_BI;
        pool.liquidityProviderCount = constants_1.ZERO_BI;
        pool.txCount = constants_1.ZERO_BI;
        pool.totalValueLockedToken0 = constants_1.ZERO_BD;
        pool.totalValueLockedToken1 = constants_1.ZERO_BD;
        pool.totalValueLockedETH = constants_1.ZERO_BD;
        pool.totalValueLockedUSD = constants_1.ZERO_BD;
        pool.totalValueLockedUSDUntracked = constants_1.ZERO_BD;
        pool.volumeToken0 = constants_1.ZERO_BD;
        pool.volumeToken1 = constants_1.ZERO_BD;
        pool.volumeUSD = constants_1.ZERO_BD;
        pool.untrackedVolumeUSD = constants_1.ZERO_BD;
        pool.feesUSD = constants_1.ZERO_BD;
        pool.collectedFeesToken0 = constants_1.ZERO_BD;
        pool.collectedFeesToken1 = constants_1.ZERO_BD;
        pool.collectedFeesUSD = constants_1.ZERO_BD;
        // need fee tier
        var feeTier = poolContract.fee();
        pool.feeTier = graph_ts_1.BigInt.fromI32(feeTier);
        // create token entities if needed
        populateToken(token0Address);
        populateToken(token1Address);
        var token0 = schema_1.Token.load(token0Address);
        var token1 = schema_1.Token.load(token1Address);
        if (token0 && token1) {
            if (whitelistTokens.includes(pool.token0.toHexString())) {
                var newPools = token1.whitelistPools;
                newPools.push(pool.id);
                token1.whitelistPools = newPools;
            }
            if (whitelistTokens.includes(token1.id.toHexString())) {
                var newPools = token0.whitelistPools;
                newPools.push(pool.id);
                token0.whitelistPools = newPools;
            }
            // populate the TVL by call contract balanceOf
            var token0Contract = ERC20_1.ERC20.bind(graph_ts_1.Address.fromBytes(pool.token0));
            var tvlToken0Raw = token0Contract.balanceOf(graph_ts_1.Address.fromBytes(pool.id));
            var tvlToken0Adjusted = (0, utils_1.convertTokenToDecimal)(tvlToken0Raw, token0.decimals);
            pool.totalValueLockedToken0 = tvlToken0Adjusted;
            token0.totalValueLocked = tvlToken0Adjusted;
            var token1Contract = ERC20_1.ERC20.bind(graph_ts_1.Address.fromBytes(pool.token1));
            var tvlToken1Raw = token1Contract.balanceOf(graph_ts_1.Address.fromBytes(pool.id));
            var tvlToken1Adjusted = (0, utils_1.convertTokenToDecimal)(tvlToken1Raw, token1.decimals);
            pool.totalValueLockedToken1 = tvlToken1Adjusted;
            token1.totalValueLocked = tvlToken1Adjusted;
            // add pool to tracked address and store entities
            templates_1.Pool.create(graph_ts_1.Address.fromBytes(pool.id));
            token0.save();
            token1.save();
            pool.save();
        }
    }
}
exports.populateEmptyPools = populateEmptyPools;
