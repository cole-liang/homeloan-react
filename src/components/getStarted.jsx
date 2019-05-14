import React, { Component } from "react";
import ChooseCategory from "./chooseCategory";
import LoanInfoForm from "./loanInfoForm";
import Result from "./result";

import { Steps } from "antd";
import { Row, Col } from "react-bootstrap";

import styled from "styled-components";

const GetStartedDiv = styled.div`
  background: #fff;
  height: 100%;

  & .welcomeText {
    font-size: 25px;
  }

  /* Resolve conflict between Ant Design and Bootstrap*/
  & .steps svg {
    vertical-align: inherit;
  }

  @media screen and (max-width: 767.5px) {
    & .steps svg {
      vertical-align: middle;
    }
  }
`;

const Step = Steps.Step;

class GetStarted extends Component {
  state = { category: "", canHelp: false };

  componentDidMount() {
    if (!["1", "2", "3"].includes(this.props.match.params.step))
      this.props.history.push("/notFound");
  }

  setStep = step => {
    this.props.history.push(`/getStarted/${step + 1}`);
  };

  previousStep = currentStep => {
    this.setStep(currentStep - 1);
  };

  nextStep = currentStep => {
    this.setStep(currentStep + 1);
  };

  handleCategory = (category, currentStep) => {
    this.setState({ category });
    this.nextStep(currentStep);
  };

  handleSubmit = (data, currentStep) => {
    const canHelp = this.calculateProb(data);
    this.setState({ canHelp }, () => {
      this.nextStep(currentStep);
    });
  };

  calculateYearlyIncome = (income, period) => {
    switch (period) {
      case "weekly":
        return income * 52;
      case "fortnightly":
        return income * 26;
      case "monthly":
        return income * 12;
      case "quarterly":
        return income * 4;
      default:
        return income;
    }
  };

  calculateProb = ({
    yourIncome,
    yourPeriod,
    yourExpense,
    partnerIncome,
    partnerPeriod,
    partnerExpense,
    propertyValue,
    deposit
  }) => {
    const totalYealyExpense =
      12 *
      (Number.parseFloat(yourExpense) +
        (partnerExpense ? Number.parseFloat(partnerExpense) : 0));

    let yourYearlyIncome = this.calculateYearlyIncome(
      Number.parseFloat(yourIncome),
      yourPeriod
    );

    let partnerYearlyIncome = partnerIncome
      ? this.calculateYearlyIncome(
          Number.parseFloat(partnerIncome),
          partnerPeriod
        )
      : 0;

    const totalYealyIncome = yourYearlyIncome + partnerYearlyIncome;

    const x = totalYealyExpense / totalYealyIncome;

    const y = Number.parseFloat(deposit) / Number.parseFloat(propertyValue);

    return x <= 0.5 && y >= 0.2;
  };

  render() {
    const { category, canHelp } = this.state;
    const { step } = this.props.match.params;
    const currentStep = Number.parseInt(step) - 1;

    return (
      <GetStartedDiv>
        <Row noGutters className="noPadding justify-content-center py-5 h-100">
          <Col xs={11} md={9} className="d-flex flex-column">
            <Steps className="steps mb-3" current={currentStep}>
              <Step key="choose" title="Choose" />
              <Step key="basicInfo" title="Basic Info" />
              <Step key="result" title="Result" />
            </Steps>
            <div className="d-flex flex-column justify-content-center flex-grow-1">
              {currentStep === 0 && (
                <ChooseCategory
                  onClick={category =>
                    this.handleCategory(category, currentStep)
                  }
                />
              )}
              {currentStep === 1 && (
                <LoanInfoForm
                  isCouple={category === "couple"}
                  previousStep={() => this.previousStep(currentStep)}
                  onSubmit={data => this.handleSubmit(data, currentStep)}
                />
              )}
              {currentStep === 2 && <Result canHelp={canHelp} />}
            </div>
          </Col>
        </Row>
      </GetStartedDiv>
    );
  }
}

export default GetStarted;
