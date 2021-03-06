import React, { Component } from "react";
import logo from "../images/horizontalLogo1.png";
import "../styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, Segment } from "semantic-ui-react";

export default class NavBarAdmin extends Component {
  //state = { activeItem: 'My Projects' }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    localStorage.removeItem("userCalendarID");
    axios.defaults.headers.common["token"] = null;
  };

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    //const { activeItem } = this.state

    return (
      <div className="nav-bar">
        <Menu pointing secondary>
          <img src={logo} className="logo" />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              //active={activeItem === 'logout'}
              onClick={this.handleLogout}
              href="/welcome"
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
