import React from 'react'
import './Sidebar.css';
import chatlogo from '../assets/chat.svg';
import starlogo from '../assets/star.svg';
import phonelogo from '../assets/phone.svg';
import status from '../assets/status.svg';
import profile from '../assets/profile1.svg';
import settingsvg from '../assets/settingsvg.svg';
import archievedsvg from '../assets/archievedsvg.svg';
import { useAuthContext } from "../context/AuthContext";
export default function Sidebar() {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} 
	};


  return (
    <>
        <div className='Sidebar-bar'>
            <div className='top-icons'>
            <img src={chatlogo} className="App-logo" alt="logo" />
            <img src={phonelogo} className="App-logo" alt="logo" />
            <img src={status} className="App-logo" alt="logo" title='status' />
            </div>
            <div className='bottom-icons'>
            <img src={starlogo} className="App-logo" alt="logo" title='stared' />
            <img src={archievedsvg} className="App-logo" alt="logo" title='arcieved'/>
            <img src={settingsvg} className="App-logo" alt="logo" title='setting'/>
            <img src={profile} id='logout' className="App-logo" alt="logo" onClick={logout} title='logout'  />
            </div>
           
           
        
        </div>
    </>
  )
}
