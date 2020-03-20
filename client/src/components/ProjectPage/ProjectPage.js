import React, { useState, useEffect, Component } from "react";
import ProgressBar from "./ProgressBar"
const ProjectPage = (props)=>{
  return(
    <div>

    <p>{props.location.state.project.name}</p>
    <p>{props.location.state.project.type}</p>

    <ProgressBar project={props.location.state.project} />
    </div>
  )
}

export default ProjectPage;
