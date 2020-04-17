import React, { useState, useEffect, Component, useRef } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import "./FileInput.css";
import baseURL from "../../baseURL";
import "./FileList";
import {Button} from 'semantic-ui-react';


//Referenced from: https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: null}
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.fileInput = this.fileInput.bind(this); //fileUpload

    }

    //onFormSubmit, console.log is for debug purposes
    onFormSubmit(event) {
      event.preventDefault();
      this.fileInput(this.state.file);
      //.then((response)=>{
      //  console.log(response.data);
      // })
    }


    onChange(event) {
      this.setState({file:event.target.files[0]});
    }

    fileInput(file){
      //const url = 'http://example.com/file-upload';
      const formData = new FormData();
      formData.append('file',file);
      formData.append('pname', props.name);
      // const config = {
      //     headers: {
      //         'content-type': 'multipart/form-data'
      //     }
      // }
      //return  post(url, formData,config)

//            axios.put(URL, data, config);

      //axios.defaults.headers.common["token"] = localStorage.getItem("token")
      //? localStorage.getItem("token")
      //: null;
      
      axios
      .put(baseURL+ "upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {name: props.name, email: localStorage.getItem('userEmail')}
      })
      .then(res => {
          console.log('tried upload file')
      })
      .catch(error => {
        console.log(error);
      });


    }
    //   const size =  data.size;
    //   //console.log(this.fileInput.current.files[0].size)
    //   const URL = 'https://storage.googleapis.com/upload/storage/v1/b/gonzl-2/o';
    //   const config = {
    //     headers: {
    //     }
    //   }




/*
    <form onSubmit={this.handleSubmit}>
    <label className = "file-form">
      Upload file:
      <input type="file" ref={this.fileInput} />
    </label>
    <br />
    <button type="submit" className = "submit">Submit</button>
  </form>
  */
/* 
    render() {
      return (
        <div>
          <input type="file" class = 'inputFile' id = 'embedFileInput'/>
          <Button positive floated = 'right' role = 'embedFileInput'> <i class="ui upload icon"></i>  Upload File </Button>
        </div>
      );
    }
*/

    render() {
      return (
        <div>
          <input type="file" class="inputFile" id="embedInput" onChange={this.onChange}/>
            <label for="embedInput" class="ui huge green right floated button">
              <i class="ui upload icon"></i> 
                Choose File
            </label>
            <div class = 'upld'>
            <button class="ui button" onClick = {this.onFormSubmit}> Upload </button>
            </div>
        </div>
        );
    }

  }

  ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );

  export default FileInput;
