import React, {useState} from 'react';
import projectType from "../../enums/projectType.js";
import {Button, Header, Icon, Modal, Form } from 'semantic-ui-react';


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
      trigger={<Button color='orange' onClick={()=>{setOpen(true)}}>New Project</Button>}
      open={open}
      onClose={handleCancel}
      >

    <Header content='New Project' />
    <Modal.Content>
      <Form error={false}>
        <Form.Input
          label='Name'
          name="name"
          placeholder="Enter a name"
          onChange={handleChange}
          value={name}
          required/>
        <Form.Select
          label="Type"
          name="type"
          placeholder="Select a Project Type"
          onChange={handleChange}
          options={projectType}
          required/>
        </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={handleCancel}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' onClick={handleSubmit} disabled={!name || !type}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>

  )

}


export default NewProject;
