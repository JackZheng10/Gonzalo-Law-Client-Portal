import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./search.js";
import { Redirect } from "react-router-dom";
// import axios from 'axios';

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

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
    ],
    selectedClient: "",
    searchTerm: "",
    hasSelected: false
  };

  handleSearch = term => {
    console.log("Search term: " + term);
    this.setState({ searchTerm: term });
  };

  componentDidMount() {
    //make request to server to retrieve all clients
    //update the state of all clients
    //end name will not be dummy clients
  }

  componentDidUpdate() {
    console.log("Search term in state of dashboard: " + this.state.searchTerm);
    console.log("Selected client in state: " + this.state.selectedClient);
  }

  handleSelected(email) {
    console.log("Selected: " + email);
    this.setState({ selectedClient: email });
    this.setState({ hasSelected: true });
  }

  /*
  clientList = this.state.dummyClients.map(client => {
    return (
      <div class="item">
        <i class="big user icon"></i>
        <div
          class="content"
          style={{ cursor: "pointer" }}
          key={client.email}
          onClick={() => this.handleSelected(client.email)}
        >
          <div class="header">{client.name}</div>
          {client.email}
        </div>
      </div>
    );
  }); */

  clientListRender() {
    //todo: will have to be put in a scrolly view thing*
    return (
      <div class="ui celled list">
        {this.state.dummyClients
          .filter(item => {
            if (this.state.searchTerm.trim() !== "") {
              const regexp = new RegExp(
                escapeRegExp(this.state.searchTerm.trim().toLowerCase())
              );
              if (item) {
                const result = item.name
                  .trim()
                  .toLowerCase()
                  .match(regexp);
                return result && result.length > 0;
              }
              return false;
            }
            return true;
          })
          .map(item => {
            return (
              <div class="item">
                <i class="big user icon"></i>
                <div
                  class="content"
                  style={{ cursor: "pointer" }}
                  key={item.email}
                  onClick={() => this.handleSelected(item.email)}
                >
                  <div class="header">{item.name}</div>
                  {item.email}
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  render() {
    if (this.state.hasSelected) {
      return (
        <Redirect
          to={{
            pathname: "/projects",
            state: { selectedClient: this.state.selectedClient }
          }}
        />
      );
    }

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
            <h1>Client List</h1>
            <Search handleSearch={this.handleSearch} />
            {this.clientListRender()}
            <a className="btn btn-danger btn-block" href="/login">
              Logout{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
