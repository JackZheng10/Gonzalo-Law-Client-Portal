import React, {useState} from 'react';
import { Redirect, useLocation } from "react-router-dom";

import "./Projects.css";

const ProjectBox = (props) => {

const [goToProject, setProject] = useState(false);
const location = useLocation();

const redirect = () =>{
  setProject(true);
}
  if(goToProject){
    return(
      <Redirect push to={{
        pathname: location.pathname + '/' + props.project._id,
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
