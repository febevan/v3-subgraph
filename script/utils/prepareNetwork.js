"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.prepare = exports.getAlchemyDeploymentParams = exports.getSubgraphName = exports.validateSubgraphType = exports.validateNetwork = exports.SUBGRAPH_TYPE = exports.NETWORK = void 0;
var dotenv = require("dotenv");
var fsExtra = require("fs-extra");
var path = require("path");
var process = require("process");
var NETWORK;
(function (NETWORK) {
    NETWORK["ARBITRUM"] = "arbitrum-one";
    NETWORK["AVALANCHE"] = "avalanche";
    NETWORK["BASE"] = "base";
    NETWORK["BLAST"] = "blast-mainnet";
    NETWORK["BSC"] = "bsc";
    NETWORK["CELO"] = "celo";
    NETWORK["ETHEREUM"] = "ethereum";
    NETWORK["MATIC"] = "matic";
    NETWORK["OPTIMISM"] = "optimism";
    NETWORK["SONEIUM"] = "soneium-mainnet";
    NETWORK["UNICHAIN"] = "unichain-mainnet";
    NETWORK["WORLDCHAIN"] = "worldchain-mainnet";
    NETWORK["ZKSYNC_ERA"] = "zksync-era";
    NETWORK["ZORA"] = "zora-mainnet";
    NETWORK["HASHKEY_CHAIN_SEPOLIA"] = "hashkey-chain-sepolia";
    NETWORK["HASHKEY_CHAIN"] = "hashkey-chain";
    NETWORK["X_LAYER"] = "x-layer";
})(NETWORK = exports.NETWORK || (exports.NETWORK = {}));
var SUBGRAPH_TYPE;
(function (SUBGRAPH_TYPE) {
    SUBGRAPH_TYPE["V3_TOKENS"] = "v3-tokens";
    SUBGRAPH_TYPE["V3"] = "v3";
})(SUBGRAPH_TYPE = exports.SUBGRAPH_TYPE || (exports.SUBGRAPH_TYPE = {}));
var CHAIN_CONSTANTS_FILE_NAME = 'chain.ts';
var SUBGRAPH_ENV_FILE_NAME = '.subgraph-env';
function validateNetwork(network) {
    if (!network) {
        console.error('no network parameter passed');
        process.exit(-1);
    }
    if (!Object.values(NETWORK)
        .map(function (n) { return n.toString(); })
        .includes(network)) {
        console.error.apply(console, __spreadArray(['invalid network parameter passed, pass either: '], Object.values(NETWORK), false));
        process.exit(-1);
    }
}
exports.validateNetwork = validateNetwork;
function validateSubgraphType(subgraphType) {
    if (!subgraphType) {
        console.error('no subgraph name parameter passed');
        process.exit(-1);
    }
    if (!Object.values(SUBGRAPH_TYPE)
        .map(function (n) { return n.toString(); })
        .includes(subgraphType)) {
        console.error.apply(console, __spreadArray(['invalid subgraph name parameter passed, pass either: '], Object.values(SUBGRAPH_TYPE), false));
        process.exit(-1);
    }
}
exports.validateSubgraphType = validateSubgraphType;
function getSubgraphName(subgraphType) {
    dotenv.config({ path: '.subgraph-env' });
    if (subgraphType === SUBGRAPH_TYPE.V3_TOKENS) {
        if (!process.env.V3_TOKEN_SUBGRAPH_NAME) {
            throw new Error('V3_TOKEN_SUBGRAPH_NAME must be set');
        }
        return process.env.V3_TOKEN_SUBGRAPH_NAME;
    }
    if (!process.env.V3_SUBGRAPH_NAME) {
        throw new Error('V3_SUBGRAPH_NAME must be set');
    }
    return process.env.V3_SUBGRAPH_NAME;
}
exports.getSubgraphName = getSubgraphName;
function getAlchemyDeploymentParams() {
    dotenv.config();
    if (!process.env.ALCHEMY_DEPLOY_URL || !process.env.ALCHEMY_IPFS_URL || !process.env.ALCHEMY_DEPLOY_KEY) {
        throw new Error('ALCHEMY_DEPLOY_URL, ALCHEMY_IPFS_URL, and ALCHEMY_DEPLOY_KEY must be set');
    }
    return {
        node: process.env.ALCHEMY_DEPLOY_URL,
        ipfs: process.env.ALCHEMY_IPFS_URL,
        deployKey: process.env.ALCHEMY_DEPLOY_KEY
    };
}
exports.getAlchemyDeploymentParams = getAlchemyDeploymentParams;
function prepare(network, subgraphName) {
    return __awaiter(this, void 0, void 0, function () {
        var chainConstantsFilePath, subgraphEnvFilePath, chainConstantsOutputPath, subgraphEnvOutputPath;
        return __generator(this, function (_a) {
            try {
                console.log("preparing config for ".concat(network, " ").concat(subgraphName, " subgraph"));
                chainConstantsFilePath = path.join(__dirname + '/../../config/' + network + '/' + CHAIN_CONSTANTS_FILE_NAME);
                subgraphEnvFilePath = path.join(__dirname + '/../../config/' + network + '/' + SUBGRAPH_ENV_FILE_NAME);
                chainConstantsOutputPath = path.join(__dirname + '/../../src/common/' + CHAIN_CONSTANTS_FILE_NAME);
                subgraphEnvOutputPath = path.join(__dirname + '/../../' + SUBGRAPH_ENV_FILE_NAME);
                console.log('chain constants path:', chainConstantsFilePath, ' to:', chainConstantsOutputPath);
                fsExtra.copySync(chainConstantsFilePath, chainConstantsOutputPath);
                fsExtra.copySync(subgraphEnvFilePath, subgraphEnvOutputPath);
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.prepare = prepare;
