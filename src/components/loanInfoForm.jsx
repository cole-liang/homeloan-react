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
  yourPeriod: yup.string().required(),
  yourExpense: yup
    .number()
    .typeError(expenseTypeError)
    .moreThan(0, expenseGreaterThanZeroError)
    .required(expenseRequiredError),
  partnerIncome: yup.number().notRequired(),
  partnerPeriod: yup.string().notRequired(),
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

export class LoanInfoForm extends BasicForm {
  state = {
    initialValues: {
      yourIncome: "",
      yourPeriod: "weekly",
      yourExpense: "",
      partnerIncome: "",
      partnerPeriod: "weekly",
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
        partnerPeriod: yup.string().required(),
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
                      <Row className="justify-content-center">
                        <Col xs={12} xl={8} className="form">
                          <SectionWrapper name="About You">
                            <Row className="justify-content-center">
                              <Col xs={12} lg={7}>
                                {this.renderInput(
                                  "yourIncome",
                                  ...commonAttrs,
                                  {
                                    label: "Your Income",
                                    prepend: "AUD",
                                    required: true,
                                    periodSelect: this.renderSelect(
                                      "yourPeriod",
                                      handleChange,
                                      [
                                        "weekly",
                                        "fortnightly",
                                        "monthly",
                                        "quarterly",
                                        "yearly"
                                      ]
                                    )
                                  }
                                )}
                              </Col>
                              <Col xs={12} lg={5}>
                                {this.renderInput(
                                  "yourExpense",
                                  ...commonAttrs,
                                  {
                                    label: "Your Monthly Expense",
                                    prepend: "AUD",
                                    required: true
                                  }
                                )}
                              </Col>
                              {isCouple && (
                                <React.Fragment>
                                  <Col xs={12} lg={7}>
                                    {this.renderInput(
                                      "partnerIncome",
                                      ...commonAttrs,
                                      {
                                        label: "Partner's Income",
                                        prepend: "AUD",
                                        required: true,
                                        periodSelect: this.renderSelect(
                                          "partnerPeriod",
                                          handleChange,
                                          [
                                            "weekly",
                                            "fortnightly",
                                            "monthly",
                                            "quarterly",
                                            "yearly"
                                          ]
                                        )
                                      }
                                    )}
                                  </Col>
                                  <Col xs={12} lg={5}>
                                    {this.renderInput(
                                      "partnerExpense",
                                      ...commonAttrs,
                                      {
                                        label: "Partner's Monthly Expense",
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
                          <Row
                            noGutters
                            className="justify-content-between  mt-4"
                          >
                            <Col xs={4} lg={3}>
                              {this.renderCustomButton("Back", () =>
                                previousStep()
                              )}
                            </Col>
                            <Col xs={4} lg={3}>
                              {this.renderSubmitButton("Next")}
                            </Col>
                          </Row>
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
