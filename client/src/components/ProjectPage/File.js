import React from 'react';
import DeleteFile from './deleteFile.js';
import {List} from 'semantic-ui-react';
import jwtDecode from "jwt-decode";

const File = (props)=>{

  const data = jwtDecode(localStorage.getItem("token"));
  const files = [];

    for(let i = 0; i<props.data.length; i++){
          const path = props.data[i].split('/');
          const name = path[path.length - 1];
          const link = 'https://storage.googleapis.com/gonzl-2/' + props.data[i].toString();

          files.push(<List.Item key={props.data[i].toString()}>
                        <List.Content floated='right'>
                           {(data.isAdmin) ?(<DeleteFile setRemove={props.setRemove} file = {props.data[i]} />):'' }
                        </List.Content>
                        <List.Content onClick = {() =>{window.location.href =link}}>
                          <List.Header>
                          {name}
                          </List.Header>
                        </List.Content>

                      </List.Item>);
    }

//    <List divided verticalAlign = 'middle'>

  return(
    <div>
      <List selection divided verticalAlign = 'middle'>
        {files}
      </List>
    </div>
  )
}

export default File;
