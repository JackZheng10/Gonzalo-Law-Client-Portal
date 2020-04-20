import React, { useState, useEffect, Component } from "react";
import ProgressBar from "./ProgressBar";
import FileList from "./FileList";
import NavBar from "../navBar";
import axios from "axios";
import baseURL from "../../baseURL";
import jwtDecode from "jwt-decode";

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

    /******************FILE DOWNLOADS****************/
    // axios
    // .get(baseURL + "download", {
    //   params: {
    //     filename: 'dummy.pdf'
    //   }
    // })

  }, [props.match.params.uid]);

  return(
    <div >
      <NavBar />
      <div className="ui padded grid">
        <div className="five wide centered column">
          <h2 className="ui center aligned dividing header">
            <div className="content">{project.name}
              <div className="sub header">{project.type}</div>
            </div>
          </h2>
        </div>
        <div className="fourteen wide centered column">
        <ProgressBar
            phase={project.phase}
            type={project.type}
            uid={project._id}
            setProject={setProject} />
        </div>
        <div className ="ten wide centered column">
        <h3 className="ui header"> Files </h3>
        <FileList email={localStorage.getItem("userEmail")} pname ={project.name}/>
        </div>
      </div>
    </div>

  )
}

export default ProjectPage;
