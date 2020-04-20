import React, { useState, useEffect, Component, useRef } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import "./FileInput.css";
import baseURL from "../../baseURL";
import "./FileList";
import {Button} from 'semantic-ui-react';



class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: null, fileName: ''}
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.fileInput = this.fileInput.bind(this); 
    }

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
      const formData = new FormData();
      formData.append('file',file);
      formData.append('pname', this.props.name);
      formData.append('email', localStorage.getItem('userEmail'));
 
      axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
      
      axios
      .put(baseURL+ "upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(res => {
          console.log('tried upload file')
      })
      .catch(error => {
        console.log(error);
      });


    }
  
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
      const { fileName} = this.state;
      let file = null;
      file = fileName 
      ? ( <span>File Selected - {fileName}</span>) 
      : ( <span>Choose a file...</span> );

      return (
        <div>
          <div class = 'chooseFile'>
          <input type="file" class="inputFile" id="embedInput" onChange={this.onChange}/>
            <label htmlFor="embedInput" class="ui huge green button">
            <i class="ui upload icon"></i> 
                Choose File
            </label>
          </div>

            <div class = 'upld'>
              <button class="ui button" onClick = {this.onFormSubmit}> Upload </button>
            </div>
            <div class = 'fle'>
              <label htmlFor="file">{file}</label>
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
