import React, { Component } from 'react';
import Header from "./components/header";
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route , Redirect} from "react-router-dom";
import Dashboard from './components/dashboard';
export default class App extends Component {
  render() {
    
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

    const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
    return (

<Router>
      <div className="container">
        <Header/>
      <br/>
      <Route path="/" exact component={Welcome} />
      <Route path="/register" component={Register} />
          <Route path="/login" component={Login} /> 
                  <PrivateRoute path='/dashboard' component={Dashboard} />
         <br/>
      </div>
    </Router>

     );
  }
}


