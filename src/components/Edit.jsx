"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [data, setData] = useState({ name: "", dob: "", email: "", role: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const upd = () => {
    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/edit/${email}`, data)
      .then((res) => {
        setMsg(res.data.msg || "Updated successfully");
        setTimeout(() => navigate("/disp"), 1000); // go back to dashboard
      })
      .catch((err) => setMsg("Update failed"));
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/get/${email}`)
      .then((res) => {
        console.log("Fetched user:", res.data);
        const { name = "", dob = "", email = "", role = "" } = res.data;
        setData({ name, dob, email, role });
      })
      .catch((err) => {
        console.log("Error fetching user", err);
        setMsg("Could not load user data");
      });
  }, [email]);


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {msg && (<div className="mb-4 text-center text-green-600 font-medium">{msg}</div>)}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700"> Edit User</h2>

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
          placeholder="Enter Email"
          disabled
          readOnly
          className="w-full mb-4 p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
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
          onClick={upd}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
    </div>

  );
};

export default Edit;

