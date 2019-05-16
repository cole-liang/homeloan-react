import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as CoupleSVG } from "../assets/couple.svg";
import { ReactComponent as SingleSVG } from "../assets/single.svg";

import styled from "styled-components";

const ChooseCategoryDiv = styled.div`
  & .coupleSvg {
    position: relative;
    top: -6px;
  }

  & [id$="Icon"] {
    cursor: pointer;
    transition: all 0.6s;
  }

  & [id$="Icon"]:hover {
    transform: scale(1.1);
  }
`;

export class ChooseCategory extends Component {
  handleClick = category => {
    this.props.onClick(category);
  };

  render() {
    const { user } = this.props;
    const welcomeMsg = !!user
      ? `Welcome ${user.firstName}! Choose one to get you on board:`
      : "Welcome! Choose one to get you on board:";

    return (
      <ChooseCategoryDiv className="d-flex flex-column justify-content-center flex-grow-1">
        <Row noGutters className="noPadding">
          <div className="welcomeText my-3">{welcomeMsg}</div>
        </Row>
        <Row noGutters className="noPadding">
          <Col xs={12} md={6}>
            <Row noGutters className="justify-content-center my-4">
              <div id="singleIcon" onClick={() => this.handleClick("single")}>
                <SingleSVG className="singleSvg" />
                <div className="iconDesc text-center">Single</div>
              </div>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row noGutters className="justify-content-center my-4">
              <div id="coupleIcon" onClick={() => this.handleClick("couple")}>
                <CoupleSVG className="coupleSvg" />
                <div className="iconDesc text-center">Couple</div>
              </div>
            </Row>
          </Col>
        </Row>
      </ChooseCategoryDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(ChooseCategory);
