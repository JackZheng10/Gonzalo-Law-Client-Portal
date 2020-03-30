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

    /*****************FILE UPLOADS****************/

    const filePath = '../../dummyFiles/working.jpg'
    const fileS = filePath.split('/');
    const indx = fileS.length - 1;
    const filename = fileS[indx];
    /*
    axios
    .get(baseURL + "upload", {
      params: {
        email: sessionStorage.getItem("userEmail"),
        filename: filename,
        path: filePath
      }
    })
    .catch(error => {
      alert(error);
    });
    */
    /*******************VIEW FILES ************/
    axios
    .get(baseURL + "getFiles", {
      params: {
        email: sessionStorage.getItem("userEmail")
      }
    })

    axios
    .get(baseURL + "download", {
      params: {
        filename: 'dummy.pdf'
      }
    })

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
