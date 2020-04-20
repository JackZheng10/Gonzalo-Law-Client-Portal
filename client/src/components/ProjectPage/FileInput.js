import React, { useState, useEffect} from "react";
import "./FileList";
import {Button, Rail, Icon} from 'semantic-ui-react';

const FileInput = (props) => {

    const [done, setDone] = useState(true);

    const handleClick = ()=>{
      document.getElementById('upload-file').click();
    };

    const handleSubmit = async (event) => {
      //const url = 'http://example.com/file-upload';
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
