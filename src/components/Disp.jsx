import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Disp = () => {
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({ name: "", dob: "", role: "" });
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/get", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (item) => {
    setInputData({ name: item.name, dob: item.dob, role: item.role });
    setIsEditItem(item.email);
    // navigate('/edit')
    navigate(`/edit/${item.email}`);
    setToggleSubmit(false);
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/del/${email}`)
        .then(() => setUsers(prev => prev.filter(item => item.email !== email)))
        .catch(err => console.log(err));
    }
  };

  return (

    
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          User Dashboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">DOB</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, ind) => (
                <tr key={data._id} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{ind + 1}</td>
                  <td className="px-4 py-2 border">{data.name}</td>
                  <td className="px-4 py-2 border">{data.dob}</td>
                  <td className="px-4 py-2 border">{data.role}</td>
                  <td className="px-4 py-2 border">
                    {data.status || "Active"}
                  </td>
                  <td className="border">
                    <button onClick={() => handleEdit(data)}> ✏️</button>
                    <button onClick={() => handleDelete(data.email)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default Disp;

