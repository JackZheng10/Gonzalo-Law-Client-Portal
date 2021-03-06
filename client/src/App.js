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
        <Route path="/welcome" component={Welcome} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/calendar" component={Calendar} />
        <Route
          path="/admin"
          component={Admin} /*for testing/designing only */
        />
        <Route path="/projects/:uid" component={ProjectPage} />
        <Route path="/resetPassword/:sessionid" component={ResetPassword} />
        <Route path="/passwordRecovery/" component={PasswordRecovery} />
        <Route path="/" /*fallback route */>
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
