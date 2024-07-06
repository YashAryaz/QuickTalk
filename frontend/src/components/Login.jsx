import React, { useRef, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLogin from "../hooks/userLogin";


const Login = () => {
    const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const inputRefs=useRef([]);

	const { login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
            inputRefs.current[1].focus();

        }
    }
      useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

    return (
        <div className="login-container" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{margin:'5px'}}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        ref={(input) => (inputRefs.current[0]=input)}
                        style={{borderRadius:'8px',margin:'5px',border:'none',padding:'5px'}}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                        onKeyDown={(e)=>handleKeyDown(e)}
                    />
                </div>
                <div className="form-group" style={{margin:'5px'}}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        ref={(input) => (inputRefs.current[1]=input)}
                        style={{borderRadius:'8px',margin:'9px',border:'none',padding:'5px'}}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password'
                    />
                </div>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;