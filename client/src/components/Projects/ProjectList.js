import React, { useState } from "react";
import ProjectBox from "./ProjectBox.js";

const ProjectList = (props) => {
  const cards = [];

  for (let i = 0; i < props.data.length; i++) {
    cards.push(
      <ProjectBox
        project={props.data[i]}
        key={props.data[i]._id}
        userEmail={props.userEmail}
        handleRerender={props.handleRerender}
      />
    );
  }

  return <div className="ui cards">{cards}</div>;
};

export default ProjectList;
