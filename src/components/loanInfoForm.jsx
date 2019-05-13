import React from "react";
import BasicForm from "./common/basicForm";
import SectionWrapper from "./common/sectionWrapper";

import { Formik } from "formik";
import { Form, Row, Col } from "react-bootstrap";

import styled from "styled-components";

import * as yup from "yup";

const LoanInfoFormDiv = styled.div`
  margin-top: 20px;

  & .form {
    margin-bottom: -30px;
  }

  & .desktopBtn button {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    transition: 0.3s;
  }

  & .desktopBtn button:hover {
    font-size: 30px;
    color: rgba(0, 0, 0, 1);
  }
`;

const incomeTypeError = "Income should be numbers";
const incomeGreaterThanZeroError = "Income should be greater than 0";
const incomeRequiredError = "Income is required";

const expenseTypeError = "Expense should be numbers";
const expenseGreaterThanZeroError = "Expense should be greater than 0";
const expenseRequiredError = "Expense is required";

const propertyValueTypeError = "Property value should be numbers";
const propertyValueGreaterThanZeroError =
  "Property value should be greater than 0";
const propertyValueRequiredError = "Property value is required";

const depositTypeError = "Deposit should be numbers";
const depositGreaterThanZeroError = "Deposit should be greater than 0";
const depositRequiredError = "Deposit is required";

const postcodeRegex = /^\d{4}$/;
const postcodeValidError = "Postcode should be four digits";
const postcodeRequiredError = "Postcode is required";

let schema = yup.object({
  yourIncome: yup
    .number()
    .typeError(incomeTypeError)
    .moreThan(0, incomeGreaterThanZeroError)
    .required(incomeRequiredError),
  yourExpense: yup
    .number()
    .typeError(expenseTypeError)
    .moreThan(0, expenseGreaterThanZeroError)
    .required(expenseRequiredError),
  partnerIncome: yup.number().notRequired(),
  partnerExpense: yup.number().notRequired(),
  propertyValue: yup
    .number()
    .typeError(propertyValueTypeError)
    .moreThan(0, propertyValueGreaterThanZeroError)
    .required(propertyValueRequiredError),
  deposit: yup
    .number()
    .typeError(depositTypeError)
    .moreThan(0, depositGreaterThanZeroError)
    .required(depositRequiredError),
  postcode: yup
    .string()
    .matches(postcodeRegex, postcodeValidError)
    .required(postcodeRequiredError)
});

class LoanInfoForm extends BasicForm {
  state = {
    initialValues: {
      yourIncome: "",
      yourExpense: "",
      partnerIncome: "",
      partnerExpense: "",
      propertyValue: "",
      deposit: "",
      postcode: ""
    }
  };

  componentWillMount() {
    const { isCouple } = this.props;
    if (isCouple) {
      schema = schema.shape({
        partnerIncome: yup
          .number()
          .typeError(incomeTypeError)
          .moreThan(0, incomeGreaterThanZeroError)
          .required(incomeRequiredError),
        partnerExpense: yup
          .number()
          .typeError(expenseTypeError)
          .moreThan(0, expenseGreaterThanZeroError)
          .required(expenseRequiredError)
      });
    }
  }

  handleSubmit = data => {
    this.props.onSubmit(data);
  };

  render() {
    const { initialValues } = this.state;
    const { isCouple, previousStep } = this.props;

    return (
      <LoanInfoFormDiv>
        <Col xs={12} md={11} className="m-auto noPadding">
          <Row className="justify-content-between">
            <Col xs={12}>
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
                      <Row>
                        <Col
                          xs={2}
                          className="desktopBtn d-none d-lg-flex flex-row justify-content-center"
                        >
                          {this.renderCustomButton(
                            "<<",
                            () => previousStep(),
                            "light"
                          )}
                        </Col>
                        <Col xs={12} lg={8} className="form">
                          <SectionWrapper name="About You">
                            <Row className="justify-content-center">
                              <Col xs={12} md={6}>
                                {this.renderInput(
                                  "yourIncome",
                                  ...commonAttrs,
                                  {
                                    label: "Your Income",
                                    prepend: "AUD",
                                    required: true
                                  }
                                )}
                              </Col>
                              <Col xs={12} md={6}>
                                {this.renderInput(
                                  "yourExpense",
                                  ...commonAttrs,
                                  {
                                    label: "Your Expense",
                                    prepend: "AUD",
                                    required: true
                                  }
                                )}
                              </Col>
                              {isCouple && (
                                <React.Fragment>
                                  <Col xs={12} md={6}>
                                    {this.renderInput(
                                      "partnerIncome",
                                      ...commonAttrs,
                                      {
                                        label: "Partner's Income",
                                        prepend: "AUD",
                                        required: true
                                      }
                                    )}
                                  </Col>
                                  <Col xs={12} md={6}>
                                    {this.renderInput(
                                      "partnerExpense",
                                      ...commonAttrs,
                                      {
                                        label: "Partner's Expense",
                                        prepend: "AUD",
                                        required: true
                                      }
                                    )}
                                  </Col>
                                </React.Fragment>
                              )}
                              <Col xs={12}>
                                {this.renderInput("deposit", ...commonAttrs, {
                                  label: "Your Deposit",
                                  prepend: "AUD",
                                  required: true
                                })}
                              </Col>
                            </Row>
                          </SectionWrapper>
                          <SectionWrapper name="About Target Property">
                            <Row className="justify-content-center">
                              <Col xs={12} md={6}>
                                {this.renderInput(
                                  "propertyValue",
                                  ...commonAttrs,
                                  {
                                    label: "Property Value",
                                    prepend: "AUD",
                                    required: true
                                  }
                                )}
                              </Col>

                              <Col xs={12} md={6}>
                                {this.renderInput("postcode", ...commonAttrs, {
                                  label: "Postcode of the Property",
                                  required: true
                                })}
                              </Col>
                            </Row>
                          </SectionWrapper>
                        </Col>
                        <Col
                          xs={2}
                          className="desktopBtn d-none d-lg-flex flex-row justify-content-center"
                        >
                          {this.renderCustomSubmitButton(
                            ">>",
                            "light",
                            "submit"
                          )}
                        </Col>
                      </Row>
                      <Row
                        noGutters
                        className="justify-content-between d-lg-none mt-4"
                      >
                        <Col xs={4} className="mobileBtn">
                          {this.renderCustomButton("<<", () => previousStep())}
                        </Col>
                        <Col xs={4} className="mobileBtn">
                          {this.renderSubmitButton(">>")}
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Col>
      </LoanInfoFormDiv>
    );
  }
}

export default LoanInfoForm;
