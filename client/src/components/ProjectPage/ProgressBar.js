import React, { useState, useEffect } from "react";
import CDPhases from "../../enums/CDPhases.js";
import DNPhases from "../../enums/DNPhases.js";
import IPPhases from "../../enums/IPPhases.js";
import { Progress, Button } from 'semantic-ui-react'

const ProgressBar = (props)=>{

  const [phase, setPhase] = useState(props.project.phase);

  const [type, setType] = useState(props.project.type);

  const maxPhase = ()=>{
    switch(type){

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
    switch(type){

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

  const [currPhases, setCurrPhases] = useState(phases());

  const increment = ()=>{

    if(phase >= maxPhase())
      setPhase(0);
    else
      setPhase(phase+1);

  }
  return(
    <div>
    <Progress
        total={maxPhase()}
        value ={phase}
        progress='ratio'
    />
    <p>{"Current Phase: "+phases()[phase]} </p>
    <Button onClick={increment}>Increment</Button>
    </div>
  )

}

export default ProgressBar;
