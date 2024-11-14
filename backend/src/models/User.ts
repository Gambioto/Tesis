const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [ChatSchema]
})

export default mongoose.model("User", UserSchema);