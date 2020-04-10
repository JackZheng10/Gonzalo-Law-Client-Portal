import React, { useState, useEffect } from "react";
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import {Icon, Button, Popup } from 'semantic-ui-react';
import jwtDecode from "jwt-decode";
import axios from "axios";
import baseURL from "../../baseURL";
import "./ProgressBar.css";

const ProgressBar = (props)=>{

  const maxPhase = ()=>{
    switch(props.type){

      case 'Intellectual Property':
        return IPPhases.size;
      case 'Contract Drafting':
        return CDPhases.size;
      case 'Deal Negotiation':
        return DNPhases.size;
      default:
        return 0;
    }

  }

  const phases = ()=> {
    switch(props.type){

      case 'Intellectual Property':
        return IPPhases;
      case 'Contract Drafting':
        return CDPhases;
      case 'Deal Negotiation':
        return DNPhases;
      default:
        return new Map();
    }
  }

  const increment = (nextPhase)=>{


    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    axios({
      method: "post",
      url: baseURL + "updatePhase",
      data: {
        email: localStorage.getItem("userEmail"),
        uid: props.uid,
        phase: nextPhase
      }
    })
      .then(res => {
        props.setProject(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const data = jwtDecode(localStorage.getItem("token"));

  let list = [];

  for(var i = 0; i <= maxPhase(); i++){
    list.push(
      <li key = {i} className={i > props.phase ? '' : 'active'}>
      <Popup
        trigger={
            <Icon name={i > props.phase ? "circle" : "check circle"}
                  size="big"
                  link={data.isAdmin}
                  id={i}
                  onClick={e => {
                      if(data.isAdmin)
                       increment(e.target.id)
                     }}/>

        }
        content={phases()[i]}
        position="bottom center"
        />
          </li>
    );
  }

  const width = 100/(maxPhase() + 1) +'%';
  document.documentElement.style.setProperty('--pbwidth', width);


  return(
    <div>

      <div className="progressContainer">
        <ul id="pb" className="progressBar">
          {list}
        </ul>
      </div>
      <h3>{"Current Phase: "+phases()[props.phase]} </h3>
    </div>
  )

}

export default ProgressBar;
