import { connectDatabase } from "./db/connection.js";
import User from "./models/User.js"
import app from "./app.js"

connectDatabase()
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    })
    .catch((err) => console.log(err));


