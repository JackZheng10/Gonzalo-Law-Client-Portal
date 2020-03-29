import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";
import axios from "axios";
import NavBar from "../navBar";
import baseURL from "../../baseURL";
import checkToken from "../checkToken.js";
import { Redirect } from "react-router-dom";

const Projects = props => {
  const [data, setdata] = useState([]);
  const [redirect, setredirect] = useState(true);

  useEffect(() => {
    /*
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    checkToken().then(response => {
      setredirect(!response);
      alert(!response);
    });*/

    const getProjects = async () => {
      try {
        var res = await axios.get(baseURL + "getUserProjects", {
          params: {
            email: sessionStorage.getItem("userEmail")
          }
        });
        setdata(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    //setdata(data.concat(newData));
    axios({
      method: "post",
      url: baseURL + "addProject",
      data: {
        email: sessionStorage.getItem("userEmail"),
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

  const adminView = () => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      return <NewProject addData={addData} />;
    }
  };

  return (
    <div>
      <NavBar />
      <h3>{sessionStorage.getItem("userEmail")}</h3>
      {adminView()}
      <div className="box-section">
        <h1> Current Projects:</h1>
        <ProjectList data={data} />
      </div>
    </div>
  );
};

export default Projects;
