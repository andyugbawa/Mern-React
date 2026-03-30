import React from 'react'
import {Link} from "react-router-dom"

 function Home() {
  return (
    <div>
      <h2>HOME</h2>
       <Link to="/dashboard" className='btn btn-success w-10 rounded-0'>
          Dashboard
        </Link>
    </div>
  )
}
export default Home