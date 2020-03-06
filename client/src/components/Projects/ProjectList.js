import React, {useState} from 'react';
import Project from "./Project.js";

const ProjectList = (props)=>{


  const cards = [];


  for(let i = 0; i<props.data.length; i++){
    cards.push(<Project
                name = {props.data[i].name}
                type = {props.data[i].type}/>)
  }


  return(

    <div>
      {cards}
    </div>
  )
}

export default ProjectList;
