import React ,{ Component } from 'react';
import Header from "./components/header";
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

export default class App extends Component {
  render(){
    return (

<Router>
      <div className="container">
        <Header/>
      <br/>
      <Route path="/" exact component={Welcome} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} /> 
         <br/>
      </div>
    </Router>

     );
  }
}


