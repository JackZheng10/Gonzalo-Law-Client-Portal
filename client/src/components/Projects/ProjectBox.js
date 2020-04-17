import React, {useState} from 'react';
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import { Redirect, useLocation } from "react-router-dom";
import "./Projects.css";

const ProjectBox = (props) => {

const [goToProject, setProject] = useState(false);
const location = useLocation();

const maxPhase = ()=>{
  switch(props.project.type){

    case 'Intellectual Property':
      return IPPhases.size;
    case 'Contract Drafting':
      return CDPhases.size;
    case 'Deal Negotiation':
      return DNPhases.size;
    default:
      return 0;
  }

}

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
      <div className="ui blue link card" onClick={redirect}>
        <div class="content">
          <div class="header">{props.project.name}</div>
          <div class="meta">
            <p>{props.project.type}</p>
          </div>
        </div>
        <div class="extra content">
          <span>
            <i class="check circle outline icon"></i>
            {"Step "+props.project.phase+"/"+maxPhase()}
          </span>
        </div>
      </div>
    )
  }

};

export default ProjectBox;
