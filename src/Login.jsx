import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter both email and password");

    try {
      const res = await axios.post( "https://mern-react-eta.vercel.app/api/login", { email, password }, { withCredentials: true });
      if (res.data.status === "SUCCESS") {
        navigate(res.data.role === "admin" ? "/dashboard" : "/home");
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-3"/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-3"/>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <Link to="/register" className="btn btn-light w-100 mt-2">Register</Link>
      </div>
    </div>
  );
}

export default Login;