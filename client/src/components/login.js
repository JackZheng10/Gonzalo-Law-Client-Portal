import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Header from "./header";
import baseURL from "../baseURL";
import jwtDecode from "jwt-decode";
import checkToken from "./checkToken.js";

export default class login extends Component {
  state = {
    isLoggedin: false,
    adminLoggedin: false,
    userEmail: "",
    persons: [],
    name: "",
    userData: {},
    redirect: false
  };

  componentDidMount() {
    checkToken().then(response => {
      this.setState({ redirect: response });
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    axios
      .post(baseURL + "login", { email, password })
      .then(async res => {
        if (res.data.success) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          //axios.defaults.headers.common["token"] = token;
          const data = jwtDecode(token);
          //alert(JSON.stringify(data));
          //await checkToken();

          this.setState({
            isLoggedin: true,
            userData: data
          });
        }
        if (res.data.error || res.error) {
          alert(res.data.error, res.error);
        }
      })
      .catch(error => {
        alert(error.response);
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
        return <Redirect to="/projects" />;
      }

      //return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <Header />
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">Login</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    typeof="email"
                    id="email"
                    ref="email"
                    required
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    ref="password"
                    required
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <button
                  typeof="submit"
                  className="btn btn-primary btn-block loginBTN"
                >
                  Login
                </button>
              </form>
              <p className="lead mt-4">
                Don't have an account? <a href="/register">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
