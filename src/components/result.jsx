import React from "react";

import { Alert } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

const Result = ({ canHelp, user }) => {
  const successTip = !!user
    ? `Congratulation ${user.firstName}, we can help you!`
    : "Congratulation! We can help you!";
  const successMsg = !!user ? (
    <div>
      Please follow the <Link to="/">instructions</Link> to get your home loan.
    </div>
  ) : (
    <div>
      It is easy to get more home loan for you with just one further step:{" "}
      <Link to="/register">Click to register</Link>
    </div>
  );

  const warningTip = !!user
    ? `Hey ${user.firstName}, we need more information to help you...`
    : "We need more information to help you...";
  const warningMsg = (
    <div>
      <div>Please give us a call for further assistance.</div>
      <div>
        Or you may want to <Link to="/getStarted/1">start over</Link> again to
        change your info
      </div>
    </div>
  );

  return (
    <Col xs={12} className="d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={11}>
          {canHelp && (
            <Alert
              message={successTip}
              description={successMsg}
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Result);
