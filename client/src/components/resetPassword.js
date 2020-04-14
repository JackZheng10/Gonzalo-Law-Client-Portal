import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import baseURL from "../baseURL";
import image from "./images/gainesville-downtown-street.jpg";
import logo from "./images/horizontalLogo1.png";
import { Button, Form, Grid, Header, Segment, Image } from "semantic-ui-react";

export default class passwordReset extends Component {
  state = {
    password: "",
    confirmPassword: "",
  };

  componentDidMount() {}

  onSubmit = (event) => {
    event.preventDefault();
    console.log("password: " + this.state.password);
    console.log("repeat password: " + this.state.confirmPassword);
  };

  render() {
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
