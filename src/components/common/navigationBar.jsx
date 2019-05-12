import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import styled from "styled-components";
import * as global from "../globalValues";

const NavDiv = styled.div`
  & img {
    height: 40px;
    width: 40px;
    margin-top: -10px;
    margin-bottom: -10px;
  }
`;

const NavigationBar = () => {
  return (
    <NavDiv>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={global.COMPANY_LOGO_URL} />
            {global.COMPANY_NAME}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/getStarted">
              <Nav.Link>Get Started</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavDiv>
  );
};

export default NavigationBar;
