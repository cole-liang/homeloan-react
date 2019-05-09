import React from "react";
import LoginForm from "./../components/common/loginForm";
import HomeLoan from "./../components/homeLoan";
import NotFound from "../components/common/notFound";
import RegisterForm from "../components/common/registerForm";

import styled from "styled-components";
import * as global from "../components/globalValues";

import { Container } from "react-bootstrap";
import { Route, Redirect, Switch } from "react-router-dom";

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
          <Route path="/not-found" exact component={NotFound} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/" exact component={HomeLoan} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </Container>
    </Content>
  );
};

export default AppRouter;
