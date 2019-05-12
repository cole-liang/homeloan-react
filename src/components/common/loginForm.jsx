import React from "react";
import BasicForm from "./basicForm";

import { Formik } from "formik";
import { Form, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import * as global from "../globalValues";
import * as yup from "yup";

const LoginFormDiv = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  margin-right: 30px;
  color: #fff;

  & #loginText {
    font-size: 20px;
  }
`;

const inputWidth = 6;

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
        <Col xs={8}>
          <img src={global.COMPANY_LOGO_URL} />
          {global.COMPANY_NAME}
        </Col>
        <Col>
          <LoginFormDiv>
            <Col xs={12}>
              <Row noGutters id="loginText" className="justify-content-center">
                <span>LOG IN</span>
              </Row>
              <div className="inputFieids">
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
                          <Col xs={inputWidth}>
                            {this.renderInput("username", ...commonAttrs, {
                              prepend: <i className="fa fa-user" />,
                              posFeedback: null,
                              placeholder: "Username"
                            })}
                          </Col>
                        </Row>

                        <Row noGutters className="justify-content-center">
                          <Col xs={inputWidth}>
                            {this.renderInput("password", ...commonAttrs, {
                              text: "password",
                              prepend: <i className="fa fa-lock" />,
                              posFeedback: null,
                              placeholder: "Password"
                            })}
                          </Col>
                        </Row>
                        <Row noGutters className="justify-content-center">
                          <Col xs={inputWidth}>
                            {this.renderSubmitButton("Login")}
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </Col>
          </LoginFormDiv>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;
