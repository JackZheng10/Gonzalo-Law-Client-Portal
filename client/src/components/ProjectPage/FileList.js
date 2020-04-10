import React, {useState, useEffect} from 'react';
import {List } from 'semantic-ui-react'
import axios from 'axios'
import baseURL from "../../baseURL";
import File from "./File"

const FileList = (props => {
    const [fileView, setfileView] = useState([]);

   useEffect(() => {
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
        viewFiles();
    }, [props]);


    return (
        <div>
            <File data = {fileView}/>
        </div>
    )
})

export default FileList;