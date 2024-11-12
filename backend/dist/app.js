"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = express();
app.use(express.json());
exports.default = app;
//# sourceMappingURL=app.js.map