import React, { useState, useEffect, Component } from "react";

const ProjectPage = (props)=>{
  return(
    <div>

    <p>{props.location.state.project.name}</p>
    <p>{props.location.state.project.type}</p>
    </div>
  )
}

export default ProjectPage;
