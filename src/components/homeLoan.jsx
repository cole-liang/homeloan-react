import React, { Component } from "react";

import { Select } from "antd";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import bannerBg from "../assets/bannerbg.jpg";
import styled from "styled-components";

const Option = Select.Option;

const HomeLoanDiv = styled.div`
  height: 100%;
  background: url(${props => props.bannerBg}) no-repeat 82% bottom / cover;

  & .title {
    font-size: 40px;
  }

  & .content {
    margin-left: 200px;
  }

  & .choices {
    font-size: 30px;
  }

  & .selectBox {
    font-size: 18px;
    width: 100%;
  }

  & .bannerBg {
    max-width: 100%;
    max-height: 100%;
  }

  & .getStartedText {
    font-size: 20px;
  }

  /* display: lg(large screen) */
  @media only screen and (max-width: 1024px) {
    & .content {
      padding: 20px;
      margin-left: 0px;
      background-color: rgba(255, 255, 255, 0.8);
    }

    & .title {
      font-size: 55px;
    }

    & .choices {
      font-size: 35px;
    }

    & .selectBox {
      font-size: 22px;
    }

    & .getStartedText {
      font-size: 30px;
    }
  }

  /* display: sm-md(small to middle screen) */
  @media only screen and (max-width: 767.5px) {
    & .title {
      font-size: 26px;
    }

    & .choices {
      font-size: 22px;
    }

    & .selectBox {
      font-size: 17px;
    }

    & .getStartedText {
      font-size: 17px;
    }
  }
`;

class HomeLoan extends Component {
  state = {};

  render() {
    return (
      <HomeLoanDiv bannerBg={bannerBg}>
        <Col className="h-100 noPadding d-flex flex-column justify-content-center">
          <Row
            noGutters
            className="content justify-content-center justify-content-xl-start"
          >
            <Col xs={10} className="noPadding">
              <Row noGutters>
                <Col>
                  <div className="title">We are helping people</div>
                  <div className="title">
                    <strong>just like you!</strong>
                  </div>
                </Col>
              </Row>
              <Row noGutters className="choices my-3">
                <Col xs={12} md={6} xl={4}>
                  <div>I'm looking to</div>
                  <Select defaultValue="firstHome" className="selectBox">
                    <Option value="firstHome">
                      Buy or build my first home
                    </Option>
                    <Option value="invest">Invest in property</Option>
                  </Select>
                </Col>
              </Row>
              <Row noGutters>
                <Link to="/getStarted/1">
                  <Button variant="info" className="getStartedText">
                    Get Started
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Col>
      </HomeLoanDiv>
    );
  }
}

export default HomeLoan;
