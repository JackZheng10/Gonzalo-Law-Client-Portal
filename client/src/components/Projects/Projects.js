import React, { useState, useEffect } from "react";
import NavBar from "../navBar";
import ProjectList from "./ProjectList.js";
import NewProject from "./NewProject.js";
import axios from "axios";
import baseURL from "../../baseURL";
import jwtDecode from "jwt-decode";
import checkToken from "../checkToken.js";
import { Redirect } from "react-router-dom";

const Projects = (props) => {
  const [data, setdata] = useState([]);
  const [redirect, setredirect] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    /*
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    checkToken().then(response => {
      setredirect(!response);
      alert(!response);
    });*/

    const getProjects = async () => {
      try {
        axios.defaults.headers.common["token"] = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null;
        var res = await axios.get(baseURL + "getUserProjects", {
          params: {
            email: localStorage.getItem("userEmail"),
          },
        });
        setdata(res.data);
        setEmail(localStorage.getItem("userEmail"));
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const addData = (newData: Object) => {
    //always use concat when mutating an array in react, you will run into a world of pain otherwise
    //setdata(data.concat(newData));
    axios({
      method: "post",
      url: baseURL + "addProject",
      data: {
        email: localStorage.getItem("userEmail"),
        project: newData,
      },
    })
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const adminView = () => {
    const data = jwtDecode(localStorage.getItem("token"));

    if (data.isAdmin) {
      return <NewProject addData={addData} />;
    }
  };

  const handleRerender = async () => {
    try {
      axios.defaults.headers.common["token"] = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
      var res = await axios.get(baseURL + "getUserProjects", {
        params: {
          email: localStorage.getItem("userEmail"),
        },
      });
      setdata(res.data);
      setEmail(localStorage.getItem("userEmail"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <h2 className="ui center aligned header basic segment">Projects</h2>

      <div className="ui grid">
        <div className="ui ten wide centered column">
          {adminView()}
          <ProjectList
            data={data}
            userEmail={email}
            handleRerender={handleRerender}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
