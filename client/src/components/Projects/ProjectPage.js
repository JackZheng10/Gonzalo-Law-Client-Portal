import React, { useState, useEffect, Component } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";
import axios from "axios";
import NavBar from "../navBar";

//heroku: baseURL = "/api/";
//local: baseURL = "http://localhost:8000/api/";

let baseURL = "/api/";
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

const ProjectPage = props => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        var res = await axios.get(baseURL + "getUserProjects", {
          params: {
            email: props.location.state
              ? props.location.state.selectedClient
              : sessionStorage.getItem("userEmail")
          }
        });
        setdata(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const [adminView, setadminView] = useState(false);

  const addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    //setdata(data.concat(newData));
    axios({
      method: "post",
      url: baseURL + "addProject",
      data: {
        email: props.location.state
          ? props.location.state.selectedClient
          : sessionStorage.getItem("userEmail"),
        project: newData
      }
    })
      .then(res => {
        setdata(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //TODO: handle direct from calendar back to project page, since it'll treat admin as a user
  //TODO: handle calendar page for admin vs user

  if (props.location.state) {
    return (
      <div>
        <NavBar />
        <NewProject addData={addData} />
        <h3>{props.location.state.selectedClient}</h3>
        <a className="ui red button" href="/login">
          Logout{" "}
        </a>
        <ProjectList data={data} />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <h3>{sessionStorage.getItem("userEmail")}</h3>
        <div className="box-section">
          <h1> Current Projects:</h1>
          <ProjectList data={data} />
        </div>
      </div>
    );
  }
};

export default ProjectPage;
