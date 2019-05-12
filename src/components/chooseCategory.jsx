import React, { Component } from "react";
import styled from "styled-components";

import { Row, Col } from "react-bootstrap";
import { ReactComponent as CoupleSVG } from "../assets/couple.svg";
import { ReactComponent as SingleSVG } from "../assets/single.svg";

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

class ChooseCategory extends Component {
  handleClick = category => {
    this.props.onClick(category);
  };

  render() {
    return (
      <ChooseCategoryDiv className="d-flex flex-column justify-content-center flex-grow-1">
        <Row noGutters className="noPadding">
          <div className="welcomeText my-3">Welcome and choose one</div>
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

export default ChooseCategory;
