import User from "../models/User.js"
import { Request, Response, NextFunction } from "express"
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"

export const getAllusers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        return res.status(200).json({ message: "OK", users })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(401).send("Email already in use")
        const hashedPassword = await hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()

        res.clearCookie(COOKIE_NAME, { path: "/", domain: "tesis-rxum.onrender.com", httpOnly: true, signed: true, sameSite: 'none', secure: true })

        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "tesis-rxum.onrender.com", expires, httpOnly: true, signed: true, sameSite: 'none', secure: true })

        return res.status(200).json({ message: "OK", username: user.username, email: user.email })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send("User not registred")
        }
        const isPasswordCorrect = await compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(403).send({ message: "Incorrect password", id: user._id.toString() })
        }

        res.clearCookie(COOKIE_NAME, { path: "/", domain: "tesis-rxum.onrender.com", httpOnly: true, signed: true, sameSite: 'none', secure: true })

        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "tesis-rxum.onrender.com", expires, httpOnly: true, signed: true, sameSite: 'none', secure: true })

        return res.status(200).json({ message: "OK", username: user.username, email: user.email })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunction")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match")
        }
        return res.status(200).json({ message: "OK", username: user.username, email: user.email })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunction")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match")
        }
        res.clearCookie(COOKIE_NAME, { path: "/", domain: "tesis-rxum.onrender.com", httpOnly: true, signed: true, sameSite: 'none', secure: true })
        return res.status(200).json({ message: "OK" })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}