import React, { useState, useEffect } from 'react';
// import {
//   Linking
// } from 'react-native';

import { List, Button } from 'semantic-ui-react'

const File = (props) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const files = [];
      props.data.forEach(element => {
        const path = element.split('/');
        const name = path[path.length - 1];
        const link = 'https://storage.googleapis.com/gonzl-2/' + element.toString();

        files.push(<List.Item>
          <List.Content>
            <a href={link} target='_blank'>
              {name}
            </a>
          </List.Content>
          <List.Content floated='right'>
            <Button key={element} onClick={() => { props.setRemove(element) }}> Delete </Button>
          </List.Content>
        </List.Item>);
      });
      setFiles(files);
    }
    getFiles();
  }, [props]);

  //    <List divided verticalAlign = 'middle'>
  return (
    <div>
      <List divided verticalAlign='middle'>
        {files}
      </List>
    </div>
  )
}

export default File;
