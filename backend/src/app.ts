const express = require('express')
import { config } from "dotenv"
config();
const app = express()
app.use(express.json());

export default app;