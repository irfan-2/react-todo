import express from "express"
import dotenv from "dotenv"
import path from "path";
import cors from "cors"
dotenv.config()
import "./config/database.js"
import publicUserRouter from "./controllers/public/user.js"
import authMiddleware from "./middleware/auth.js"
import privateTodoRouter from "./controllers/private/todo.js"

const app = express()

app.use(cors({
      origin: [
        "https://0xirfan.com",
        "https://www.0xirfan.com",
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


const buildPath = path.join(import.meta.dirname, "dist");

app.use(express.static(buildPath));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));