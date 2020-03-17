import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Header from "./header";
import baseURL from "../baseURL";

export default class login extends Component {
  state = {
    isLoggedin: false,
    adminLoggedin: false,
    userEmail: "",
    persons: [],
    name: ""
  };

  onSubmit = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    axios
      .post(baseURL + "login", { email, password })
      .then(res => {
        if (res.data.user) {
          this.setState({
            isLoggedin: true,
            userEmail: email,
            adminLoggedin: res.data.user.isAdmin
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

  /*
  componentWillMount() {
    axios.get("http://localhost:8000/").then(res => {
      if (this.state.isLoggedin) {
        console.log(res.data);
        let persons = res.data;
        console.log(persons);
        this.setState({ persons });
      }
    });
  }*/

  render() {
    if (this.state.isLoggedin) {
      console.log(this.state.userEmail);
      alert("Successfully logged in.");
      sessionStorage.setItem("userEmail", this.state.userEmail);

      //for redirect to admin dashboard when admin logs in
      if (this.state.adminLoggedin) {
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
