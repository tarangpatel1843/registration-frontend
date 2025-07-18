import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fun = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault()
    axios.post(`${BASE_URL}/login`, form)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/disp');
        } else if (res.data.msg === 'check email') {
          navigate('/register')
        }
        else {
          setError(res.data.msg);
          console.log('invalid login')
        }
      })
      .catch(() => {
        setError('Server error during login');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>

        {error && (<p className="text-red-500 text-center font-semibold mb-4">{error}</p>)}

        <input
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={fun}
          value={form.email}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={fun}
          value={form.password}
          autoComplete="current-password"
          required
          className="w-full mb-6 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>

  );
};

export default Login;
