import React, { Component } from "react";

import { ProgressBar } from "react-bootstrap";

import zxcvbn from "zxcvbn";

class PasswordStrengthMeter extends Component {
  createPasswordLabel = result => {
    switch (result.score) {
      case 2:
        return { percent: 50, variant: "warning", label: "Fair" };
      case 3:
        return { percent: 75, variant: "info", label: "Good" };
      case 4:
        return { percent: 100, variant: "success", label: "Strong" };
      default:
        return { percent: 25, variant: "danger", label: "Weak" };
    }
  };

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
    const { variant, percent, label } = this.createPasswordLabel(testedResult);
    return <ProgressBar variant={variant} label={label} now={percent} />;
  }
}

export default PasswordStrengthMeter;
