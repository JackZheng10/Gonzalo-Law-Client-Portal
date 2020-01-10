import React, { Component } from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route , Switch} from "react-router-dom";
import Dashboard from './components/dashboard';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Header/>
        <br />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} /> 
          <Route path='/dashboard' component={Dashboard} />        
        </Switch>
        <br />
        <Footer />
      </React.Fragment>
     );
  }
}


