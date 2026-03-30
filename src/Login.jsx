import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// ✅ move this outside component
axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  axios.post(
    "https://mern-backend.up.railway.app/login",
    { email, password },
    { withCredentials: true }
  )
  .then(res => {
    if (res.data.status === "SUCCESS") {
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } else {
      alert(res.data.error || "Login failed");
    }
  })
  .catch(err => {
    console.log("ERROR:", err);
    alert("Server error. Try again later.");
  });
};


  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label><strong>Email</strong></label>
            <input
              type="text"
              placeholder='Enter Email'
              className='form-control rounded-0'
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter password'
              className='form-control rounded-0'
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className='btn btn-success w-100 rounded-0'>
            Login
          </button>
        </form>

        <p>If you do not have an account, register</p>
        <Link to="/register" className='btn btn-success w-100 rounded-0'>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;