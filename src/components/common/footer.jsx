import React from "react";

import styled from "styled-components";
import * as global from "../globalValues";

const FooterStyle = styled.footer`
  background: #fff;
  /* color: #6c7073; */
  color: #9fa3a6;
  border-top: 1px solid #e2dee6;
  text-align: center;
  padding: 15px 0;
  background: #343a40;
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-above">
        <div className="footer-about" />
        <div className="footer-social" />
      </div>
    </FooterStyle>
  );
};

export default Footer;
