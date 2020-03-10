import React from "react";
import logo from "./images/horizontalLogo1.png";
import "./styles.css";
/**must npm install @material-ui/core**/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
//import Typeography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";


const NavBar = () => {
  return (
  <AppBar position="static">
    <Toolbar className="nav-bar">
      <img src={logo} className="logo"/>
      <h1 className = "nav-bar-header">
        Client Portal
      </h1>
      <a href="/projects" className="button">Projects</a>
      <a href="/calendar" className="button">Calendar</a>
      <a 
      //this needs to be properly handled
        href="/welcome" className="button">
        sign out
        </a>
      {/* <button className="button">
      <a href="/projects">Projects</a>
      </button>
      <button className="button">
      <a href="/calendar">Calendar</a>
      </button>
      <button className="button">
      <a 
      //this needs to be properly handled
        href="/welcome">
        sign out
        </a>
      </button> */}
    </Toolbar>
   </AppBar>
  );
};

export default NavBar;
