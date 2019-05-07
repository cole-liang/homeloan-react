import React from "react";
import PasswordToolTips from "../passwordTooltips";
import BasicForm from "./basicForm";
import styled from "styled-components";

import { Formik } from "formik";
import { Form, Col, Row, Overlay, Popover } from "react-bootstrap";

import * as yup from "yup";

const formWidth = 6;
const inputWidth = 12;

const firstNameRequired = "First name is required";
const lastNameRequired = "Last name is required";

const emailValid = "Please enter a valid email";
const emailToolTip = "example@example.com";
const emailRequired = "Email is required";

const pwdCharactersNumRegex = /^.{6,16}$/;
const pwdCharactersNumError = "Password must have 6-16 characters";
const pwdAlphaDigitRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const pwdAlphaDigitError = "At least one alphabet and one number";
const pwdTypeRegex = /^[\w\d]+$/;
const pwdTypeError = "Contains only 0-9, a-z, A-Z and _";
const passwordRequired = "Password is required";

const pwdsMatchCheck = "Passwords must match";
const passwordConfirmRequired = "Password confirm is required";

const mobileNumRegex = /^(4|04)\d{8}$/;
const mobileNumValid = "Please enter a valid Australian mobile number";
const mobileNumToolTip = "Currently only support Australian number";
const mobileNumRequired = "Mobile number is required";

const termsAcceptRequired = "Accept terms and conditions is required";

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
    background-color: ${props =>
      props.isPasswordValid ? "#f6ffed" : "#fff1f0"};
    border: 1px solid
      ${props => (props.isPasswordValid ? "#b7eb8f" : "#ffa39e")};
  }

  & #passwordPopover .arrow::before {
    border-right-color: ${props =>
      props.isPasswordValid ? "#b7eb8f" : "#ffa39e"};
  }

  & #passwordPopover .arrow::after {
    border-right-color: ${props =>
      props.isPasswordValid ? "#f6ffed" : "#fff1f0"};
  }
`;

const schema = yup.object({
  firstName: yup.string().required(firstNameRequired),
  lastName: yup.string().required(lastNameRequired),
  email: yup
    .string()
    .email(emailValid)
    .required(emailRequired),
  password: yup
    .string()
    .matches(pwdCharactersNumRegex, pwdCharactersNumError)
    .matches(pwdAlphaDigitRegex, pwdAlphaDigitError)
    .matches(pwdTypeRegex, pwdTypeError)
    .required(passwordRequired),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], pwdsMatchCheck)
    .required(passwordConfirmRequired),
  mobileNum: yup
    .string()
    .matches(mobileNumRegex, mobileNumValid)
    .required(mobileNumRequired),
  terms: yup.bool().oneOf([true], termsAcceptRequired)
});

const getToolTips = ({ passwordErrors }) => ({
  mobileNum: <div>{mobileNumToolTip}</div>,
  email: <div>{emailToolTip}</div>,
  password: (
    <PasswordToolTips
      possibleErrors={{
        pwdCharactersNumError,
        pwdAlphaDigitError,
        pwdTypeError
      }}
      passwordErrors={passwordErrors}
    />
  )
});

class RegisterForm extends BasicForm {
  state = {
    target: null,
    showToolTip: false,
    passwordErrors: [pwdAlphaDigitError, pwdCharactersNumError, pwdTypeError],
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      mobileNum: "",
      terms: false
    }
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
          .filter(error => !error.includes(passwordRequired));
        this.setState({ passwordErrors });
      });
  };

  render() {
    const { target, passwordErrors, initialValues } = this.state;
    const toolTipTargetName = !!target ? target.name : "";
    return (
      <RegisterFormDiv isPasswordValid={passwordErrors.length === 0}>
        <Overlay
          show={this.state.showToolTip}
          target={this.state.target}
          placement="right"
          container={this}
          containerPadding={20}
        >
          <Popover id={`${toolTipTargetName}Popover`}>
            {getToolTips({ passwordErrors })[toolTipTargetName]}
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
              const commonAttr = [values, touched, errors];
              return (
                <React.Fragment>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "First Name",
                          "firstName",
                          ...commonAttr,
                          handleChange,
                          handleBlur
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "Last Name",
                          "lastName",
                          ...commonAttr,
                          handleChange,
                          handleBlur
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "Email",
                          "email",
                          ...commonAttr,
                          handleChange,
                          e => this.handleBlurCustom(e, handleBlur),
                          this.handleFocus
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "Password",
                          "password",
                          ...commonAttr,
                          e => this.handlePasswordChange(e, handleChange),
                          e => this.handleBlurCustom(e, handleBlur),
                          this.handleFocus,
                          "password"
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "Password Confirm",
                          "passwordConfirm",
                          ...commonAttr,
                          handleChange,
                          handleBlur,
                          null,
                          "password",
                          "Great! Passwords match"
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>
                        {this.renderInput(
                          "Mobile Number",
                          "mobileNum",
                          ...commonAttr,
                          handleChange,
                          e => this.handleBlurCustom(e, handleBlur),
                          this.handleFocus
                        )}
                      </Col>
                    </Row>
                    <Row noGutters className="justify-content-start">
                      {this.renderCheckBox(
                        "Agree to terms and conditions",
                        "terms",
                        touched,
                        errors,
                        handleChange
                      )}
                    </Row>
                    <Row noGutters className="justify-content-start">
                      <Col xs={inputWidth}>{this.renderButton("Register")}</Col>
                    </Row>
                  </Form>
                </React.Fragment>
              );
            }}
          </Formik>
        </Col>
      </RegisterFormDiv>
    );
  }
}

export default RegisterForm;
