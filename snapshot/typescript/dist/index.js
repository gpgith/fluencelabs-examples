"use strict";
/*
 * Copyright 2021 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fluence_1 = require("@fluencelabs/fluence");
var fluence_network_environment_1 = require("@fluencelabs/fluence-network-environment");
// import { ethers } from "ethers";
var timestamp_getter_1 = require("./timestamp_getter");
function timestamp_delta(proposal_ts_ms, network_ts_ms) {
    var acceptable_ts_diff = 60 * 1000; // 1 Minute
    var valid_ts = [];
    var invalid_ts = [];
    for (var _i = 0, network_ts_ms_1 = network_ts_ms; _i < network_ts_ms_1.length; _i++) {
        var t = network_ts_ms_1[_i];
        var threshold_ts = t + acceptable_ts_diff;
        console.log(t, threshold_ts);
        if (threshold_ts > proposal_ts_ms) {
            // results.get("valid"); // .valid_ts.push(t);
            valid_ts.push(t);
        }
        else {
            // results.set("invalid", invalid_ts.push(t));
            invalid_ts.push(t);
        }
    }
    console.log("valid_ts: ", valid_ts);
    console.log("invalid_ts: ", invalid_ts);
    var results = new Map();
    results.set("valid", valid_ts);
    results.set("invalid", invalid_ts);
    return results;
}
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var fluence, network_result, now, utc_ts, ts_diffs, valid_ts, invalid_ts;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("hello");
                    return [4 /*yield*/, fluence_1.createClient(fluence_network_environment_1.krasnodar[2])];
                case 1:
                    fluence = _c.sent();
                    return [4 /*yield*/, timestamp_getter_1.ts_getter(fluence, fluence_network_environment_1.krasnodar[2].peerId)];
                case 2:
                    network_result = _c.sent();
                    console.log(network_result);
                    console.log(network_result[5]);
                    now = new Date;
                    utc_ts = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
                    console.log(utc_ts);
                    ts_diffs = timestamp_delta(utc_ts, network_result);
                    console.log(ts_diffs);
                    if (ts_diffs.has("valid") && ts_diffs.has("invalid")) {
                        valid_ts = (_a = ts_diffs.get("valid")) === null || _a === void 0 ? void 0 : _a.length;
                        invalid_ts = (_b = ts_diffs.get("invalid")) === null || _b === void 0 ? void 0 : _b.length;
                        console.log(valid_ts, invalid_ts);
                        if (valid_ts !== undefined && invalid_ts !== undefined && (valid_ts / (valid_ts + invalid_ts)) >= (2 / 3)) {
                            console.log("consensus");
                        }
                        else {
                            console.log("no consensus");
                        }
                    }
                    else {
                        console.log("error: something went wrong with getting our timestamp validated");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
