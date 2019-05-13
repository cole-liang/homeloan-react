import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import styled from "styled-components";
import * as global from "../globalValues";

const NavDiv = styled.div`
  & img {
    height: 40px;
    width: 40px;
    margin-top: -10px;
    margin-bottom: -10px;
  }

  & .avatar {
    display: inline-block;
    margin-right: 8px;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    background-size: cover;
    background-image: url("https://ya-webdesign.com/images/avatar-icon-png-17.png");
  }

  & .navDropdown a.dropdown-toggle {
    display: flex;
    align-items: center;
    padding: 0px;
  }

  @media only screen and (min-width: 768px) {
    & .dropdown-menu {
      left: -74px;
    }
  }
`;

const NavigationBar = ({ user }) => {
  return (
    <NavDiv>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={global.COMPANY_LOGO_URL} alt="Zinq Logo" />
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
            {(!user || !!user.error) && (
              <React.Fragment>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
            {!!user && !user.error && (
              <div className="navDropdown mr-md-2">
                <NavDropdown
                  title={
                    <React.Fragment>
                      <span className="d-none d-md-flex align-items-center">
                        <div className="avatar" />
                        <span>{user.firstName}</span>
                      </span>
                      <span className="d-block d-md-none">
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                      </span>
                    </React.Fragment>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavDiv>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(NavigationBar);
