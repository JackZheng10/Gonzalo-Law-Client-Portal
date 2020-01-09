import React, { Component } from 'react';
import Header from "./components/header";
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route , Redirect, Switch} from "react-router-dom";
import Dashboard from './components/dashboard';


const fakeAuth = {
  isAuthenticated: false,
  authenticate(user) {
    this.isAuthenticated = true
    setTimeout(user, 100)
  },
  signout(user) {
    this.isAuthenticated = false
    setTimeout(user, 100)
  }
}

export default class App extends Component {
  render() {
        
    const PrivateRoute = ({ component: Component }) => (
  <Route  render={(props) => (
    fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)
    return (

      <React.Fragment>
        
          <Header/>
        <br />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} /> 
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route path='/dashboard' component={Dashboard} />        
      </Switch>

      </React.Fragment>

     );
  }
}


