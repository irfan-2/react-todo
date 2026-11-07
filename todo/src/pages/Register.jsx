import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
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
        try{
          const response =  await axios.post(
                "http://localhost:5000/user/register", form
            )
            localStorage.setItem("token", response.data.token)
            alert("registered successfully")
            navigate("/dashboard")
        }
        catch(error){
            alert(error.response?.data?.msg || "registration failed")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4" >
            <form onSubmit={handleSubmit}
             className="bg-gray-100 p-8 rounded-xl w-full max-w-md space-y-5">
                <h1 className="text-3xl font-bold text-black text-center">
                    Create Account
                </h1>

                <input type="text" 
                name="name" 
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                 className="w-full p-3 rounded-lg bg-black text-white outline-none"
                />

                <input type="email" 
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-black text-white outline-none"
                />

                <input type="password" 
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-black text-white outline-none"
                />

                <button type="submit"
                 className="w-full bg-black text-white py-3 rounded-lg  cursor-pointer"
                >Register</button>

                <p className="text-gray-400 text-center text-sm">
                    Already have an account? 
                    <Link to="/login" className="text-blue-400" >Login</Link>
                </p>

             </form>
        </div>
    )
}

export default Register
