import { Link } from "react-router"

function Welcome(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-black px-4 " >
            <h1 className="text-4xl font-extrabold mb-4 text-center ">
                Welcome to Todo App</h1>

            <div className=" flex gap-4 ">
                <Link to="/login" className=" bg-black text-white px-8 py-3 rounded-lg " >
                    <button>Login</button>     
                 </Link>

                <Link to="/register" 
                className=" border px-8 py-3 rounded-lg " >
                <button>Register</button>
                </Link>

            </div>
        </div>
    )
}

export default Welcome