import React, { Component } from "react";
import logo from "../assets/watsapplogo.svg";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <>
        <div className="Header-bar">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="text">QuickTalk</div>
          <div className="icon"></div>
        </div>
      </>
    );
  }
}

export default Header;
