import React, { useState, useEffect, Component } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import baseURL from "../../baseURL";

const ProjectPage = (props)=>{

  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        var res = await axios.get(baseURL + "getUserProject", {
          params: {
            email: sessionStorage.getItem("userEmail"),
            uid: props.match.params.uid
          }
        });
        setProject(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProject();
  }, []);

  return(
    <div>

    <p>{project.name}</p>
    <p>{project.type}</p>
    <ProgressBar
        phase={project.phase}
        type={project.type}
        uid={project._id}
        setProject={setProject} />
    </div>
  )
}

export default ProjectPage;
