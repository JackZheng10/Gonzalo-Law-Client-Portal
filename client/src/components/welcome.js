import React, { Component } from "react";
import "./styles.css";

export default class welcome extends Component {
  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body text-center">
            <p>Welcome! Please log in or register for an account.</p>
            <a
              href="/register"
              className="btn btn-primary btn-block mb-2 registerBTN"
            >
              Register{" "}
            </a>
            <a href="/login" className="btn btn-secondary btn-block loginBTN">
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}
