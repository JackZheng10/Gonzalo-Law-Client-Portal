import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';

export default class admin extends Component {
  state = {
    dummyClients: [
      //will be different structure depending on final user schema/needs
      {
        name: "client 1",
        email: "client1@gmail.com"
      },
      {
        name: "client 2",
        email: "client2@gmail.com"
      },
      {
        name: "client 3",
        email: "client3@gmail.com"
      }
    ]
  };

  componentDidMount() {
    //make request to server to retrieve all clients
    //update the state of all clients
    //end name will not be dummy clients
  }

  clientList = this.state.dummyClients.map(client => {
    return (
      <div class="item">
        <i class="big user icon"></i>
        <div class="content">
          <div class="header">{client.name}</div>
          Email: {client.email}
        </div>
      </div>
    );
  });

  render() {
    return (
      <div>
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"> Dashboard</h1>
            <br />
            <h1 className="lead mb-3">
              Welcome
              <strong> Admin</strong>
            </h1>
            <h1>Client list:</h1>
            <div class="ui celled list">{this.clientList}</div>
            <a className="btn btn-danger btn-block" href="/login">
              Logout{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
