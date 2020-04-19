import React, { useState } from "react";
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import { Redirect, useLocation } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
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
          userEmail={props.userEmail}
          handleDelete={handleDeleteProject}
        />
      );
    }
  };

  const handleDeleteProject = (projectID, userEmail) => {
    console.log("id: " + projectID);
    console.log("user email: " + userEmail);
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    axios
      .post(baseURL + "deleteUserProject", { projectID, userEmail })
      .then((res) => {
        if (res.data.success) {
          console.log("Project deleted successfully.");
          props.handleRerender();
        } else {
          console.log("Project could not be deleted.");
          console.log("Error: " + res.data.message);
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
        <div class="content" onClick={redirect}>
          <div class="header">{props.project.name}</div>
          <div class="meta">
            <p>{props.project.type}</p>
          </div>
        </div>
        <div class="extra content">
          <span>
            <i class="check circle outline icon"></i>
            {"Step " + props.project.phase + "/" + maxPhase()}
          </span>
          <div className="right floated content">{renderDelete()}</div>
        </div>
      </div>
    );
  }
};

export default ProjectBox;
