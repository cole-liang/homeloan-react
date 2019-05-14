import React from "react";
import BasicForm from "./basicForm";
import DatePicker from "./datePicker";
import PasswordToolTips from "./passwordTooltips";
import PasswordStrengthMeter from "./passwordStrengthMeter";
import SectionWrapper from "./sectionWrapper";

import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Col, Row, Overlay, Popover } from "react-bootstrap";

import styled from "styled-components";
import moment from "moment";

import * as yup from "yup";
import * as userAction from "../../actions/userAction";

const nameRegex = /^[a-zA-Z]+$/;
const nameValidError = "Only accept alphabets";
const firstNameRequiredError = "First name is required";
const lastNameRequiredError = "Last name is required";

const emailValidError = "Please enter a valid email, e.g. example@example.com";
const emailToolTip = "e.g. example@example.com";
const emailRequiredError = "Email is required";

const pwdCharactersNumRegex = /^.{6,16}$/;
const pwdCharactersNumError = "Password must have 6-16 characters";
const pwdAlphaDigitRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const pwdAlphaDigitError = "At least one alphabet and one number";
const pwdTypeRegex = /^[\w\d]+$/;
const pwdTypeError = "Contains only 0-9, a-z, A-Z and _";
const passwordRequiredError = "Password is required";

const pwdsMatchError = "Passwords must match";
const passwordConfirmRequiredError = "Password confirm is required";

const mobileNumRegex = /^(04)\d{8}$/;
const mobileNumValidError =
  'Australian mobile number should be 10 digits started with "04"';
const mobileNumToolTip = "Currently only support Australian number";
const mobileNumRequiredError = "Mobile number is required";

const dateOfBirthRequiredError = "Date of birth is is required";
const dateOfBirthRegex = /\d{2}\/\d{2}\/\d{4}/;
const dateOfBirthValidError = "Please follow DD/MM/YYYY, e.g. 01/01/2019";

const termsAcceptRequiredError = "You need to accept to continue";

const RegisterFormDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  & .registerTitle {
    margin-bottom: 35px;
    border-bottom: 1px solid #999;
  }

  & .registerText {
    font-size: 25px;
    font-weight: 600;
  }

  & .loginText {
    font-size: 15px;
  }

  & .form {
    border-radius: 15px;
    box-shadow: 0px 0px 20px #ccc;
    background: #fff;
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

  /* display: md(middle screen) */
  @media only screen and (max-width: 767.5px) {
    & .form {
      border-radius: 0px;
    }
  }
`;

const schema = yup.object({
  firstName: yup
    .string()
    .matches(nameRegex, nameValidError)
    .required(firstNameRequiredError),
  lastName: yup
    .string()
    .matches(nameRegex, nameValidError)
    .required(lastNameRequiredError),
  email: yup
    .string()
    .email(emailValidError)
    .required(emailRequiredError),
  password: yup
    .string()
    .matches(pwdCharactersNumRegex, pwdCharactersNumError)
    .matches(pwdAlphaDigitRegex, pwdAlphaDigitError)
    .matches(pwdTypeRegex, pwdTypeError)
    .required(passwordRequiredError),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], pwdsMatchError)
    .required(passwordConfirmRequiredError),
  mobileNum: yup
    .string()
    .matches(mobileNumRegex, mobileNumValidError)
    .required(mobileNumRequiredError),
  dob: yup
    .string()
    .matches(dateOfBirthRegex, dateOfBirthValidError)
    .required(dateOfBirthRequiredError),
  terms: yup.bool().oneOf([true], termsAcceptRequiredError)
});

const getToolTips = passwordErrors => ({
  mobileNum: <div>{mobileNumToolTip}</div>,
  email: <div>{emailToolTip}</div>,
  password: passwordErrors && (
    <PasswordToolTips
      possibleErrors={{
        pwdCharactersNumError,
        pwdAlphaDigitError,
        pwdTypeError
      }}
      passwordErrors={passwordErrors.passwordErrors}
    />
  )
});

class RegisterForm extends BasicForm {
  state = {
    target: null,
    showToolTip: false,
    password: "",
    passwordChange: false,
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
      target: e.target,
      showToolTip: true
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
        .filter(error => !error.includes(passwordRequiredError));
      this.setState({ password, passwordErrors, passwordChange: true });
    });
  };

  handleDateChange = (selectedDate, setFieldValue) => {
    setFieldValue("dob", selectedDate, true);
  };

  handleSubmit = user => {
    this.props.registerUser(user);
    this.props.history.push("/");
  };

  render() {
    const {
      target,
      password,
      passwordChange,
      passwordErrors,
      initialValues
    } = this.state;
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
          <Popover
            id={`${toolTipTargetName}Popover`}
            className="d-none d-md-block"
          >
            {getToolTips({ passwordErrors })[toolTipTargetName]}
          </Popover>
        </Overlay>
        <Row className="registerForm d-flex w-100 align-items-center justify-content-center">
          <Col
            xs={12}
            md={8}
            lg={6}
            className="form px-3 px-md-4 py-4 my-0 my-md-4"
          >
            <Row noGutters className="registerTitle justify-content-between">
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-start align-items-end"
              >
                <span className="registerText">Register</span>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-sm-start justify-content-md-end"
              >
                <Link to="/login" className="loginText d-flex align-items-end">
                  Already have an account?
                </Link>
              </Col>
            </Row>
            <Formik
              validationSchema={schema}
              onSubmit={this.handleSubmit}
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
                          <Col xs={12} md={6}>
                            {this.renderInput(
                              "firstName",
                              ...commonAttr,
                              handleChange,
                              handleBlur,
                              { label: "First Name", required: true }
                            )}
                          </Col>
                          <Col xs={12} md={6}>
                            {this.renderInput(
                              "lastName",
                              ...commonAttr,
                              handleChange,
                              handleBlur,
                              { label: "Last Name", required: true }
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
                                label: "Account Name",
                                placeholder: "Please enter your email",
                                handleFocus: this.handleFocus,
                                toolTip: getToolTips()["email"],
                                required: true
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
                                passwordChange: passwordChange,
                                pwdStrengthMeter: (
                                  <PasswordStrengthMeter password={password} />
                                ),
                                toolTip: getToolTips({ passwordErrors })[
                                  "password"
                                ],
                                required: true
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
                                posFeedback: "Great! Passwords match",
                                required: true
                              }
                            )}
                          </Col>
                        </Row>
                      </SectionWrapper>
                      <SectionWrapper name="Other Info">
                        <Row className="justify-content-around">
                          <Col xs={12} md={6}>
                            <Row
                              noGutters
                              className="justify-content-start align-items-start"
                            >
                              <Col xs={10} sm={11} md={10}>
                                {this.renderInput(
                                  "dob",
                                  ...commonAttr,
                                  handleChange,
                                  handleBlur,
                                  {
                                    label: "Date of Birth",
                                    placeholder: "DD/MM/YYYY",
                                    required: true
                                  }
                                )}
                              </Col>
                              <Col xs={2} sm={1} md={2}>
                                <DatePicker
                                  disableFuture
                                  initialDate={moment().format("DD/MM/YYYY")}
                                  onChange={date =>
                                    this.handleDateChange(date, setFieldValue)
                                  }
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={12} md={6}>
                            {this.renderInput(
                              "mobileNum",
                              ...commonAttr,
                              handleChange,
                              e => this.handleBlurCustom(e, handleBlur),
                              {
                                label: "Mobile Number",
                                handleFocus: this.handleFocus,
                                toolTip: getToolTips()["mobileNum"],
                                required: true
                              }
                            )}
                          </Col>
                        </Row>
                      </SectionWrapper>
                      <Row noGutters className="justify-content-between">
                        <Col
                          xs={12}
                          md={9}
                          className="align-items-center d-flex"
                        >
                          {this.renderCheckBox(
                            "Agree to terms and conditions",
                            "terms",
                            touched,
                            errors,
                            handleChange,
                            { required: true }
                          )}
                        </Col>
                        <Col
                          xs={12}
                          md={3}
                          className="accept-btn align-items-center d-flex"
                        >
                          {this.renderSubmitButton("Register")}
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

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(userAction.registerUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
