import React, { useState, useEffect, Component } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";
import axios from "axios";

let baseURL = "http://localhost:8000/api/";
var temp = [
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
];

const ProjectPage = (props)=> {

    const [data, setdata] = useState(sessionStorage.getItem('projects') | []);

    useEffect(() => {

      axios({
          method: 'get',
          url: baseURL + "getUserProjects",
          data: {
              email: props.location.state ? props.location.state.selectedClient : sessionStorage.getItem("userEmail")
              }
          }
      ).then((resp)=>{
        console.log(resp.data);
        sessionStorage.setItem('projects', resp.data);
      });

    });

    const [adminView, setadminView]= useState(false);


  const addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
     setdata(data.concat(newData));
  };

  //need to render differently since now it grabs the email passed in from admin dashboard-
  //but thats not available if a normal user selects to view their projects


    if (props.location.state) {
      return (
        <div>
          <NewProject addData={addData} />
          <h3>
            {props.location.state.selectedClient}
          </h3>
          <a className="btn btn-danger btn-block" href="/login">
            Logout{" "}
          </a>
          <ProjectList data={data} />
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            {sessionStorage.getItem("userEmail")}
          </h3>
          <a className="btn btn-danger btn-block" href="/login">
            Logout{" "}
          </a>
          <ProjectList data={data} />
        </div>
      );
    }

}

export default ProjectPage;
