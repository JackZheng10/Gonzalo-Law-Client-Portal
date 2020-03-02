import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./styles.css";

export default class Register extends Component {
  state = {
    isRegistered: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.name.value;

    axios
      .post("http://localhost:8000/register", { email, password, name })
      .then(res => {
        if (res.data.email) {
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

    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  ref="email"
                  required
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  id="name"
                  ref="name"
                  required
                  className="form-control"
                  placeholder="Enter name"
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
                  placeholder="Create password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block registerBTN"
              >
                Register
              </button>
            </form>
            <p className="lead mt-4">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
