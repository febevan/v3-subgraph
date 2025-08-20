"use strict";
exports.__esModule = true;
exports.getStaticDefinition = void 0;
var chain_1 = require("./chain");
// Helper for hardcoded tokens
var getStaticDefinition = function (tokenAddress) {
    var staticDefinitions = chain_1.STATIC_TOKEN_DEFINITIONS;
    var tokenAddressHex = tokenAddress.toHexString();
    // Search the definition using the address
    for (var i = 0; i < staticDefinitions.length; i++) {
        var staticDefinition = staticDefinitions[i];
        if (staticDefinition.address.toHexString().toLowerCase() == tokenAddressHex.toLowerCase()) {
            return staticDefinition;
        }
    }
    // If not found, return null
    return null;
};
exports.getStaticDefinition = getStaticDefinition;
