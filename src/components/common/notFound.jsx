import React from "react";

import { Row } from "react-bootstrap";

import styled from "styled-components";

const NotFoundDiv = styled.div`
  padding: 100px 0px;
  height: 100%;
  display: flex;

  & .notFoundBg {
    background: #fff;
  }

  & .notFoundText,
  & .notFoundDesc {
    width: 100%;
    text-align: center;
  }

  & .notFoundText {
    font-size: 300px;
    font-weight: 600;
    color: rebeccapurple;
  }

  & .notFoundDesc {
    color: rgba(0, 0, 0, 0.7);
    font-size: 25px;
  }

  /* display: md(middle screen) */
  @media only screen and (max-width: 767.5px) {
    & .notFoundText {
      font-size: 150px;
    }

    & .notFoundDesc {
      font-size: 20px;
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundDiv>
      <Row
        noGutters
        className="noPadding notFoundBg flex-grow-1 justify-content-center align-items-center"
      >
        <div>
          <div className="notFoundText">404</div>
          <div className="notFoundDesc mb-5 px-2">
            Oops, your page is magically gone, please try again.
          </div>
        </div>
      </Row>
    </NotFoundDiv>
  );
};

export default NotFound;
