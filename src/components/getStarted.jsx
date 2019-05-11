import React, { Component } from "react";

import { Steps } from "antd";

import styled from "styled-components";

const GetStartedDiv = styled.div``;

const Step = Steps.Step;

class GetStarted extends Component {
  state = { currentStep: 0 };
  render() {
    return (
      <GetStartedDiv>
        <Steps className="steps" current={currentStep}>
          <Step key="choose" title="Choose" />
          <Step key="basicInfo" title="Basic Info" />
          <Step key="detailOverview" title="Detail Overview" />
        </Steps>
      </GetStartedDiv>
    );
  }
}

export default GetStarted;
