import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

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
            alert(error.response?.data?.msg) || "registration failed"
        }
    }

    return <h1>Register Page</h1>
}

export default Register
