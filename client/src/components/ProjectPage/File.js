import React, {useState} from 'react';
// import {
//   Linking
// } from 'react-native';

import {List, Button } from 'semantic-ui-react'

const File = (props)=>{
  const files = [];

  // const openURL = (url) => {
  //   Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  // }
  
  console.log(props.data);
  for(let i = 0; i<props.data.length; i++){  
        const path = props.data[i].split('/');
        const name = path[path.length - 1];
        const link = 'https://storage.googleapis.com/gonzl-2/' + props.data[i].toString();

        files.push(<List.Item>
                      <List.Content>
                        {name}
                      </List.Content>
                      <List.Content floated='right'>
                        <a href={link} target = '_blank'> Link </a>
                      </List.Content>
                    </List.Item>);
  }

  return(
    <div>            
      <List divided verticalAlign = 'middle'>
        {files}
      </List>
    </div>
  )
}

export default File;
