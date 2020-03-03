import React from 'react';
import Project from "./Project.js";

const Projects = ()=>{

  const data = [
    {
      name: "example 1",
      type: "type 1"
    },
    {
      name: "example 2",
      type: "type 2"
    },
    {
      name: "example 3",
      type: "type 3"
    },
    {
      name: "example 4",
      type: "type 4"
    },

  ];

  const cards = [];
  for(let i = 0; i<data.length; i++){
    cards.push(<Project
                name = {data[i].name}
                type = {data[i].type}/>)
  }

  return(

    <div>
      <button> New Project </button>
      <br />
      {cards}
    </div>
  )
}

export default Projects;
