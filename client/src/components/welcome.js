import React, { Component } from "react";
import "./styles.css";
import LogoHeader from "./logoHeader";
import { Route, Redirect } from "react-router-dom";
import checkToken from "./checkToken.js";
import { Segment, Grid, Header, Button, Image } from "semantic-ui-react";
import image from "./images/gainesville-downtown-street.jpg";
import logo from "./images/horizontalLogo1.png";

export default class welcome extends Component {
  /* make payment button
<form
              action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
              method="post"
              name="PrePage"
            >
              <input
                name="LinkId"
                type="hidden"
                value="ea28c130-eb6e-4e1a-a841-f179279b5b0f"
              ></input>{" "}
              <input
                type="submit"
                value="Make a Payment to Gonzalo Law"
              ></input>
            </form>
  */

  state = { redirect: false };

  componentDidMount() {
    checkToken().then(response => {
      //alert(response);
      this.setState({ redirect: response });
    });
    //await alert(tokenRes.data.success);
    //this.setState({ redirect: tokenRes.success });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/projects" />;
    } else {
      return (
        <div>
          <Image src={image} fluid />
          <Grid centered columns={3}>
            <Grid.Column>
              <div className="auth-content">
                <Segment>
                  <Image src={logo} centered />
                  <Header as="h4" textAlign="center" color="#5c110b">Welcome! Please login or register for an account.</Header>
                  <Button.Group centered fluid>
                    <Button basic color="red" href="/login">Login</Button>
                    <Button.Or />
                    <Button basic color="orange" href="/register">Register</Button>
                  </Button.Group>
                </Segment>
              </div>
            </Grid.Column>
          </Grid>
        </div>
        
      );
    }
  }
}
