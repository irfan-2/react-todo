import express from "express"
import todoModel from "../../models/Todo.js"
import { renderToStaticMarkup } from "react-dom/server"

const router = express.Router()

router.post("/create", async (req,res) =>{
    try {
        let userId = req.user.id

        const {todo} = req.body

        const newTodo = await todoModel.create({
            userId,
            todo,
        })
        

        return res.status(201).json({
            "msg" : "todo added successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "Internal server error"
        })
    }
})

router.get("/get", async (req,res) =>{
    try {
        const userId = req.user.id

        const todos = await todoModel.find({userId})

        return res.status(200).json({
            "msg" : "here are all the todos you posted", total: todos.length,
            todos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

router.delete("/delete/:id", async (req,res) =>{
    try {
        let {id} = req.params
        const userId = req.user.id

        const deleteTodo = await todoModel.findOneAndDelete({
            _id: id,
            userId
        })

        if(!deleteTodo){
            return res.status(404).json({
                "msg" : "todo not found"
            })
        }

        return res.status(200).json({
            "msg" : "todo deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

export default router