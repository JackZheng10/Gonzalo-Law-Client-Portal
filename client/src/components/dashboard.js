import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';

export default class dashboard extends Component {
  state = {
    user: "",
    name: "",
    persons: ["email", "name", "password"],
    data: [
      {
        name: "example 1",
        type: "type 1"
      },
      {
        name: "example 2",
        type: "type 2"
      },
      {
        name: "example 3",
        type: "type 3"
      },
      {
        name: "example 4",
        type: "type 4"
      }
    ]
  };
  componentDidMount() {
    const userEmail = localStorage.getItem("userEmail");

    //currently not used, since not set in login component
    const name = localStorage.getItem("name");

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
            <Link
              className="btn btn-danger btn-block"
              to={{
                pathname: "/projects",
                state: {
                  data: this.state.data
                }
              }}
            >
              {" "}
              Projects
            </Link>
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
