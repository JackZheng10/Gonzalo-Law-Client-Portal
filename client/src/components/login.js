import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import baseURL from "../baseURL";
import jwtDecode from "jwt-decode";
import checkToken from "./checkToken.js";
import image from "./images/gainesville-downtown-street.jpg";
import logo from "./images/horizontalLogo1.png";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Image,
} from "semantic-ui-react";

export default class login extends Component {
  state = {
    isLoggedin: false,
    adminLoggedin: false,
    userEmail: "",
    persons: [],
    name: "",
    userData: {},
    redirect: false,
  };

  componentDidMount() {
    checkToken().then((response) => {
      this.setState({ redirect: response });
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    axios
      .post(baseURL + "login", { email, password })
      .then(async (res) => {
        if (res.data.success) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          //axios.defaults.headers.common["token"] = token;
          const data = jwtDecode(token);
          //alert(JSON.stringify(data));
          //await checkToken();

          this.setState({
            isLoggedin: true,
            userData: data,
          });
        }
        if (res.data.error || res.error) {
          alert(res.data.error, res.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/projects" />;
    }

    if (this.state.isLoggedin) {
      alert("Successfully logged in.");

      //for redirect to admin dashboard when admin logs in
      if (this.state.userData.isAdmin) {
        return <Redirect to="/admin" />;
      } else {
        localStorage.setItem("userEmail", this.state.userData.email);

        return <Redirect to="/projects" />;
      }

      //return <Redirect to="/dashboard" />;
    }

    return (
      <div className="background">
        <Grid centered columns={3}>
          <Grid.Column width={10}>
            <div className="auth-content">
              <Segment>
                <Image src={logo} centered />
                <Header as="h2" textAlign="center">
                  Login
                </Header>
                <Form className="form-group" onSubmit={this.onSubmit}>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      placeholder="Enter email"
                      type="email"
                      ref="email"
                      required
                      color="white"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      placeholder="Enter password"
                      type="password"
                      id="password"
                      ref="password"
                      required
                    />
                  </Form.Field>
                  <Button type="submit" color="orange" fluid>
                    Login
                  </Button>
                </Form>
              </Segment>
              <Message>
                Don't have an account? <a href="/register">Register</a>
              </Message>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
