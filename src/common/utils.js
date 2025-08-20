"use strict";
exports.__esModule = true;
exports.fastExponentiation = exports.convertEthToDecimal = exports.convertTokenToDecimal = exports.bigDecimalExp18 = exports.isNullEthValue = exports.equalToZero = exports.priceToDecimal = exports.tokenAmountToDecimal = exports.bigDecimalExponated = exports.safeDivBigInt = exports.safeDiv = exports.exponentToBigDecimal = void 0;
/* eslint-disable prefer-const */
var graph_ts_1 = require("@graphprotocol/graph-ts");
var constants_1 = require("./constants");
function exponentToBigDecimal(decimals) {
    var bd = graph_ts_1.BigDecimal.fromString('1');
    if (decimals < graph_ts_1.BigInt.fromI32(255)) {
        bd = graph_ts_1.BigInt.fromI32(10)
            .pow(decimals.toI32())
            .toBigDecimal();
    }
    return bd;
}
exports.exponentToBigDecimal = exponentToBigDecimal;
// return 0 if denominator is 0 in division
function safeDiv(amount0, amount1) {
    if (amount1.equals(constants_1.ZERO_BD)) {
        return constants_1.ZERO_BD;
    }
    else {
        return amount0.div(amount1);
    }
}
exports.safeDiv = safeDiv;
function safeDivBigInt(amount0, amount1) {
    if (amount1.equals(constants_1.ZERO_BI)) {
        return constants_1.ZERO_BI;
    }
    else {
        return amount0.div(amount1);
    }
}
exports.safeDivBigInt = safeDivBigInt;
function bigDecimalExponated(value, power) {
    if (power.equals(constants_1.ZERO_BI)) {
        return constants_1.ONE_BD;
    }
    var negativePower = power.lt(constants_1.ZERO_BI);
    var result = constants_1.ZERO_BD.plus(value);
    var powerAbs = power.abs();
    for (var i = constants_1.ONE_BI; i.lt(powerAbs); i = i.plus(constants_1.ONE_BI)) {
        result = result.times(value);
    }
    if (negativePower) {
        result = safeDiv(constants_1.ONE_BD, result);
    }
    return result;
}
exports.bigDecimalExponated = bigDecimalExponated;
function tokenAmountToDecimal(tokenAmount, exchangeDecimals) {
    if (exchangeDecimals == constants_1.ZERO_BI) {
        return tokenAmount.toBigDecimal();
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}
exports.tokenAmountToDecimal = tokenAmountToDecimal;
function priceToDecimal(amount, exchangeDecimals) {
    if (exchangeDecimals == constants_1.ZERO_BI) {
        return amount;
    }
    return safeDiv(amount, exponentToBigDecimal(exchangeDecimals));
}
exports.priceToDecimal = priceToDecimal;
function equalToZero(value) {
    var formattedVal = parseFloat(value.toString());
    var zero = parseFloat(constants_1.ZERO_BD.toString());
    if (zero == formattedVal) {
        return true;
    }
    return false;
}
exports.equalToZero = equalToZero;
function isNullEthValue(value) {
    return value == '0x0000000000000000000000000000000000000000000000000000000000000001';
}
exports.isNullEthValue = isNullEthValue;
function bigDecimalExp18() {
    return graph_ts_1.BigDecimal.fromString('1000000000000000000');
}
exports.bigDecimalExp18 = bigDecimalExp18;
function convertTokenToDecimal(tokenAmount, exchangeDecimals) {
    if (exchangeDecimals == constants_1.ZERO_BI) {
        return tokenAmount.toBigDecimal();
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}
exports.convertTokenToDecimal = convertTokenToDecimal;
function convertEthToDecimal(eth) {
    return eth.toBigDecimal().div(exponentToBigDecimal(graph_ts_1.BigInt.fromI32(18)));
}
exports.convertEthToDecimal = convertEthToDecimal;
/**
 * Implements exponentiation by squaring
 * (see https://en.wikipedia.org/wiki/Exponentiation_by_squaring )
 * to minimize the number of BigDecimal operations and their impact on performance.
 */
function fastExponentiation(value, power) {
    if (power < 0) {
        var result_1 = fastExponentiation(value, -power);
        return safeDiv(constants_1.ONE_BD, result_1);
    }
    if (power == 0) {
        return constants_1.ONE_BD;
    }
    if (power == 1) {
        return value;
    }
    var halfPower = power / 2;
    var halfResult = fastExponentiation(value, halfPower);
    // Use the fact that x ^ (2n) = (x ^ n) * (x ^ n) and we can compute (x ^ n) only once.
    var result = halfResult.times(halfResult);
    // For odd powers, x ^ (2n + 1) = (x ^ 2n) * x
    if (power % 2 == 1) {
        result = result.times(value);
    }
    return result;
}
exports.fastExponentiation = fastExponentiation;
