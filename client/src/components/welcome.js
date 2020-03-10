import React, { Component } from "react";
import "./styles.css";
import Header from "./header";

export default class welcome extends Component {
  /* make payment button
<form
              action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
              method="post"
              name="PrePage"
            >
              <input
                name="LinkId"
                type="hidden"
                value="ea28c130-eb6e-4e1a-a841-f179279b5b0f"
              ></input>{" "}
              <input
                type="submit"
                value="Make a Payment to Gonzalo Law"
              ></input>
            </form>
  */
  render() {
    return (
      <div>
        <Header/>
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
      </div>
    );
  }
}
