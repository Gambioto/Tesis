import { Router } from "express"
import { getAllusers, logoutUser, userLogin, userSignup, verifyUser } from "../controllers/user-controllers.js"
import { loginValidator, signupValidator, validate } from "../utils/validators.js"
import { createToken, verifyToken } from "../utils/token-manager.js"

const userRoutes = Router()

userRoutes.get("/", getAllusers)
userRoutes.post("/signup", validate(signupValidator), userSignup)
userRoutes.post("/login", validate(loginValidator), userLogin)
userRoutes.get("/auth-status")
userRoutes.get("/logout", logoutUser)

export default userRoutes