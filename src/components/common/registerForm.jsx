import React from "react";
import BasicForm from "./basicForm";
import DatePicker from "./datePicker";
import PasswordToolTips from "./passwordTooltips";
import PasswordStrengthMeter from "./passwordStrengthMeter";
import SectionWrapper from "./sectionWrapper";

import styled from "styled-components";
import moment from "moment";
import * as yup from "yup";

import { Formik } from "formik";
import { Form, Col, Row, Overlay, Popover } from "react-bootstrap";

const firstNameRequired = "First name is required";
const lastNameRequired = "Last name is required";

const emailValid = "Please enter a valid email, e.g. example@example.com";
const emailToolTip = "e.g. example@example.com";
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

const dateOfBirthRequired = "Date of birth is is required";
const dateOfBirthRegex = /\d{2}\/\d{2}\/\d{4}/;
const dateOfBirthValid = "Please follow DD/MM/YYYY, e.g. 01/01/2019";

const termsAcceptRequired = "Accept terms and conditions is required";

const RegisterFormDiv = styled.div`
  & #registerText {
    font-size: 25px;
    margin: 15px 0px;
    font-weight: 600;
  }

  & .form {
    border-radius: 15px;
    box-shadow: 0px 0px 20px #ccc;
    background: #fff;
    margin: 15px 0px;
    padding: 15px 30px;
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

  & .accept-btn {
    margin-bottom: 15px;
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
  dob: yup
    .string()
    .matches(dateOfBirthRegex, dateOfBirthValid)
    .required(dateOfBirthRequired),
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
    password: "",
    passwordErrors: [pwdAlphaDigitError, pwdCharactersNumError, pwdTypeError],
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      mobileNum: "",
      dob: "",
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
    let password = e.target.value;
    schema.validate({ password }, { abortEarly: false }).catch(e => {
      const passwordErrors = e.inner
        .filter(ve => ve.path === "password")
        .map(ve => ve.message)
        .filter(error => !error.includes(passwordRequired));
      this.setState({ password, passwordErrors });
    });
  };

  handleDateChange = (selectedDate, setFieldValue) => {
    setFieldValue("dob", selectedDate, true);
  };

  render() {
    const { target, password, passwordErrors, initialValues } = this.state;
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
        <Row className="justify-content-center">
          <Col xs={6} className="form">
            <Row
              noGutters
              id="registerText"
              as={Col}
              xs={12}
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
                errors,
                setFieldValue
              }) => {
                const commonAttr = [values, touched, errors];
                return (
                  <React.Fragment>
                    <Form noValidate onSubmit={handleSubmit}>
                      <SectionWrapper name="Your Name">
                        <Row className="justify-content-start">
                          <Col xs={6}>
                            {this.renderInput(
                              "firstName",
                              ...commonAttr,
                              handleChange,
                              handleBlur,
                              { label: "First Name" }
                            )}
                          </Col>
                          <Col xs={6}>
                            {this.renderInput(
                              "lastName",
                              ...commonAttr,
                              handleChange,
                              handleBlur,
                              { label: "Last Name" }
                            )}
                          </Col>
                        </Row>
                      </SectionWrapper>
                      <SectionWrapper name="Account Setting">
                        <Row noGutters className="justify-content-start">
                          <Col xs={12}>
                            {this.renderInput(
                              "email",
                              ...commonAttr,
                              handleChange,
                              e => this.handleBlurCustom(e, handleBlur),
                              {
                                label: "Account name",
                                placeholder: "Please enter your email",
                                handleFocus: this.handleFocus
                              }
                            )}
                          </Col>
                        </Row>
                        <Row noGutters className="justify-content-start">
                          <Col xs={12}>
                            {this.renderInput(
                              "password",
                              ...commonAttr,
                              e => this.handlePasswordChange(e, handleChange),
                              e => this.handleBlurCustom(e, handleBlur),
                              {
                                label: "Password",
                                type: "password",
                                handleFocus: this.handleFocus,
                                pwdStrengthMeter: (
                                  <PasswordStrengthMeter password={password} />
                                )
                              }
                            )}
                          </Col>
                        </Row>
                        <Row noGutters className="justify-content-start">
                          <Col xs={12}>
                            {this.renderInput(
                              "passwordConfirm",
                              ...commonAttr,
                              handleChange,
                              handleBlur,
                              {
                                label: "Password Confirm",
                                type: "password",
                                posFeedback: "Great! Passwords match"
                              }
                            )}
                          </Col>
                        </Row>
                      </SectionWrapper>
                      <SectionWrapper name="Other Info">
                        <Row className="justify-content-around">
                          <Col xs={6}>
                            <Row
                              noGutters
                              className="justify-content-start align-items-start"
                            >
                              <Col xs={10}>
                                {this.renderInput(
                                  "dob",
                                  ...commonAttr,
                                  handleChange,
                                  handleBlur,
                                  {
                                    label: "Date of Birth",
                                    placeholder: "DD/MM/YYYY"
                                  }
                                )}
                              </Col>
                              <Col xs={2}>
                                <DatePicker
                                  initialDate={moment().format("DD/MM/YYYY")}
                                  onChange={date =>
                                    this.handleDateChange(date, setFieldValue)
                                  }
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={6}>
                            {this.renderInput(
                              "mobileNum",
                              ...commonAttr,
                              handleChange,
                              e => this.handleBlurCustom(e, handleBlur),
                              {
                                label: "Mobile Number",
                                handleFocus: this.handleFocus
                              }
                            )}
                          </Col>
                        </Row>
                      </SectionWrapper>
                      <Row noGutters className="justify-content-between">
                        <Col xs={6} className="align-items-center d-flex">
                          {this.renderCheckBox(
                            "Agree to terms and conditions",
                            "terms",
                            touched,
                            errors,
                            handleChange
                          )}
                        </Col>
                        <Col
                          xs={3}
                          className="accept-btn align-items-center d-flex"
                        >
                          {this.renderButton("Register")}
                        </Col>
                      </Row>
                    </Form>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </RegisterFormDiv>
    );
  }
}

export default RegisterForm;
