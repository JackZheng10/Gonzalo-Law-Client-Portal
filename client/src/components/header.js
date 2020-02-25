import React from "react";
import logo from "./images/horizontalLogo1.png";
import "./styles.css";

const Header = () => {
  return (
    <div>
      <div className="welcomeHeader">
        <img src={logo} alt="Company Logo"></img>
      </div>
      <div className="welcomeHeader">
        <h1 style={{ color: "black" }}>Client Portal</h1>
      </div>
    </div>
  );
};

export default Header;
