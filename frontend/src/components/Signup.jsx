import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { set } from "mongoose";
import userSignup from "../hooks/userSignup";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const { setAuthUser } = useAuthContext();
  const { signup } = userSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ fullName, username, password, confirmPassword, gender });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ margin: "10px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ margin: "10px" }}
        />
        <br />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ margin: "10px" }}
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <br />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button type="submit" style={{ margin: "10px" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
