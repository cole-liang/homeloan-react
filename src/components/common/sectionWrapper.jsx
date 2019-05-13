import React from "react";

import styled from "styled-components";

const WrapperDiv = styled.div`
  position: relative;

  & .wrapper {
    border: 1px solid purple;
    border-radius: 15px;
    padding: 20px 20px 10px 20px;
    margin-bottom: 30px;
  }

  & .wrapperName {
    position: absolute;
    color: purple;
    font-size: 20px;
    top: -17px;
    left: 16px;
    background: #fff;
    padding: 0px 6px;
    z-index: 0;
  }
`;

const SectionWrapper = ({ children, name }) => {
  return (
    <WrapperDiv>
      <span className="wrapperName">{name}</span>
      <div className="wrapper">{children}</div>
    </WrapperDiv>
  );
};

export default SectionWrapper;
