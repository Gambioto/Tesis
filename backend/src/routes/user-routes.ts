import { Router } from "express"
import { getAllusers, userSignup } from "../controllers/user-controllers.js"
import { signupValidator, validate } from "../utils/validators.js"

const userRoutes = Router()

userRoutes.get("/", getAllusers)
userRoutes.post("/signup", validate(signupValidator), userSignup)

export default userRoutes