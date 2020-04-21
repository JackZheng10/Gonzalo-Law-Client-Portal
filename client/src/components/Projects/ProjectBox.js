import React, { useState } from "react";
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import { Redirect, useLocation } from "react-router-dom";
import DeleteProject from "./deleteProject";
import jwtDecode from "jwt-decode";
import axios from "axios";
import baseURL from "../../baseURL";
import "./Projects.css";

const ProjectBox = (props) => {
  const [goToProject, setProject] = useState(false);
  const location = useLocation();

  const renderDelete = () => {
    const data = jwtDecode(localStorage.getItem("token"));

    if (data.isAdmin) {
      return (
        <DeleteProject
          projectID={props.project._id}
          projectName={props.project.name}
          userEmail={props.userEmail}
          handleDelete={handleDeleteProject}
        />
      );
    }
  };

  const handleDeleteProject = (projectID, userEmail) => {
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    axios
      .post(baseURL + "deleteUserProject", { projectID, userEmail })
      .then((res) => {
        if (res.data.success) {
          props.handleRerender();
        } else {
          //console.log("Project could not be deleted.");
          console.log("Error with deleting project: " + res.data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  const maxPhase = () => {
    switch (props.project.type) {
      case "Intellectual Property":
        return IPPhases.size;
      case "Contract Drafting":
        return CDPhases.size;
      case "Deal Negotiation":
        return DNPhases.size;
      default:
        return 0;
    }
  };

  const redirect = () => {
    setProject(true);
  };

  if (goToProject) {
    return (
      <Redirect
        push
        to={{
          pathname: location.pathname + "/" + props.project._id,
        }}
      />
    );
  } else {
    return (
      <div className="ui blue link card">
        <div className="content" onClick={redirect}>
          <div className="header">{props.project.name}</div>
          <div className="meta">
            <p>{props.project.type}</p>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="check circle outline icon"></i>
            {"Phase " + props.project.phase + "/" + maxPhase()}
          </span>
          <div className="right floated content">{renderDelete()}</div>
        </div>
      </div>
    );
  }
};

export default ProjectBox;
