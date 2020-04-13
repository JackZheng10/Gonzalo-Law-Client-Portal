import React, {useState} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';


const DeleteClient = (props)=>{

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    props.handleDelete(props.id);
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  return(
    <Modal trigger={<Icon name="trash" onClick={()=>{setOpen(true)}} />} size='small'
           open={open}
           onClose={handleClose}>
      <Header icon='exclamation circle' color='orange' content='Deleting Client' />
      <Modal.Content>
        <p>
          Are you sure you want to delete this client? This will be permanent, once deleted, there won't be any records left.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={handleClose}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={handleConfirm}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>

  )

}


export default DeleteClient;
