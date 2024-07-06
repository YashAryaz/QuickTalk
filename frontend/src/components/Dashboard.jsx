import React from 'react'
import './Dashboard.css';
import logo from '../assets/watsapplogo.svg';
function Dashboard() {
  return (
    <div className='Dashboard'>
       <img src={logo} className="Profile-logo" alt="logo" />
       <div  className='Big-text'>QuickTalk for Windows</div>
       <div className='text-content'>
        Send and recieve messages from your computer.
        <br />
        Linked 4 devices to your account.
       </div>
    </div>
  )
}

export default Dashboard