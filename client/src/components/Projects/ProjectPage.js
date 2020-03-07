import React, { useState } from "react";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";

const ProjectPage = props => {
  const [data, setData] = useState([
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
    }
  ]);

  const addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    setData(data.concat(newData));
  };

  //still need conditon to only show add project button if you are an admin

  return (
    <div>
      <NewProject addData={addData} />
      <h1>Projects for: {props.location.state.selectedClient}</h1>
      <ProjectList data={data} />
    </div>
  );
};

export default ProjectPage;
