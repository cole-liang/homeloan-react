import React from "react";
import styled from "styled-components";

import * as global from "../globalValues";

import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterStyle = styled.footer`
  color: #9fa3a6;
  border-top: 1px solid #e2dee6;
  text-align: center;
  padding: 15px 0;
  background: #272727;

  & .companyBrand {
    opacity: 0.7;
    height: 40px;
    width: 40px;
    margin-top: -6px;
  }

  & .footerAbove {
    margin: 0px 20px;
    border-bottom: 1px solid #6c7073;
  }

  & .footerBelow {
    color: #6c7073;
    margin: 10px 20px 0px 20px;
  }

  & .footerAbove *,
  & .footerBelow * {
    display: inline-block;
  }

  & .footerAbout,
  & .footerBelow {
    font-size: 12px;
  }

  & .footerAbove li:hover,
  & .companyBrand:hover,
  & .legalList li:hover {
    color: #fff;
    opacity: 1;
    cursor: pointer;
  }

  & .footerNav {
    padding-left: 0px;
  }

  & .footerAbove ul {
    list-style: none;
    margin-bottom: 0px;
  }

  & .footerAbove li {
    padding: 0px 12px;
    height: 24px;
  }

  & .footerBelow li {
    padding-left: 9px;
  }

  && .footerSocial {
    margin-bottom: 7px;
  }

  & .dot {
    width: 2px;
    height: 2px;
    border: 1px solid #6c7073;
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    border-radius: 50%;
    background: #6c7073;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <Row className="footerAbove d-flex justify-content-center justify-content-md-between">
        <Col
          xs={12}
          md={6}
          className="footerAbout order-1 order-md-0 d-flex align-items-center justify-content-md-start justify-content-center noPaddingAndMargin"
        >
          <Link to="/">
            <img className="companyBrand" src={global.COMPANY_LOGO_URL} />
          </Link>
          <ul className="footerNav">
            <li>Who We Are</li>
            <li>Contact Us</li>
            <li>Careers</li>
          </ul>
        </Col>
        <Col
          xs={12}
          md={2}
          className="d-flex order-0 order-md-1 justify-content-center justify-content-md-end noPaddingAndMargin"
        >
          <ul className="footerSocial d-flex align-items-center noPaddingAndMargin">
            <li>
              <i className="fa fa-twitter-square" />
            </li>
            <li>
              <i className="fa fa-facebook-square" />
            </li>
            <li>
              <i className="fa fa-google-plus-square" />
            </li>
            <li>
              <i className="fa fa-instagram" />
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="footerBelow d-flex justify-content-between">
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center justify-content-md-start noPaddingAndMargin"
        >
          <span>
            Copyright <i className="fa fa-copyright" /> 2019{" "}
            {global.COMPANY_NAME} All Rights Reserved.
          </span>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center justify-content-md-end noPaddingAndMargin"
        >
          <ul className="legalList noPaddingAndMargin">
            <li>
              Privacy Policy
              <span className="dot" />
            </li>
            <li>
              Terms of Use
              <span className="dot" />
            </li>
            <li>Site Map</li>
          </ul>
        </Col>
      </Row>
    </FooterStyle>
  );
};

export default Footer;
