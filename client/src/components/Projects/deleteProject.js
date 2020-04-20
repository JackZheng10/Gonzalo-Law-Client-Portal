import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../baseURL";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const DeleteProject = (props) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    props.handleDelete(props.projectName, props.userEmail);

    //Delete all the associated files with the project
    const deleteFiles = async () => {
      var res = await axios.get(baseURL + "getFiles", {
        params: {
          email: props.userEmail,
          pname: props.projectName
        }
      });
      res.data.forEach(element => {
        axios.put(baseURL + "deleteFile", {
          params: {
            fileName: element
          }
        });
      });
    };
    deleteFiles();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      trigger={
        <Icon
          name="trash"
          onClick={() => {
            setOpen(true);
          }}
        />
      }
      size="small"
      open={open}
      onClose={handleClose}
    >
      <Header
        icon="exclamation circle"
        color="orange"
        content="Deleting Client Project"
      />
      <Modal.Content>
        <p>
          Are you sure you want to delete this project? This will be permanent.
          Once deleted, there won't be any records left.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={handleConfirm}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteProject;
