import React, { useState, useEffect } from "react";
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import { Progress, Button } from 'semantic-ui-react';
import axios from "axios";
import baseURL from "../../baseURL";

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

  const increment = ()=>{
    let phase = props.phase + 1;
    if(props.phase >= maxPhase())
      phase = 0;

    axios({
      method: "post",
      url: baseURL + "updatePhase",
      data: {
        email: sessionStorage.getItem("userEmail"),
        uid: props.uid,
        phase: phase
      }
    })
      .then(res => {
        props.setProject(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return(
    <div>
    <Progress
        value ={props.phase || 0}
        total={maxPhase()}
        progress='ratio'
    />
    <p>{"Current Phase: "+phases()[props.phase]} </p>
    <Button onClick={increment}>Increment</Button>
    </div>
  )

}

export default ProgressBar;
