import React, {useState} from 'react';
import projectType from "../../enums/projectType.js";
import {Dropdown, Button, Header, Icon, Modal } from 'semantic-ui-react';

const NewProject= (props)=>{

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);


  const handleChange = (e, data)=>{
      if(e.target.name==="name")
        setName(e.target.value);
      else if(data.name ==="type")
        setType(data.value);
  }

  const handleSubmit = ()=>{

    props.addData(
      {name: name,
      type: type}
    );
    setOpen(false);
    setName("");
    setType("");

  }

  const handleCancel = ()=>{
    setOpen(false);
    setName("");
    setType("");

  }

  return(
    <Modal
      trigger={<Button onClick={()=>{setOpen(true)}}>New Project</Button>}
      open={open}
      onClose={handleCancel}
      >

    <Header content='New Project' />
    <Modal.Content>
    <div className="required field ui input">
      <label>Name</label>
      <input type="text" placeholder="Enter a name" name="name" value={name} onChange={handleChange} required />
    </div>
    <div className="required field">
      <label>Type</label>
        <Dropdown
          name="type"
          placeholder="Select a Project Type"
          onChange={handleChange}
          options={projectType}
          required
          label='Required Dropdown'
          />

    </div>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={handleCancel}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' onClick={handleSubmit}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>

  )

}


export default NewProject;
