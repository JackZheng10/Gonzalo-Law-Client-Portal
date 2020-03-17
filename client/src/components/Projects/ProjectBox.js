import React, {useState} from 'react';
import { Redirect } from "react-router-dom";

import "./Projects.css";

const ProjectBox = (props) => {

const [goToProject, setProject] = useState(false);

const redirect = () =>{
  setProject(true);
}
  if(goToProject){
    return(
      <Redirect to={{
        pathname: "./projects/"+props.project._id,
        state: { project: props.project }
      }}  />
    )
  }
  else{
    return (
      <div className="box" onClick={redirect}>

          <h3>{props.project.name}</h3>
          <p>{props.project.type}</p>
      </div>
    )
  }

};

export default ProjectBox;
