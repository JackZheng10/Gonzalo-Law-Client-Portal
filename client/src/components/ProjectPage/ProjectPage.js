import React, { useState, useEffect, Component } from "react";
import ProgressBar from "./ProgressBar";
import NavBar from "../navBar";
import axios from "axios";
import baseURL from "../../baseURL";

const ProjectPage = (props)=>{

  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        axios.defaults.headers.common["token"] = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null;
        var res = await axios.get(baseURL + "getUserProject", {
          params: {
            email: localStorage.getItem("userEmail"),
            uid: props.match.params.uid
          }
        });
        setProject(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProject();
  }, [props.match.params.uid]);

  return(
    <div>
    <NavBar />
    <h2>{project.name}</h2>
    <h3>{project.type}</h3>

    <ProgressBar
        phase={project.phase}
        type={project.type}
        uid={project._id}
        setProject={setProject} />
    </div>
  )
}

export default ProjectPage;
