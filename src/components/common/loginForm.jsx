import React from "react";
import BasicForm from "./basicForm";

import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import homeLoanPng from "../../assets/homeloan.png";
import * as global from "../globalValues";
import * as yup from "yup";

const LoginFormDiv = styled.div`
  width: 100%;
  display: flex;
  color: #fff;

  & .companyLogo {
    width: 100px;
    height: 100px;
  }

  & .homeloanPng {
    position: relative;
    bottom: 21px;
    transform: scale(1.1);
  }

  & .form {
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    margin-right: 30px;
  }

  & .fontColor {
    color: #fff;
  }

  & #loginText {
    font-size: 20px;
  }

  & .inputFieid {
    margin-bottom: 15px;
  }

  /* display: md(middle screen) */
  @media only screen and (max-width: 767px) {
    color: #000;

    & .companyLogo {
      background: purple;
    }

    & .form {
      background: #fff;
      margin-right: 0px;
    }

    & .fontColor {
      color: #007bff;
    }
  }
`;

const usernameValid = "Please enter a valid email";
const usernameRequired = "Username is required";

const passwordRequired = "Password is required";

const schema = yup.object({
  username: yup
    .string()
    .email(usernameValid)
    .required(usernameRequired),
  password: yup.string().required(passwordRequired)
});

class LoginForm extends BasicForm {
  state = {
    initialValues: {
      username: "",
      password: ""
    }
  };

  render() {
    const { initialValues } = this.state;
    return (
      <Row noGutters className="h-100">
        <LoginFormDiv>
          <Col
            md={7}
            lg={9}
            className="noPadding d-none d-md-flex flex-column justify-content-end"
          >
            <Row className="justify-content-center">
              <img className="homeloanPng" src={homeLoanPng} />
            </Row>
          </Col>
          <Col xs={12} md={5} lg={3} className="noPadding">
            <div className="form">
              <Col
                xs={10}
                className="noPadding m-auto h-100 d-flex flex-column justify-content-center"
              >
                <Row className="justify-content-center">
                  <img className="companyLogo" src={global.COMPANY_LOGO_URL} />
                </Row>
                <Row
                  noGutters
                  id="loginText"
                  className="justify-content-center my-4"
                >
                  <div>LOG IN</div>
                </Row>
                <div>
                  <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={initialValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => {
                      const commonAttrs = [
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur
                      ];
                      return (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Row noGutters className="justify-content-center">
                            <Col xs={12} className="inputFieid">
                              {this.renderInput("username", ...commonAttrs, {
                                prepend: <i className="fa fa-user" />,
                                posFeedback: null,
                                placeholder: "Username"
                              })}
                            </Col>
                          </Row>
                          <Row noGutters className="justify-content-center">
                            <Col xs={12} className="inputFieid">
                              {this.renderInput("password", ...commonAttrs, {
                                text: "password",
                                prepend: <i className="fa fa-lock" />,
                                posFeedback: null,
                                placeholder: "Password"
                              })}
                            </Col>
                          </Row>
                          <Row noGutters className="justify-content-center">
                            <Col
                              xs={12}
                              className="d-none d-md-block inputFieid"
                            >
                              {this.renderCustomSubmitButton(
                                "Login",
                                "outline-light"
                              )}
                            </Col>
                            <Col
                              xs={12}
                              className="d-block d-md-none inputFieid"
                            >
                              {this.renderCustomSubmitButton(
                                "Login",
                                "outline-primary"
                              )}
                            </Col>
                          </Row>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <Link className="fontColor text-center my-2" to="/register">
                  Create Your Account
                </Link>
              </Col>
            </div>
          </Col>
        </LoginFormDiv>
      </Row>
    );
  }
}

export default LoginForm;
