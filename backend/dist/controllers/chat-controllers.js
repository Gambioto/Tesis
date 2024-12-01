"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const openai_config_js_1 = require("../config/openai-config.js");
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: 'User not registred OR Token malfunctioned' });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: 'user' });
        const config = (0, openai_config_js_1.configureOpenAI)();
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
const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: 'Ok', chats: user.chats });
    }
    catch (error) {
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: 'Ok' });
    }
    catch (error) {
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chat-controllers.js.map