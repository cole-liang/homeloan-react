import React from "react";

import { Alert } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const successTip = "Congratulation! We can help you!";
const successMsgWithoutLogin =
  "It is easy to get more home loan for you with just one further step:";
const warningTip = "We need more information to help you...";
const warningMsg = "Please give us a call for further assistance.";

const Result = ({ canHelp }) => {
  canHelp = true;
  //   canHelp = false;
  return (
    <Col xs={12} className="d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={11}>
          {canHelp && (
            <Alert
              message={successTip}
              description={
                <div>
                  {successMsgWithoutLogin}{" "}
                  <Link to="/register">Click to register</Link>
                </div>
              }
              type="success"
              showIcon
            />
          )}
          {!canHelp && (
            <Alert
              message={warningTip}
              description={
                <div>
                  <div>{warningMsg}</div>
                </div>
              }
              type="warning"
              showIcon
            />
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default Result;
