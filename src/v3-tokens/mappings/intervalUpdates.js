"use strict";
exports.__esModule = true;
exports.updateTokenMinuteData = exports.updateTokenHourData = exports.updateTokenDayData = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
var chain_1 = require("../../common/chain");
var constants_1 = require("../../common/constants");
function archiveMinuteData(token, end) {
    // log.warning('ARCHIVING MINUTE - {}   - TOKEN - {}', [token.lastMinuteArchived.toString(), token.id.toHexString()])
    var length = token.minuteArray.length;
    var array = token.minuteArray;
    var modArray = token.minuteArray;
    var last = token.lastMinuteArchived.toI32();
    for (var i = 0; i < length; i++) {
        if (array[i] > end) {
            break;
        }
        var tokenMinuteID = token.id.toHexString().concat('-').concat(array[i].toString());
        // let tokenMinuteData = TokenMinuteData.load(tokenMinuteID)
        // if (tokenMinuteData) {
        graph_ts_1.store.remove('TokenMinuteData', tokenMinuteID);
        // }
        modArray.shift();
        last = array[i];
        if (graph_ts_1.BigInt.fromI32(i + 1).equals(chain_1.ROLL_DELETE_MINUTE_LIMITER)) {
            // log.warning('INTERVAL REACH - {} - LIMITER - {}', [tokenMinuteID, i.toString()])
            break;
        }
    }
    if (modArray) {
        token.minuteArray = modArray;
    }
    else {
        token.minuteArray = [];
    }
    token.lastMinuteArchived = graph_ts_1.BigInt.fromI32(last - 1);
    token.save();
}
function archiveHourData(token, end) {
    var length = token.hourArray.length;
    var array = token.hourArray;
    var modArray = token.hourArray;
    var last = token.lastHourArchived.toI32();
    for (var i = 0; i < length; i++) {
        if (array[i] > end) {
            break;
        }
        var tokenHourID = token.id.toHexString().concat('-').concat(array[i].toString());
        // let tokenMinuteData = TokenMinuteData.load(tokenMinuteID)
        // if (tokenMinuteData) {
        graph_ts_1.store.remove('TokenHourData', tokenHourID);
        // }
        modArray.shift();
        last = array[i];
        if (graph_ts_1.BigInt.fromI32(i + 1).equals(chain_1.ROLL_DELETE_HOUR_LIMITER)) {
            // log.warning('INTERVAL REACH - {} - LIMITER - {}', [tokenMinuteID, i.toString()])
            break;
        }
    }
    if (modArray) {
        token.hourArray = modArray;
    }
    else {
        token.hourArray = [];
    }
    token.lastHourArchived = graph_ts_1.BigInt.fromI32(last - 1);
    token.save();
}
/**
 * Tracks global aggregate data over daily windows
 * @param event
 */
function updateTokenDayData(token, event) {
    var bundle = schema_1.Bundle.load('1');
    var timestamp = event.block.timestamp.toI32();
    var dayID = timestamp / 86400;
    var dayStartTimestamp = dayID * 86400;
    var tokenDayID = token.id.toHexString().concat('-').concat(dayID.toString());
    var tokenPrice = token.derivedETH.times(bundle.ethPriceUSD);
    var tokenDayData = schema_1.TokenDayData.load(tokenDayID);
    if (!tokenDayData) {
        tokenDayData = new schema_1.TokenDayData(tokenDayID);
        tokenDayData.periodStartUnix = dayStartTimestamp;
        tokenDayData.token = token.id;
        tokenDayData.volume = constants_1.ZERO_BD;
        tokenDayData.volumeUSD = constants_1.ZERO_BD;
        tokenDayData.feesUSD = constants_1.ZERO_BD;
        tokenDayData.untrackedVolumeUSD = constants_1.ZERO_BD;
        tokenDayData.open = tokenPrice;
        tokenDayData.high = tokenPrice;
        tokenDayData.low = tokenPrice;
    }
    if (tokenPrice.gt(tokenDayData.high)) {
        tokenDayData.high = tokenPrice;
    }
    if (tokenPrice.lt(tokenDayData.low)) {
        tokenDayData.low = tokenPrice;
    }
    tokenDayData.close = tokenPrice;
    tokenDayData.priceUSD = token.derivedETH.times(bundle.ethPriceUSD);
    tokenDayData.totalValueLocked = token.totalValueLocked;
    tokenDayData.totalValueLockedUSD = token.totalValueLockedUSD;
    tokenDayData.save();
    return tokenDayData;
}
exports.updateTokenDayData = updateTokenDayData;
function updateTokenHourData(token, event) {
    var bundle = schema_1.Bundle.load('1');
    var timestamp = event.block.timestamp.toI32();
    var hourIndex = timestamp / 3600; // get unique hour within unix history
    var hourStartUnix = hourIndex * 3600; // want the rounded effect
    var tokenHourID = token.id.toHexString().concat('-').concat(hourIndex.toString());
    var tokenHourData = schema_1.TokenHourData.load(tokenHourID);
    var tokenPrice = token.derivedETH.times(bundle.ethPriceUSD);
    var isNew = false;
    if (!tokenHourData) {
        tokenHourData = new schema_1.TokenHourData(tokenHourID);
        tokenHourData.periodStartUnix = hourStartUnix;
        tokenHourData.token = token.id;
        tokenHourData.volume = constants_1.ZERO_BD;
        tokenHourData.volumeUSD = constants_1.ZERO_BD;
        tokenHourData.untrackedVolumeUSD = constants_1.ZERO_BD;
        tokenHourData.feesUSD = constants_1.ZERO_BD;
        tokenHourData.open = tokenPrice;
        tokenHourData.high = tokenPrice;
        tokenHourData.low = tokenPrice;
        tokenHourData.close = tokenPrice;
        var tokenHourArray = token.hourArray;
        tokenHourArray.push(hourIndex);
        token.hourArray = tokenHourArray;
        token.save();
        isNew = true;
    }
    if (tokenPrice.gt(tokenHourData.high)) {
        tokenHourData.high = tokenPrice;
    }
    if (tokenPrice.lt(tokenHourData.low)) {
        tokenHourData.low = tokenPrice;
    }
    tokenHourData.close = tokenPrice;
    tokenHourData.priceUSD = tokenPrice;
    tokenHourData.totalValueLocked = token.totalValueLocked;
    tokenHourData.totalValueLockedUSD = token.totalValueLockedUSD;
    tokenHourData.save();
    if (token.lastHourArchived.equals(constants_1.ZERO_BI) && token.lastHourRecorded.equals(constants_1.ZERO_BI)) {
        token.lastHourRecorded = graph_ts_1.BigInt.fromI32(hourIndex);
        token.lastHourArchived = graph_ts_1.BigInt.fromI32(hourIndex - 1);
    }
    if (isNew) {
        var lastHourArchived = token.lastHourArchived.toI32();
        var stop_1 = hourIndex - chain_1.ROLL_DELETE_HOUR;
        if (stop_1 > lastHourArchived) {
            archiveHourData(token, stop_1); //cur
        }
        token.lastHourRecorded = graph_ts_1.BigInt.fromI32(hourIndex);
        token.save();
    }
    return tokenHourData;
}
exports.updateTokenHourData = updateTokenHourData;
function updateTokenMinuteData(token, event) {
    var bundle = schema_1.Bundle.load('1');
    var timestamp = event.block.timestamp.toI32();
    var minuteIndex = timestamp / 60; // get unique hour within unix history
    var minuteStartUnix = minuteIndex * 60; // want the rounded effect
    var tokenMinuteID = token.id.toHexString().concat('-').concat(minuteIndex.toString());
    var tokenMinuteData = schema_1.TokenMinuteData.load(tokenMinuteID);
    var tokenPrice = token.derivedETH.times(bundle.ethPriceUSD);
    var isNew = false;
    if (!tokenMinuteData) {
        tokenMinuteData = new schema_1.TokenMinuteData(tokenMinuteID);
        tokenMinuteData.periodStartUnix = minuteStartUnix;
        tokenMinuteData.token = token.id;
        tokenMinuteData.volume = constants_1.ZERO_BD;
        tokenMinuteData.volumeUSD = constants_1.ZERO_BD;
        tokenMinuteData.untrackedVolumeUSD = constants_1.ZERO_BD;
        tokenMinuteData.feesUSD = constants_1.ZERO_BD;
        tokenMinuteData.open = tokenPrice;
        tokenMinuteData.high = tokenPrice;
        tokenMinuteData.low = tokenPrice;
        tokenMinuteData.close = tokenPrice;
        var tokenMinuteArray = token.minuteArray;
        tokenMinuteArray.push(minuteIndex);
        token.minuteArray = tokenMinuteArray;
        token.save();
        isNew = true;
    }
    if (tokenPrice.gt(tokenMinuteData.high)) {
        tokenMinuteData.high = tokenPrice;
    }
    if (tokenPrice.lt(tokenMinuteData.low)) {
        tokenMinuteData.low = tokenPrice;
    }
    tokenMinuteData.close = tokenPrice;
    tokenMinuteData.priceUSD = tokenPrice;
    tokenMinuteData.totalValueLocked = token.totalValueLocked;
    tokenMinuteData.totalValueLockedUSD = token.totalValueLockedUSD;
    tokenMinuteData.save();
    if (token.lastMinuteArchived.equals(constants_1.ZERO_BI) && token.lastMinuteRecorded.equals(constants_1.ZERO_BI)) {
        token.lastMinuteRecorded = graph_ts_1.BigInt.fromI32(minuteIndex);
        token.lastMinuteArchived = graph_ts_1.BigInt.fromI32(minuteIndex - 1);
    }
    if (isNew) {
        var lastMinuteArchived = token.lastMinuteArchived.toI32();
        var stop_2 = minuteIndex - chain_1.ROLL_DELETE_MINUTE;
        if (stop_2 > lastMinuteArchived) {
            archiveMinuteData(token, stop_2);
        }
        token.lastMinuteRecorded = graph_ts_1.BigInt.fromI32(minuteIndex);
        token.save();
    }
    // Rolling deletion segment
    //current minute minus 10800 seconds (28 hours)
    return tokenMinuteData;
}
exports.updateTokenMinuteData = updateTokenMinuteData;
