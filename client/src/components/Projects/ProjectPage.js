import React, {useState} from 'react';
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js"


const ProjectPage = ()=> {

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

  const addData = (newData: Object)=>{

    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    setData(data.concat(newData));
  }


  return(
    <div>
    <NewProject
      addData = {addData}
    />
    <ProjectList
      data = {data}
    />
    </div>
  )
}

export default ProjectPage;
