import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import baseURL from "../baseURL";
import logo from "./images/horizontalLogo1.png";
import { Button, Form, Grid, Header, Segment, Image } from "semantic-ui-react";

export default class passwordReset extends Component {
  state = {
    email: "",
    redirect: false,
  };

  onSubmit = (event) => {
    event.preventDefault();

    let email = this.state.email;
    axios
      .post(baseURL + "pwdResetEmail", { email })
      .then((res) => {
        if (res.data.success) {
          alert(
            "A password recovery link has just been emailed to you. Since this is a demo, a preview can be found here: " +
              res.data.message
          );
          this.setState({ redirect: true });
        } else {
          alert(
            "There was an error with sending a password recovery link. Please enter a valid email and try again."
          );
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
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
                  Password Recovery
                </Header>
                <Form className="form-group" onSubmit={this.onSubmit}>
                  <Form.Field>
                    <label>
                      Please enter the email associated with your account
                    </label>
                    <input
                      placeholder="Enter email"
                      type="email"
                      required
                      color="white"
                      value={this.state.email}
                      onChange={(event) => {
                        this.setState({ email: event.target.value });
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
