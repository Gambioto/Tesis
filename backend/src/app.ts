const express = require('express')
import { config } from "dotenv"
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser"
const cors = require("cors")
config();
const app = express()

app.use(cors({ origin: 'tesis-backend-xqew.onrender.com', credentials: true }))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
//remove in production
app.use(morgan("dev"))

app.use("/api/v1", appRouter)

export default app;