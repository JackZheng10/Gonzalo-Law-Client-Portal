import React, {useState, useEffect} from 'react';
import {List } from 'semantic-ui-react';
import axios from 'axios';
import baseURL from "../../baseURL";
import File from "./File";
import FileInput from "./FileInput";


const FileList = (props => {
    const [fileView, setfileView] = useState([]);
    const [remove, setRemove] = useState("");

    useEffect(() => {
        viewFiles();
    }, [props, remove]);

    useEffect(() => {
        const deleteFile = async () => {
            axios.defaults.headers.common["token"] = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : null;
            var res = await axios.put(baseURL + "deleteFile", {
                params: {
                    fileName: remove
                }
            });
        }
        if (remove !== "")
        {
            deleteFile();
            viewFiles();
        }


    }, [remove])

    const viewFiles = async () => {
        axios.defaults.headers.common["token"] = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
        var res = await axios.get(baseURL + "getFiles", {
        params: {
            email: props.email,
            pname: props.pname
        }
        });
        setfileView(res.data);
    };

    const uploadFile = async (file)=>{
      axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

      await axios
      .put(baseURL+ "upload", file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).catch(error => {
        console.log(error);
      });

      viewFiles();

    }

    return (
        <div>
            <File data = {fileView} setRemove = {setRemove}/>
            <FileInput name = {props.pname} uploadFile = {uploadFile}/>

        </div>
    )
})

export default FileList;
