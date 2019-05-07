import React, { Component } from "react";
import styled from "styled-components";

import { Formik } from "formik";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import * as yup from "yup";

const LoginFormDiv = styled.div`
  background: #f5f6f7;
  width: 100%;

  & #loginText {
    font-size: 20px;
  }
`;

const inputWidth = 6;

const schema = yup.object({
  username: yup
    .string()
    .email("Please enter a valid email")
    .required("Username is required"),
  password: yup.string().required("Password is required")
});

class LoginForm extends Component {
  state = {};

  render() {
    return (
      <Row>
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
                initialValues={{
                  username: "",
                  password: ""
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row noGutters className="justify-content-center">
                      <Form.Group
                        as={Col}
                        xs={inputWidth}
                        controlId="usernameValidation"
                      >
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="usernamePrepend">
                              <i className="fa fa-user" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.username && !!errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    <Row noGutters className="justify-content-center">
                      <Form.Group
                        as={Col}
                        xs={inputWidth}
                        controlId="passwordValidation"
                      >
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="passwordPrepend">
                              <i className="fa fa-lock" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    <Row noGutters className="justify-content-center">
                      <Col xs={inputWidth}>
                        <Button type="submit" block>
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
          </LoginFormDiv>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;
