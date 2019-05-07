import React, { Component } from "react";
import styled from "styled-components";

import { Formik } from "formik";
import {
  Form,
  InputGroup,
  Button,
  Col,
  Row,
  Overlay,
  Popover
} from "react-bootstrap";

import * as yup from "yup";

const RegisterFormDiv = styled.div`
  background: #f5f6f7;
  width: 100%;

  & #registerText {
    font-size: 20px;
  }

  & .popover {
    max-width: 300px !important;
  }

  & #passwordPopover {
    color: rgba(0, 0, 0, 0.65);
    background-color: ${props => (props.isAllValid ? "#f6ffed" : "#fff1f0")};
    border: 1px solid ${props => (props.isAllValid ? "#b7eb8f" : "#ffa39e")};
  }

  & #passwordPopover .arrow::before {
    border-right-color: ${props => (props.isAllValid ? "#b7eb8f" : "#ffa39e")};
  }

  & #passwordPopover .arrow::after {
    border-right-color: ${props => (props.isAllValid ? "#f6ffed" : "#fff1f0")};
  }

  & #passwordPopover #pwdCharactersNumErrorText {
    color: ${props => (props.isPwdCharactersNumInvalid ? "red" : "green")};
  }

  & #passwordPopover #pwdCharactersNumErrorIcon {
    margin-left: 30px;
  }

  & #passwordPopover #pwdCharactersNumErrorIcon .fa-check-circle {
    display: ${props =>
      props.isPwdCharactersNumInvalid ? "none" : "inline-block"};
  }

  & #passwordPopover #pwdCharactersNumErrorIcon .fa-times-circle {
    display: ${props =>
      props.isPwdCharactersNumInvalid ? "inline-block" : "none"};
  }

  & #passwordPopover #pwdAlphaDigitErrorText {
    color: ${props => (props.isPwdAlphaDigitInvalid ? "red" : "green")};
  }

  & #passwordPopover #pwdAlphaDigitErrorIcon {
    margin-left: 16px;
  }

  & #passwordPopover #pwdAlphaDigitErrorIcon .fa-check-circle {
    display: ${props =>
      props.isPwdAlphaDigitInvalid ? "none" : "inline-block"};
  }

  & #passwordPopover #pwdAlphaDigitErrorIcon .fa-times-circle {
    display: ${props =>
      props.isPwdAlphaDigitInvalid ? "inline-block" : "none"};
  }

  & #passwordPopover #pwdTypeErrorText {
    color: ${props => (props.isPwdTypeInvalid ? "red" : "green")};
  }

  & #passwordPopover #pwdTypeErrorIcon {
    margin-left: 53px;
  }

  & #passwordPopover #pwdTypeErrorIcon .fa-check-circle {
    display: ${props => (props.isPwdTypeInvalid ? "none" : "inline-block")};
  }

  & #passwordPopover #pwdTypeErrorIcon .fa-times-circle {
    display: ${props => (props.isPwdTypeInvalid ? "inline-block" : "none")};
  }

  & #passwordPopover i {
    font-size: 17px;
  }

  & #passwordPopover i.fa-check-circle {
    color: green;
  }

  & #passwordPopover i.fa-times-circle {
    color: red;
  }
`;

const formWidth = 6;
const inputWidth = 12;

const firstNameRequired = "First name is required";
const lastNameRequired = "Last name is required";
const emailRequired = "Email is required";
const passwordRequired = "Password is required";
const passwordConfirmRequired = "Password confirm is required";
const mobileNumRequired = "Mobile number is required";
const termsAcceptRequired = "Accept terms and conditions is required";
const emailValid = "Please enter a valid email";
const mobileNumValid = "Please enter a valid Australian mobile number";
const pwdCharactersNumError = "Password must have 6-16 characters";
const pwdAlphaDigitError = "At least one alphabet and one number";
const pwdTypeError = "Contains only 0-9, a-z, A-Z and _";
const pwdsMatchCheck = "Passwords must match";

const schema = yup.object({
  firstName: yup.string().required(firstNameRequired),
  lastName: yup.string().required(lastNameRequired),
  email: yup
    .string()
    .email(emailValid)
    .required(emailRequired),
  password: yup
    .string()
    .matches(/^.{6,16}$/, pwdCharactersNumError)
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, pwdAlphaDigitError)
    .matches(/^[\w\d]+$/, pwdTypeError)
    .required(passwordRequired),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], pwdsMatchCheck)
    .required(passwordConfirmRequired),
  mobileNum: yup
    .string()
    .matches(/^(4|04)\d{8}$/, mobileNumValid)
    .required(mobileNumRequired),
  terms: yup.bool().oneOf([true], termsAcceptRequired)
});

const toolTips = {
  mobileNum: <div>Currently only support Australian number</div>,
  email: <div>example@example.com</div>,
  password: (
    <div className="passwordTips">
      <p id="pwdCharactersNumErrorText">
        {pwdCharactersNumError}
        <span id="pwdCharactersNumErrorIcon">
          <i className="fa fa-check-circle" />
          <i className="fa fa-times-circle" />
        </span>
      </p>
      <p id="pwdAlphaDigitErrorText">
        {pwdAlphaDigitError}
        <span id="pwdAlphaDigitErrorIcon">
          <i className="fa fa-check-circle" />
          <i className="fa fa-times-circle" />
        </span>
      </p>
      <p id="pwdTypeErrorText">
        {pwdTypeError}
        <span id="pwdTypeErrorIcon">
          <i className="fa fa-check-circle" />
          <i className="fa fa-times-circle" />
        </span>
      </p>
    </div>
  )
};

class RegisterForm extends Component {
  state = {
    target: null,
    showToolTip: false,
    passwordErrors: [pwdAlphaDigitError, pwdCharactersNumError, pwdTypeError]
  };

  handleBlurCustom = (e, handleBlur) => {
    handleBlur(e);
    this.setState({
      target: null,
      showToolTip: false
    });
  };

  handleFocus = ({ target }) => {
    this.setState({
      target,
      showToolTip: true
    });
  };

  handlePasswordChange = (e, handleChange) => {
    handleChange(e);
    schema
      .validate({ password: e.target.value }, { abortEarly: false })
      .catch(e => {
        const passwordErrors = e.inner
          .filter(ve => ve.path === "password")
          .map(ve => ve.message)
          .filter(error => !error.includes("required"));
        this.setState({ passwordErrors });
      });
  };

  render() {
    const { target, passwordErrors } = this.state;
    const toolTipTargetName = !!target ? target.name : "";
    return (
      <RegisterFormDiv
        isPwdCharactersNumInvalid={passwordErrors.includes(
          pwdCharactersNumError
        )}
        isPwdAlphaDigitInvalid={passwordErrors.includes(pwdAlphaDigitError)}
        isPwdTypeInvalid={passwordErrors.includes(pwdTypeError)}
        isAllValid={passwordErrors.length === 0}
      >
        <Overlay
          show={this.state.showToolTip}
          target={this.state.target}
          placement="right"
          container={this}
          containerPadding={20}
        >
          <Popover id={`${toolTipTargetName}Popover`}>
            {toolTips[toolTipTargetName]}
          </Popover>
        </Overlay>
        <Col xs={formWidth} className="form">
          <Row
            noGutters
            id="registerText"
            as={Col}
            xs={inputWidth}
            className="justify-content-center"
          >
            <span>Register</span>
          </Row>
          <Formik
            validationSchema={schema}
            onSubmit={e => {
              console.log(e);
            }}
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
              <React.Fragment>
                <Form noValidate onSubmit={handleSubmit}>
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      xs={inputWidth}
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
                        isInvalid={touched.firstName && !!errors.firstName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      xs={inputWidth}
                      controlId="lastNameValidation"
                    >
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />

                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      md={inputWidth}
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
                          onFocus={this.handleFocus}
                          onBlur={e => this.handleBlurCustom(e, handleBlur)}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      md={inputWidth}
                      controlId="passwordValidation"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={e =>
                          this.handlePasswordChange(e, handleChange)
                        }
                        onFocus={this.handleFocus}
                        onBlur={e => this.handleBlurCustom(e, handleBlur)}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      md={inputWidth}
                      controlId="passwordConfirmValidation"
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
                  <Row noGutters className="justify-content-start">
                    <Form.Group
                      as={Col}
                      md={inputWidth}
                      controlId="mobileNumberValidation"
                    >
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mobile Number"
                        name="mobileNum"
                        value={values.mobileNum}
                        onChange={handleChange}
                        onFocus={this.handleFocus}
                        onBlur={e => this.handleBlurCustom(e, handleBlur)}
                        isValid={touched.mobileNum && !errors.mobileNum}
                        isInvalid={touched.mobileNum && !!errors.mobileNum}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobileNum}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Form.Group>
                      <Form.Check
                        required
                        name="terms"
                        label="Agree to terms and conditions"
                        onChange={handleChange}
                        isInvalid={touched.terms && !!errors.terms}
                        feedback={errors.terms}
                        id="termValidation"
                      />
                    </Form.Group>
                  </Row>
                  <Row noGutters className="justify-content-start">
                    <Col xs={inputWidth}>
                      <Button type="submit" block>
                        Register
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </React.Fragment>
            )}
          </Formik>
        </Col>
      </RegisterFormDiv>
    );
  }
}

export default RegisterForm;
