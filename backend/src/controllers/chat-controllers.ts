import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import { configureOpenAI } from "../config/openai-config.js"

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message } = req.body
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) return res.status(401).json({ message: 'User not registred OR Token malfunctioned' })
        const chats = user.chats.map(({ role, content }) => ({ role, content }))
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: 'user' })
        const config = configureOpenAI();
        const openai = config
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: chats
        })
        user.chats.push(chatResponse.choices[0].message)
        await user.save();
        return res.status(200).json({ chats: user.chats })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match")
        }
        return res.status(200).json({ message: 'Ok', chats: user.chats })
    } catch (error) {
        return res.status(200).json({ message: "Error", cause: error.message })
    }
}

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match")
        }
        user.chats = []
        await user.save()
        return res.status(200).json({ message: 'Ok' })
    } catch (error) {
        return res.status(200).json({ message: "Error", cause: error.message })
    }
}