import React, { Component } from "react";
import styled from "styled-components";

import { Formik } from "formik";
import { Form, InputGroup, Button, Col, Row } from "react-bootstrap";

import * as yup from "yup";

const RegisterFormDiv = styled.div`
  background: #f5f6f7;
  width: 100%;

  & #registerText {
    font-size: 20px;
  }
`;

const inputFieldsWidth = 6;

const schema = yup.object({
  firstName: yup
    .string()
    .min(3, "Too short!")
    .max(10, "Too much!")
    .required("Is required!"),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
  mobileNum: yup.string().required(),
  terms: yup.bool().oneOf([true], "Accept terms and conditions is required")
});

class RegisterForm extends Component {
  state = {};

  render() {
    return (
      <RegisterFormDiv>
        <Row id="registerText" className="justify-content-center">
          <span>Register</span>
        </Row>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            mobileNum: "",
            terms: false
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
                  xs={inputFieldsWidth}
                  controlId="firstNameValidation"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && errors.firstName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row noGutters className="justify-content-center">
                <Form.Group
                  as={Col}
                  xs={inputFieldsWidth}
                  controlId="validationFormik02"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                  />

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row noGutters className="justify-content-center">
                <Form.Group
                  as={Col}
                  md={inputFieldsWidth}
                  controlId="emailValidation"
                >
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row noGutters className="justify-content-center">
                <Form.Group
                  as={Col}
                  md={inputFieldsWidth}
                  controlId="passwordValidation"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="PassWord"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row noGutters className="justify-content-center">
                <Form.Group
                  as={Col}
                  md={inputFieldsWidth}
                  controlId="validationFormik04"
                >
                  <Form.Label>Password Confirm</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password again"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.passwordConfirm && !!errors.passwordConfirm
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row noGutters className="justify-content-center">
                <Form.Group
                  as={Col}
                  md={inputFieldsWidth}
                  controlId="validationFormik05"
                >
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    name="mobileNum"
                    value={values.mobileNum}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.mobileNum && !!errors.mobileNum}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.mobileNum}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={touched.terms && !!errors.terms}
                  feedback={errors.terms}
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </RegisterFormDiv>
    );
  }
}

export default RegisterForm;
