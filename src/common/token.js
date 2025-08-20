"use strict";
exports.__esModule = true;
exports.fetchTokenDecimals = exports.fetchTokenTotalSupply = exports.fetchTokenName = exports.fetchTokenSymbol = void 0;
/* eslint-disable prefer-const */
var graph_ts_1 = require("@graphprotocol/graph-ts");
var ERC20_1 = require("../../generated/Factory/ERC20");
var ERC20NameBytes_1 = require("../../generated/Factory/ERC20NameBytes");
var ERC20SymbolBytes_1 = require("../../generated/Factory/ERC20SymbolBytes");
var staticTokenDefinition_1 = require("./staticTokenDefinition");
var utils_1 = require("./utils");
function fetchTokenSymbol(tokenAddress) {
    var staticDefinition = (0, staticTokenDefinition_1.getStaticDefinition)(tokenAddress);
    if (staticDefinition != null) {
        return staticDefinition.symbol;
    }
    var contract = ERC20_1.ERC20.bind(tokenAddress);
    var contractSymbolBytes = ERC20SymbolBytes_1.ERC20SymbolBytes.bind(tokenAddress);
    // try types string and bytes32 for symbol
    var symbolValue = 'unknown';
    var symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
        var symbolResultBytes = contractSymbolBytes.try_symbol();
        if (!symbolResultBytes.reverted) {
            // for broken pairs that have no symbol function exposed
            if (!(0, utils_1.isNullEthValue)(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString();
            }
        }
    }
    else {
        symbolValue = symbolResult.value;
    }
    return symbolValue;
}
exports.fetchTokenSymbol = fetchTokenSymbol;
function fetchTokenName(tokenAddress) {
    var staticDefinition = (0, staticTokenDefinition_1.getStaticDefinition)(tokenAddress);
    if (staticDefinition != null) {
        return staticDefinition.name;
    }
    var contract = ERC20_1.ERC20.bind(tokenAddress);
    var contractNameBytes = ERC20NameBytes_1.ERC20NameBytes.bind(tokenAddress);
    // try types string and bytes32 for name
    var nameValue = 'unknown';
    var nameResult = contract.try_name();
    if (nameResult.reverted) {
        var nameResultBytes = contractNameBytes.try_name();
        if (!nameResultBytes.reverted) {
            // for broken exchanges that have no name function exposed
            if (!(0, utils_1.isNullEthValue)(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString();
            }
        }
    }
    else {
        nameValue = nameResult.value;
    }
    return nameValue;
}
exports.fetchTokenName = fetchTokenName;
function fetchTokenTotalSupply(tokenAddress) {
    var contract = ERC20_1.ERC20.bind(tokenAddress);
    var totalSupplyValue = graph_ts_1.BigInt.zero();
    var totalSupplyResult = contract.try_totalSupply();
    if (!totalSupplyResult.reverted) {
        totalSupplyValue = totalSupplyResult.value;
    }
    return totalSupplyValue;
}
exports.fetchTokenTotalSupply = fetchTokenTotalSupply;
function fetchTokenDecimals(tokenAddress) {
    var staticDefinition = (0, staticTokenDefinition_1.getStaticDefinition)(tokenAddress);
    if (staticDefinition != null) {
        return staticDefinition.decimals;
    }
    var contract = ERC20_1.ERC20.bind(tokenAddress);
    // try types uint8 for decimals
    var decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        if (decimalResult.value.lt(graph_ts_1.BigInt.fromI32(255))) {
            return decimalResult.value;
        }
    }
    return null;
}
exports.fetchTokenDecimals = fetchTokenDecimals;
