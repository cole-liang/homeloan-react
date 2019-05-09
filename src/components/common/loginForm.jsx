import React from "react";
import BasicForm from "./basicForm";
import styled from "styled-components";

import { Formik } from "formik";
import { Form, Row, Col } from "react-bootstrap";

import * as yup from "yup";

const LoginFormDiv = styled.div`
  background: #f5f6f7;
  width: 100%;

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
      <Row noGutters>
        <Col md={7} />
        <Col>
          <LoginFormDiv>
            <Row id="loginText" className="justify-content-center">
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
                        <Col xs={inputWidth}>{this.renderButton("Login")}</Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </LoginFormDiv>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;
