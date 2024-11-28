import { Request, Response, NextFunction } from "express"
import User from "../models/User"
import { configureOpenAI } from "../config/openai-config"

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message } = req.body
        const user = await User.findBydId(res.locals.jwtData.id)
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