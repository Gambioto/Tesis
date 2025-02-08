import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("Email already in use");
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Limpiar la cookie (sin dominio)
        res.clearCookie(COOKIE_NAME, { path: "/", httpOnly: true, signed: true, sameSite: 'none', secure: true });

        // Crear el token
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Establecer la cookie (sin dominio)
        res.cookie(COOKIE_NAME, token, { path: "/", expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });

        return res.status(200).json({ message: "OK", username: user.username, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send({ message: "Incorrect password", id: user._id.toString() });
        }

        // Limpiar la cookie (sin dominio)
        res.clearCookie(COOKIE_NAME, { path: "/", httpOnly: true, signed: true, sameSite: 'none', secure: true });

        // Crear el token
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Establecer la cookie (sin dominio)
        res.cookie(COOKIE_NAME, token, { path: "/", expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });

        return res.status(200).json({ message: "OK", username: user.username, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunction");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        // Limpiar la cookie (sin dominio)
        res.clearCookie(COOKIE_NAME, { path: "/", httpOnly: true, signed: true, sameSite: 'none', secure: true });

        return res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};