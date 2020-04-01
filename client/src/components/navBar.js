import React, { Component } from "react";
import logo from "./images/horizontalLogo1.png";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, Segment } from "semantic-ui-react";

export default class NavBar extends Component {
  //state = { activeItem: 'My Projects' }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    axios.defaults.headers.common["token"] = null;
    alert("Logged out successfully.");
  };

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handlePaymentClick() {
    window.location.assign(
      "https://www.gonzalolaw.com/client-resources/make-a-payment/"
    );
  }

  render() {
    //const { activeItem } = this.state

    return (
      <div className="nav-bar">
        <Menu pointing secondary>
          <img src={logo} className="logo" />
          <Menu.Item
            name="My Projects"
            //active={activeItem === 'My Projects'}
            //onClick={this.handleItemClick}
            href="/projects"
          />
          <Menu.Item
            name="Calendar"
            //active={activeItem === 'Calendar'}
            //onClick={this.handleItemClick}
            href="/calendar"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="Make a Payment"
              onClick={this.handlePaymentClick.bind(this)}
            />
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

//const handleLogout = () => {
//   localStorage.removeItem("token");
//   axios.defaults.headers.common["token"] = null;
//   alert("Logged out successfully.");
// };

// const NavBar = (props) => {
//   const [activeItem, setActiveItem] = useState({});

//   return (
//     <div>
//       <Menu pointing secondary>
//         <Menu.Item
//           name='home'
//           active={activeItem === 'home'}
//           //onClick={this.handleItemClick}
//         />
//         <Menu.Item
//           name='messages'
//           //active={activeItem === 'messages'}
//           //onClick={this.handleItemClick}
//         />
//         <Menu.Menu position='right'>
//           <Menu.Item
//             name='logout'
//             //active={activeItem === 'logout'}
//             //onClick={this.handleItemClick}
//           />
//         </Menu.Menu>
//       </Menu>
//     </div>

//   );
// };

// export default NavBar;
