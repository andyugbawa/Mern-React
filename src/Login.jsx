import {useState} from 'react'
// import {Link} from "react-router-dom"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"

function Login() {

    
      
      const [email, setEmail] =useState()
      const [password, setPassword] =useState()
      const navigate = useNavigate()

   axios.defaults.withCredentials =true;

const handleSubmit = (e) => {
  e.preventDefault();

  // Check if fields are empty
  if (!email || !password) {
    alert("Please enter both email and password");
    return; // stop execution
  }

  axios.post("https://mern-backend.up.railway.app/login", { email, password })
    .then(res => {
      if (res.data.Status === "SUCCESS") {
        if (res.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert(res.data); // show server message
      }
    })
    .catch(err => {
      console.log(err);
      alert("Server error. Try again later.");
    });
};
  return (
   <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded  w-25'>
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email'>
            <strong>Email</strong>
          </label>
          <input
           type="text"
           placeholder='Enter Email'
           autoComplete='off'
           name="email"
           className='form-control rounded-0'
           onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>
            <strong>Password</strong>
          </label>
          <input
           type="password"
           placeholder='Enter password'
           autoComplete='off'
           name="password"
           className='form-control rounded-0'
           onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-success w-100 rounded-0'>
          Login
        </button>
        <div>
        </div>
      </form>
       <p>Already Have an Account Log in</p>
       <p>If you do not Have an Account Register</p>
         <Link to="/register" className='btn btn-success w-100 rounded-0'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
