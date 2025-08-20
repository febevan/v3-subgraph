"use strict";
exports.__esModule = true;
exports.handleCollect = exports.handleSwap = exports.handleMint = exports.handleInitialize = void 0;
var collect_1 = require("./collect");
var initialize_1 = require("./initialize");
var mint_1 = require("./mint");
var swap_1 = require("./swap");
// Workaround for limited export types in Assemblyscript.
function handleInitialize(event) {
    (0, initialize_1.handleInitialize)(event);
}
exports.handleInitialize = handleInitialize;
function handleMint(event) {
    (0, mint_1.handleMint)(event);
}
exports.handleMint = handleMint;
function handleSwap(event) {
    (0, swap_1.handleSwap)(event);
}
exports.handleSwap = handleSwap;
function handleCollect(event) {
    (0, collect_1.handleCollect)(event);
}
exports.handleCollect = handleCollect;
