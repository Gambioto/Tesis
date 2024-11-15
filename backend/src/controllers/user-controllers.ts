import User from "../models/User.js"
import { Request, Response, NextFunction } from "express"
import { hash, compare } from 'bcrypt'

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
        return res.status(200).json({ message: "OK", id: user._id.toString() })
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
        return res.status(200).json({ message: "OK", })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}