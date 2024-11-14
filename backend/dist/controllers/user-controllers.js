"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = exports.getAllusers = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = require("bcrypt");
const getAllusers = async (req, res, next) => {
    try {
        const users = await User_js_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.getAllusers = getAllusers;
const userSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_js_1.default({ username, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userSignup = userSignup;
//# sourceMappingURL=user-controllers.js.map