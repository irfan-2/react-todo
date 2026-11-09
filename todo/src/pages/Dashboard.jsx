import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

const BASE_URL = "https://0xirfan.com"

function Dashboard(){
    const navigate = useNavigate()

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    const token = localStorage.getItem("token")

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const getTodos = async () =>{
        try {
            const response = await axios.get(
                `${BASE_URL}/todo/get`, config
            )

            setTodos(response.data.todos)
        } catch (error) {
            console.log(error.message);
            
        }
    }
        useEffect(() =>{
            if(!token) {
                navigate("login")
                return
            }

            getTodos()
        },[])

        const addTodo = async (e) =>{
            e.preventDefault()
            if(!todo.trim()) return
            try {
                await axios.post(
                    `${BASE_URL}/todo/create`, {todo}, config
                )

                setTodo("")
                getTodos()
            } catch (error) {
                console.log(error);
                
            } 
        }
        const deleteTodo = async (id) =>{
            try {
                await axios.delete(
                    `${BASE_URL}/todo/delete/${id}`,
                    config
                )
                getTodos()
            } catch (error) {
                console.log(error);
                
            }
        }
        const logout = () =>{
            localStorage.removeItem("token")
            navigate("/login")
        }
    

    return (
        <div className="min-h-screen bg-black text-white p-5" >
           <div  className="max-w-xl mx-auto" >
                <div className="flex justify-between items-center mb-8" >
                    <h1 className="text-3xl font-bold">
                        My Todos  </h1>

                         <button
                        onClick={logout}
                        className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                <form onSubmit={addTodo}>
                    <input type="text" 
                        placeholder="Enter a new todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="flex-1 min-w-0 p-3 rounded-lg bg-black outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-3 rounded-lg cursor-pointer"
                    >
                        Add
                    </button>

                </form>

                <div>
                     {todos.length === 0 ? (
                        <p className="text-center">
                            No todos yet. Add your first task!
                        </p>
                    ) : (
                        todos.map((item) => (
                            <div
                                key={item._id}
                                className="bg-black text-white p-4 rounded-lg flex justify-between items-center gap-3"
                            >
                                <p>
                                    {item.todo}
                                </p>

                                <button
                                    onClick={() => deleteTodo(item._id)}
                                    className="bg-red-500px-3 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

           </div>
        </div>
    )
}

export default Dashboard
