import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./styles.css";
import baseURL from "../baseURL";
import checkToken from "./checkToken.js";
import logo from "./images/horizontalLogo1.png";
import image from "./images/gainesville-downtown-street.jpg";

import {
  Grid,
  Header,
  Form,
  Segment,
  Message,
  Button,
  Image
} from 'semantic-ui-react';

export default class Register extends Component {
  state = {
    isRegistered: false,
    redirect: false
  };

  componentDidMount() {
    checkToken().then(response => {
      this.setState({ redirect: response });
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.name.value;

    axios
      .post(baseURL + "register", { email, password, name })
      .then(res => {
        if (res.data.success) {
          //const token = res.data.token;
          //localStorage.setItem("token", token);
          //this.defaults.headers.common.token = token;
          //const data = jwtDecode(token);

          this.setState({
            isRegistered: true
          });
        }
        if (res.data.error || res.error) {
          alert(res.data.error, res.error);
        }
      })
      .catch(error => {
        return error.response;
      });
  };

  render() {
    if (this.state.isRegistered) {
      alert("Registration successful. Please log in to continue.");
      return <Redirect to="/login" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/projects" />;
    } else {
      return (
        <div>
          <Image src={image} fluid />
        
        <Grid columns={3} centered>
          <Grid.Column width={10}>
          <div className="auth-content">
            <Segment>
              <Image src={logo} centered/>
              <Header as="h2" textAlign="center">Register</Header>
              <Form className="form-group" onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Enter full name"
                    id="name"
                    ref="name"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder='Enter email'
                    type="email"
                    id="email"
                    ref="email"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Create Password</label>
                  <input
                    type="password"
                    id="password"
                    ref="password"
                    required
                    placeholder="Enter password"
                  />
                </Form.Field>

                <Button type="submit" color="orange" fluid>Register</Button>
              </Form>
            </Segment>
            <Message>
              Already have an account? <a href="/login">Login</a>
            </Message>
            </div>
          </Grid.Column>
        </Grid>
        </div>
      );
    }
  }
}
