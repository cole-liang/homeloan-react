import React from "react";
import { shallow } from "enzyme";
import PasswordStrengthMeter from "../../../components/common/passwordStrengthMeter";

describe("PasswordStrengthMeter Component Test", () => {
  const weakPassword = "liang1";
  const fairPassword = "liang1col";
  const goodPassword = "liang1cole";
  const strongPassword = "liang1cole123";

  it("should render PasswordStrengthMeter with Weak label", () => {
    const props = { password: weakPassword };
    const wrapper = shallow(<PasswordStrengthMeter {...props} />);
    expect(
      wrapper
        .find("Bootstrap(ProgressBar)")
        .at(0)
        .prop("label")
    ).toBe("Weak");
    expect(wrapper).toMatchSnapshot();
  });

  it("should render PasswordStrengthMeter with Fair label", () => {
    const props = { password: fairPassword };
    const wrapper = shallow(<PasswordStrengthMeter {...props} />);
    expect(
      wrapper
        .find("Bootstrap(ProgressBar)")
        .at(0)
        .prop("label")
    ).toBe("Fair");
    expect(wrapper).toMatchSnapshot();
  });

  it("should render PasswordStrengthMeter with Good label", () => {
    const props = { password: goodPassword };
    const wrapper = shallow(<PasswordStrengthMeter {...props} />);
    expect(
      wrapper
        .find("Bootstrap(ProgressBar)")
        .at(0)
        .prop("label")
    ).toBe("Good");
    expect(wrapper).toMatchSnapshot();
  });

  it("should render PasswordStrengthMeter with Strong label", () => {
    const props = { password: strongPassword };
    const wrapper = shallow(<PasswordStrengthMeter {...props} />);
    expect(
      wrapper
        .find("Bootstrap(ProgressBar)")
        .at(0)
        .prop("label")
    ).toBe("Strong");
    expect(wrapper).toMatchSnapshot();
  });
});
