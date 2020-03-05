import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';

export default class admin extends Component {
  render() {
    return (
      <div>
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"> Dashboard</h1>

            <br />
            <h1 className="lead mb-3">
              Welcome <span> </span>
              <strong>Admin</strong>
            </h1>
            <br />
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
