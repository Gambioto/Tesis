"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const index_js_1 = __importDefault(require("./routes/index.js"));
(0, dotenv_1.config)();
const app = express();
app.use(express.json());
//remove in production
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", index_js_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map