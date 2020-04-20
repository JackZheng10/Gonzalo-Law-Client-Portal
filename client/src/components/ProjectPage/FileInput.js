import React, { useState, useEffect} from "react";
import "./FileList";
import {Button, Rail, Icon} from 'semantic-ui-react';

const FileInput = (props) => {

    const [done, setDone] = useState(true);

    const handleClick = ()=>{
      document.getElementById('upload-file').click();
    };
/*
    //onFormSubmit, console.log is for debug purposes
    onFormSubmit(event) {
      event.preventDefault();
      this.fileInput(this.state.file);
      window.location.reload(false);
 
    }


    onChange(event) {
      this.setState({file:event.target.files[0]});
      this.setState({ fileName: event.target.files[0].name});

    }

    fileInput(file){
*/
    const handleSubmit = async (event) => {
      setDone(false);
      const formData = new FormData();
      formData.append('file',event.target.files[0]);
      formData.append('pname', props.name);
      formData.append('email', localStorage.getItem('userEmail'));

      try{
        await props.uploadFile(formData);
        setDone(true);
      }
      catch(error){
        console.log(error);
      }

    };

  return (
    <Rail position='right' close dividing>
    <input id="upload-file" hidden type="file" onChange={handleSubmit} />

    <Button
      color="green"
      onClick={handleClick}>
      <Icon
      loading={!done}

      name={done ? "upload" : "circle notch"} />
      Upload</Button>

    </Rail>
    );

}

  export default FileInput;
