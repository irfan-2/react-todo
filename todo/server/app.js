import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import "./config/database.js"
import publicUserRouter from "./controllers/public/user.js"
import authMiddleware from "./middleware/auth.js"
import privateTodoRouter from "./controllers/private/todo.js"

const app = express()

app.use(cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
}))

app.use(express.json())

const port =  process.env.PORT

app.get("/health", (req,res) =>{
    res.status(200).json({
        "msg" : "APIs are eating apple >_<"
    })
})

app.use("/user", publicUserRouter)

app.use(authMiddleware)
app.use("/todo", privateTodoRouter)

app.listen(port, () =>{
    console.log("Server is running ");
    
})