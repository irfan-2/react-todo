import { Link } from "react-router"

function Welcome(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 " >
            <h1 className="text-4xl font-extrabold mb-4 text-center ">
                Welcome to Todo App</h1>

            <div className=" flex gap-4 ">
                <Link to="/login" className=" bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition " >
                    <button>Login</button>     
                 </Link>

                <Link to="/register" 
                className=" border border-gray-600 hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition " >
                <button>Register</button>
                </Link>

            </div>
        </div>
    )
}

export default Welcome