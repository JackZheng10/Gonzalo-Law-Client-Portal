import React, { useState, useEffect } from 'react';
import DeleteFile from './deleteFile.js';
import { List } from 'semantic-ui-react';
import jwtDecode from "jwt-decode";



const File = (props) => {

  const files = [];
    const data = jwtDecode(localStorage.getItem("token"));
    const getFiles = async () => {

      props.data.forEach(element => {
        const path = element.split('/');
        const name = path[path.length - 1];
        const link = 'https://storage.googleapis.com/gonzl-2/' + element.toString();

        files.push(<List.Item key={element.toString()}>
          <List.Content floated='right'>
            {(data.isAdmin) ? (<DeleteFile setRemove={props.setRemove} file={element} />) : ''}
          </List.Content>
          <List.Content onClick={() => { window.location.href = link }}>
            <List.Header>
              {name}
            </List.Header>
          </List.Content>
        </List.Item>);
      });
    }
    getFiles();
  
  return (
    <div>
      <List selection divided verticalAlign='middle'>
        {files}
      </List>
    </div>
  )
}

export default File;
