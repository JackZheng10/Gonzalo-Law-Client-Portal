import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import baseURL from "../baseURL";
import image from "./images/gainesville-downtown-street.jpg";
import logo from "./images/horizontalLogo1.png";
import { Button, Form, Grid, Header, Segment, Image } from "semantic-ui-react";

export default class passwordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      redirect: false,
    };

    this.sessionID = this.props.match.params.sessionid;
  }

  onSubmit = (event) => {
    event.preventDefault();

    let sessionID = this.sessionID;
    let password = this.state.password;
    let confirmPassword = this.state.confirmPassword;

    if (password !== confirmPassword) {
      alert("Please make sure both fields match.");
    } else {
      axios
        .post(baseURL + "resetPassword", {
          sessionID,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data.success) {
            alert("Password reset successfully."); //set the url to used, set an expiration for a url, check token on this pg and recovery pg for redirects too
            this.setState({ redirect: true });
          } else {
            alert("Invalid password reset URL. Please request another.");
          }
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }
    return (
      <div className="background">
        <Grid centered columns={3}>
          <Grid.Column width={10}>
            <div className="auth-content">
              <Segment>
                <Image src={logo} centered />
                <Header as="h2" textAlign="center">
                  Reset Password
                </Header>
                <Form className="form-group" onSubmit={this.onSubmit}>
                  <Form.Field>
                    <label>New Password</label>
                    <input
                      placeholder="Enter password"
                      type="password"
                      required
                      color="white"
                      value={this.state.password}
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm New Password</label>
                    <input
                      placeholder="Confirm password"
                      type="password"
                      id="password"
                      required
                      value={this.state.confirmPassword}
                      onChange={(event) => {
                        this.setState({ confirmPassword: event.target.value });
                      }}
                    />
                  </Form.Field>
                  <Button type="submit" color="orange" fluid>
                    Submit
                  </Button>
                </Form>
              </Segment>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
