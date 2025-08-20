"use strict";
exports.__esModule = true;
exports.hexToBigint = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
function hexToBigint(hex) {
    var bigint = graph_ts_1.BigInt.fromI32(0);
    var power = graph_ts_1.BigInt.fromI32(1);
    for (var i = hex.length - 1; i >= 0; i--) {
        var char = hex.charCodeAt(i);
        var value = 0;
        if (char >= 48 && char <= 57) {
            value = char - 48;
        }
        else if (char >= 65 && char <= 70) {
            value = char - 55;
        }
        bigint = bigint.plus(graph_ts_1.BigInt.fromI32(value).times(power));
        power = power.times(graph_ts_1.BigInt.fromI32(16));
    }
    return bigint;
}
exports.hexToBigint = hexToBigint;
