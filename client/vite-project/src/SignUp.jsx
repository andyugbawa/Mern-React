import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"

 function SignUp() {

  const [name, setName] =useState()
  const [email, setEmail] =useState()
  const [password, setPassword] =useState()
  const navigate = useNavigate()
   
 const handleSubmit = (e) => {
  e.preventDefault();

  // 1️⃣ Check if fields are empty
  if (!name || !email || !password) {
    alert("Please fill in all fields before registering");
    return; // stop the function, do not send request
  }

  // 2️⃣ Send request only if fields are filled
  axios.post("/api/register", { name, email, password },{ withCredentials: true })
    .then(res => {
      if (res.data.status === "SUCCESS") {
        alert("Registration successful! Please login.");
        navigate("/login"); // only navigate if success
      } else {
        // server returned an error
        alert(res.data.error || "Registration failed. Try again.");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Server error. Please try again later.");
    });
};



  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded  w-25'>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name'>
            <strong>Name</strong>
          </label>
          <input
           type="text"
           placeholder='Enter Name'
           autoComplete='off'
           name="name"
           className='form-control rounded-0'
           onChange={(e)=> setName(e.target.value)}
          />
        </div>
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
          Register
        </button>
        <div>

      
        </div>
      </form>
      <p>Already Have an Account</p>
        <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0'>
         Login
        </Link>
      </div>
    </div>
  )
}
export default SignUp
