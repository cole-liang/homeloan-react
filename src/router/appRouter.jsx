import React from "react";
import LoginForm from "./../components/common/loginForm";
import HomeLoan from "./../components/homeLoan";
import NotFound from "../components/common/notFound";
import RegisterForm from "../components/common/registerForm";
import GetStarted from "../components/getStarted";

import { Container } from "react-bootstrap";
import { Route, Redirect, Switch } from "react-router-dom";

import styled from "styled-components";
import * as global from "../components/globalValues";

const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background: url(${props => props.bgUrl});
`;

const AppRouter = () => {
  return (
    <Content bgUrl={global.BACKGROUND_URL}>
      <Container fluid className="noPadding">
        <Switch>
          <Route path="/notFound" exact component={NotFound} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/getStarted" exact component={GetStarted} />
          <Route path="/" exact component={HomeLoan} />
          <Redirect to="/notFound" component={NotFound} />
        </Switch>
      </Container>
    </Content>
  );
};

export default AppRouter;
