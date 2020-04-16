import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./components/welcome";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";
import Projects from "./components/Projects/Projects";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import Admin from "./components/admin/admin.js";
import Calendar from "./components/calendar";
import ResetPassword from "./components/resetPassword";
import PasswordRecovery from "./components/passwordRecovery";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/calendar" component={Calendar} />
        <Route
          path="/admin"
          component={Admin} /*for testing/designing only */
        />
        <Route path="/projects/:uid" component={ProjectPage} />
        <Route
          path="/resetPassword"
          component={
            ResetPassword
          } /*for testing, real one will have id in URL*/
        />
        <Route
          path="/passwordRecovery"
          component={
            PasswordRecovery
          } /*for testing, real one will have id in URL*/
        />
      </Switch>
      <br />
    </React.Fragment>
  );
};

export default App;
