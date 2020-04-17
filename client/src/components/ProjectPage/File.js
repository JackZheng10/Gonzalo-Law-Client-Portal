import React, {useState, useEffect} from 'react';
// import {
//   Linking
// } from 'react-native';

import {List, Button } from 'semantic-ui-react'

const File = (props)=>{
  const files = [];



    console.log(props.data);
    for(let i = 0; i<props.data.length; i++){
          const path = props.data[i].split('/');
          const name = path[path.length - 1];
          const link = 'https://storage.googleapis.com/gonzl-2/' + props.data[i].toString();

          files.push(<List.Item>
                        <List.Content>
                        <a href={link} target = '_blank'>
                          {name}
                        </a>
                        </List.Content>
                        <List.Content floated='right'>
                           <Button> Delete </Button> 
                        </List.Content>
                      </List.Item>);
    }

//    <List divided verticalAlign = 'middle'>
  return(
    <div>            
      <List divided>
        {files}
      </List>
    </div>
  )
}

export default File;
