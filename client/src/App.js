import React, { Component } from "react";
import Header from "./components/header";
//import Footer from "./components/footer";
import Welcome from "./components/welcome";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/dashboard";
import ProjectPage from "./components/Projects/ProjectPage"
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/projects" component={ProjectPage} />
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
