import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");       // ✅ initialize
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ allow cookies globally
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(
        "/api/login",   // ✅ use Vercel backend
        { email, password },
        { withCredentials: true }
      );

      // ✅ correct response key (lowercase "status")
      if (res.data.status === "SUCCESS") {
        if (res.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");   // ✅ this is your main goal
        }
      } else {
        alert(res.data.error || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>

        <p className="mt-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-success w-100 rounded-0">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;