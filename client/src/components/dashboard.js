import React, { Component } from "react";
// import axios from 'axios';

export default class dashboard extends Component {
  state = {
    userEmail: "",
    name: "",
    persons: ["email", "name", "password"]
  };

  componentDidMount() {
    const userEmail = sessionStorage.getItem("userEmail");
    //todo later: remove from session storage on logout (FOR ALL DASHBOARDS/HOMES)
    //todo later: if visiting a pg without needed thing, display something else
    //ex: dashboard without session storage of user that came from logging in

    //currently not used, since not set in login component
    const name = sessionStorage.getItem("name");

    this.setState({
      userEmail: userEmail,
      name: name
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"> Dashboard</h1>

            <br />
            <h1 className="lead mb-3">
              Welcome <span> </span>
              <strong>{this.state.userEmail}</strong>
            </h1>
            <br />
            <a className="btn btn-danger btn-block" href="/projects">
              {" "}
              Projects
            </a>
            <br />
            <a className="btn btn-danger btn-block" href="/login">
              Logout{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
