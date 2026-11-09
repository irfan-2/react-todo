import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    todo: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const todoModel = mongoose.model("todos", todoSchema)

export default todoModel

// 1st parameter ref ke liye rehta 
// 3rd parameter custom naam ke liye use karte