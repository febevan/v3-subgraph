"use strict";
exports.__esModule = true;
exports.loadTransaction = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var schema_1 = require("../../../generated/schema");
function loadTransaction(event) {
    var transaction = schema_1.Transaction.load(event.transaction.hash.toHexString());
    if (transaction === null) {
        transaction = new schema_1.Transaction(event.transaction.hash.toHexString());
    }
    transaction.blockNumber = event.block.number;
    transaction.timestamp = event.block.timestamp;
    transaction.gasUsed = graph_ts_1.BigInt.zero(); //needs to be moved to transaction receipt
    transaction.gasPrice = event.transaction.gasPrice;
    transaction.save();
    return transaction;
}
exports.loadTransaction = loadTransaction;
