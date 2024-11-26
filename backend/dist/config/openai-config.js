"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
const openai_1 = require("openai");
const configureOpenAI = () => {
    const config = new openai_1.OpenAI({
        apiKey: process.env.OPENAI_APIKEY,
        organization: process.env.OPENAI_ORGANIZATION,
    });
    return config;
};
exports.configureOpenAI = configureOpenAI;
//# sourceMappingURL=openai-config.js.map