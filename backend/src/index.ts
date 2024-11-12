import { connectDatabase } from "./db/connection.js";
import User from "./models/user.model.js"
import app from "./app.js"

connectDatabase()
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    })
    .catch((err) => console.log(err));

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

