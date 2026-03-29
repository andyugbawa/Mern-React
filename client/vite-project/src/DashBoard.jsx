import React from 'react'
import {Link} from "react-router-dom"

function DashBoard() {
  return (
    <div>
      <h2>DASHBOARD</h2>
       <Link to="/home" className='btn btn-success w-10 rounded-0'>
        Home
      </Link>
       <Link to="/login" className='btn btn-success w-10 rounded-0'>
        Log Out
      </Link>
    </div>
  )
}

export default DashBoard
