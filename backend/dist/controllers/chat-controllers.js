"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_config_1 = require("../config/openai-config");
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User_1.default.findBydId(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: 'User not registred OR Token malfunctioned' });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: 'user' });
        const config = (0, openai_config_1.configureOpenAI)();
        const openai = config;
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: chats
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.generateChatCompletion = generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map