import React, { useState, Component } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";

export default class projectpage extends Component {
  state = {
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
    ],
    adminView: false
  };

  addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    this.setState({ data: this.state.data.concat(newData) });
  };

  //still need conditon to only show add project button if you are an admin

  //need to render differently since now it grabs the email passed in from admin dashboard-
  //but thats not available if a normal user selects to view their projects

  render() {
    if (this.props.location.state) {
      return (
        <div>
          <NewProject addData={this.addData} />
          <h1>
            Projects for (admin view):{" "}
            {this.props.location.state.selectedClient}
          </h1>
          <ProjectList data={this.state.data} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            Projects for (user view): {sessionStorage.getItem("userEmail")}
          </h1>
          <ProjectList data={this.state.data} />
        </div>
      );
    }
  }
}
