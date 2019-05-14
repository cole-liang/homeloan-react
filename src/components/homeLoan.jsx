import React, { Component } from "react";

import { Row, Col, Button } from "react-bootstrap";

import bannerBg from "../assets/bannerbg.jpg";
import styled from "styled-components";

const HomeLoanDiv = styled.div`
  height: 100%;
  background: url(${props => props.bannerBg}) no-repeat 82% bottom / cover;

  & .title {
    font-size: 40px;
  }

  & .content {
    margin-left: 50px;
  }
`;

class HomeLoan extends Component {
  state = {};

  render() {
    return (
      <HomeLoanDiv bannerBg={bannerBg}>
        <Col
          md={5}
          className="content noPadding h-100 d-flex flex-column justify-content-center"
        >
          <Row noGutters>
            <div className="title">We are helping people</div>
            <div className="title">
              <strong>just like you!</strong>
            </div>
          </Row>
          <Row noGutters>
            <div className="">I'm looking to</div>
          </Row>
          <Row noGutters>
            <Button>Get Started</Button>
          </Row>
        </Col>
      </HomeLoanDiv>
    );
  }
}

export default HomeLoan;
