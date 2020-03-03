import React from 'react';
import "./Project.css";

const Project = (prop) => {

  return (
    <div className="box">

        <h3>{prop.name}</h3>
        <p>{prop.type}</p>
    </div>
  )
};

export default Project;
