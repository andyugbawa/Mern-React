import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import SignUp from './SignUp'
import Login from "./Login"
import Home from "./Home"
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import DashBoard from './DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (


      //  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 <BrowserRouter>

<Routes>
  <Route path="/" element={<Navigate to="/register" />} />  {/* redirect */}
  <Route path="/register" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/dashboard" element={<DashBoard />} />
</Routes>

 </BrowserRouter>
      
       
     
     
     
  
  )
}

export default App
