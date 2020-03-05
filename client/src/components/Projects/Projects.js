import React, {useState} from 'react';
import Project from "./Project.js";
import NewProject from "./NewProject.js"

const Projects = (props)=>{

  const [modalIsOpen, setModal] = useState(false);
  const {data} = props.location.state;
  const updateModal = (state : bool)=>{
    setModal(state);

  }
  const
  addData = (newData: Object)=>{
    data.push(newData);
  }

  const cards = [];

  if(data){
    for(let i = 0; i<data.length; i++){
      cards.push(<Project
                  name = {data[i].name}
                  type = {data[i].type}/>)
    }
  }



  return(

    <div>
      <button onClick={() => setModal(true)}> New Project </button>
      <NewProject
      isOpen = {modalIsOpen}
      setOpen ={updateModal}
      addData = {addData}
      />
      <br />
      {cards}
    </div>
  )
}

export default Projects;
