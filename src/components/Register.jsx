"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({ name: "", dob: "", email: "", password: "" });
    const [msg, setMsg] = useState("")

    const navigate = useNavigate()

    let fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    let register = async (e) => {
        e.preventDefault()
        if (!data.name || !data.email || !data.password || !data.dob) {
            return setMsg("All fields are required");
        }
        try {
            let res = await axios.post("http://localhost:5000/register", data);
            setMsg(res.data.msg);
            setData({ name: "", dob: "", email: "", password: "" });
            navigate('/login');
        } catch (err) {
            console.error(err);
            setMsg("Registration failed");
        }
    };

    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={register}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    {msg !== "" && (<div className="text-center text-red-500 font-semibold mb-4">{msg}</div>)}
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registration</h2>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        placeholder="Enter Your Name"
                        onChange={fun}
                        required
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="date"
                        name="dob"
                        value={data.dob}
                        onChange={fun}
                        required
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Enter Your E-mail"
                        onChange={fun}
                        required
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Enter Your Password"
                        onChange={fun}
                        required
                        className="w-full mb-6 p-2 border border-gray-300 rounded"
                    />
         
                    <select
                        name="role"
                        value={data.role}
                        onChange={fun}
                        className="w-full mb-6 p-2 border border-gray-300 rounded bg-white text-gray-700"
                    >
                        <option value="">Select Role</option>
                        <option value="Developer">Developer</option>
                        <option value="Admin">Admin</option>
                        <option value="Publisher">Publisher</option>
                    </select>


                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Register
                    </button>
                    <p className="text-sm mt-4 text-center">
                        Already registered?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                    {msg && (<p className="text-green-600 mt-4 text-center font-medium">{msg}</p>)}
                </form>
            </div>

        </>
    )
}

export default Register
