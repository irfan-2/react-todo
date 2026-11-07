import axios from "axios"
import { useState } from "react"
import {Link, useNavigate } from "react-router"

function Login() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5000/user/login",
                form
            )
            localStorage.setItem("token", response.data.token)
            alert("logged in successfully")
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
            
            
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4" >

            <form onSubmit={handleSubmit}
            className="bg-gray-100 p-8 rounded-xl w-full max-w-md space-y-5">
                <h1 className="text-3xl font-bold text-black text-center" >
                    Login
                </h1>

                <input type="text" 
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black text-white outline-none"
                />

                <input type="password" 
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black text-white outline-none"
                />

                <button type="submit"
                 className="w-full bg-black text-white py-3 rounded-lg font-medium cursor-pointer"
                >
                    Login
                </button>

                <p className="text-black text-center" >
                    Don't have an account?
                    <Link to="/register" className="text-black">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Login