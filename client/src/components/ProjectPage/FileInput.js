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
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
      this.files = null;

    }
    handleSubmit(event) {
      event.preventDefault();
      const data = this.fileInput.current.files[0];
    //   const size =  data.size;
    //   //console.log(this.fileInput.current.files[0].size)
    //   const URL = 'https://storage.googleapis.com/upload/storage/v1/b/gonzl-2/o';
    //   const config = {
    //     headers: {
    //     }
    //   }

    //   axios.put(URL, data, config);

    //       axios.defaults.headers.common["token"] = localStorage.getItem("token")
    //   ? localStorage.getItem("token")
    //   : null;
    //   axios
    //   .put(baseURL+ "upload", {
    //   params:
    //      {
    //       email:'anything'
    //     },
    //     file: this.fileInput.current.files[0]
    //   })
    //     .then(res => {
    //         console.log('tried upload file')
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });

    }
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
    render() {
      return (
        <div>
          <input type="file" class = 'inputFile'/>
          <Button positive floated = 'right'><i class="ui upload icon"></i>  Upload File </Button>
        </div>
      );
    }
  }

  ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );

  export default FileInput;
