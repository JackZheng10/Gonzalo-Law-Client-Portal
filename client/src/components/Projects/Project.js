import React from 'react';
import "./Project.css";

const Project = (props) => {

  return (
    <div className="box">

        <h3>{props.name}</h3>
        <p>{props.type}</p>
    </div>
  )
};

export default Project;
