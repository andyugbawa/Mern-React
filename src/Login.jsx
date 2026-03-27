import {useState} from 'react'
// import {Link} from "react-router-dom"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"

function Login() {

    
      
      const [email, setEmail] =useState()
      const [password, setPassword] =useState()
      const navigate = useNavigate()

   axios.defaults.withCredentials =true;
  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3001/login",{email,password})
    .then(res=>{

      if(res.data.status === "SUCCESS"){
        if(res.data.role === "admin"){
          navigate("/dashboard")
        }else{
          navigate("/home")
        }
      }
      // console.log(res.data)
      // alert("Created")
    })
    .catch(err=>{
      console.log(err)
    })
  }
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
        <Link to="/home" className='btn btn-success w-100 rounded-0'>
          Login
        </Link>
        <div>
        </div>
      </form>
       <p>Already Have an Account</p>
      </div>
    </div>
  )
}

export default Login
