import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./../components/common/loginForm";
import HomeLoan from "./../components/homeLoan";
import NotFound from "../components/common/notFound";
import RegisterForm from "../components/common/registerForm";

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/" exact component={HomeLoan} />
        <Redirect to="/not-found" component={NotFound} />
      </Switch>
    </div>
  );
};

export default AppRouter;
