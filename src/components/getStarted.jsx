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
`;

const Step = Steps.Step;

class GetStarted extends Component {
  state = { currentStep: 2, category: "", canHelp: false };

  previousStep = currentStep => {
    this.setState({ currentStep: currentStep - 1 });
  };

  nextStep = currentStep => {
    this.setState({ currentStep: currentStep + 1 });
  };

  handleCategory = category => {
    const { currentStep } = this.state;
    this.setState({ category });
    this.nextStep(currentStep);
  };

  handleSubmit = data => {
    const { currentStep } = this.state;
    const canHelp = this.calculateProb(data);
    console.log(data, canHelp);
    this.setState({ canHelp }, () => {
      this.nextStep(currentStep);
    });
  };

  calculateProb = ({
    yourIncome,
    yourExpense,
    partnerIncome,
    partnerExpense,
    propertyValue,
    deposit
  }) => {
    const x1 =
      Number.parseFloat(yourExpense) +
      (partnerExpense ? Number.parseFloat(partnerExpense) : 0);
    const x2 =
      Number.parseFloat(yourIncome) +
      (partnerIncome ? Number.parseFloat(partnerIncome) : 0);
    const x = x1 / x2;

    const y = Number.parseFloat(deposit) / Number.parseFloat(propertyValue);

    return x <= 0.5 && y >= 0.2;
  };

  render() {
    const { currentStep, category, canHelp, data } = this.state;
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
                <ChooseCategory onClick={this.handleCategory} />
              )}
              {currentStep === 1 && (
                <LoanInfoForm
                  isCouple={category === "couple"}
                  previousStep={() => this.previousStep(currentStep)}
                  onSubmit={this.handleSubmit}
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
