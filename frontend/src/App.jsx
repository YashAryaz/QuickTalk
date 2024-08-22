import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import Dashboard from "./components/Dashboard";
import ChatBoard from "./components/ChatBoard";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import useConversation from "./zustand/useConversation";
// import { ToastContainer } from 'react-toastify';

function App() {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={
            authUser ? (
              <div className="Container">
                <Sidebar />
                <ChatSection />
                {!selectedConversation ? <Dashboard /> : <ChatBoard />}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
