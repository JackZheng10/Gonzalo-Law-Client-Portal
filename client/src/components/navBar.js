import React, { Component } from "react";
import logo from "./images/horizontalLogo1.png";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Menu, Segment, Dropdown } from "semantic-ui-react";

const NavBar = () => {
  //state = { activeItem: 'My Projects' }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    axios.defaults.headers.common["token"] = null;
  };

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  const handlePaymentClick = async ()=> {

    document.getElementById("payment").submit();
  }

  const user = jwtDecode(localStorage.getItem('token'));

  const name = localStorage.getItem('username');
  const email = localStorage.getItem('userEmail');

  const userMenu = ()=>{
    if(user.isAdmin === true) {
      return(
        <Menu.Menu position="right" >
          <Dropdown item text='Admin'>
            <Dropdown.Menu>
              <Dropdown.Item>{"Current Selected Client: "+name} </Dropdown.Item>
              <Dropdown.Item href="/admin"> Return To Client List </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>

      )
    }
    else{
      return(
        <Menu.Menu position="right">
          <Dropdown item text={name}>
          <Dropdown.Menu>
            <Dropdown.Item>{"Email: "+email} </Dropdown.Item>
            <Dropdown.Item onClick={handlePaymentClick}>
              <form
                action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
                method="post"
                id="payment"
              >
                <input
                  name="LinkId"
                  type="hidden"
                  value="ea28c130-eb6e-4e1a-a841-f179279b5b0f"
                ></input>{"Make a Payment"}

              </form></Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} href="/welcome"> logout </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>    
      </Menu.Menu>

      )
    }
  }

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
          {userMenu()}
        </Menu>
      </div>
    );
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

 export default NavBar;
