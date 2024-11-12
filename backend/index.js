const express = require('express')
const mongoose = require('mongoose')
const User = require('./src/models/user.model.js')
const app = express()
app.use(express.json());

mongoose.connect("mongodb+srv://gera:PK9UkZ1LxpaM6UdS@cluster0.sknjwvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected!'))
    .catch(() => console.log("Failed to connect"))



app.get('/', function (req, res) {
    res.send('Hello World')
})



app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})