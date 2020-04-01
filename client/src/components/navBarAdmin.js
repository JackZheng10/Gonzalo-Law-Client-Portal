import React, { Component } from "react";
import logo from "./images/horizontalLogo1.png";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, Segment } from "semantic-ui-react";


export default class NavBarAdmin extends Component {
  //state = { activeItem: 'My Projects' }
  handleLogout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["token"] = null;
    alert("Logged out successfully.");
  };

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  

  render() {
    //const { activeItem } = this.state

    return (
      <div className="nav-bar">
        <Menu pointing secondary>
          <img src={logo} className="logo" />
          <Menu.Item
            name='Projects'
            //active={activeItem === 'My Projects'}
            //onClick={this.handleItemClick}
            href="/admin"
          />
          <Menu.Item
            name='Calendar'
            //active={activeItem === 'Calendar'}
            //onClick={this.handleItemClick}
            href="/calendar"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              //active={activeItem === 'logout'}
              onClick={this.handleLogout}
              href="/welcome"
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
