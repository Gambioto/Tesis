import { Router } from "express"
import { verifyToken, createToken } from "../utils/token-manager"
import { chatCompletionValidator, validate } from "../utils/validators"
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers"

const chatRoutes = Router()
chatRoutes.post("/new", validate(chatCompletionValidator), generateChatCompletion)
chatRoutes.get("/all-chats", sendChatsToUser)
chatRoutes.delete("/delete", deleteChats)

export default chatRoutes