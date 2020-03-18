import React, { useState, useEffect, Component } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";
import axios from "axios";
import NavBar from "../navBar";
import baseURL from "../../baseURL";

const Projects = props => {
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
        <div>
          <NewProject addData={addData} />
          <h3>{props.location.state.selectedClient}</h3>
        </div>
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

export default Projects;
