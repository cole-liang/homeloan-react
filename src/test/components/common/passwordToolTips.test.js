import React from "react";
import { shallow } from "enzyme";
import PasswordToolTips from "../../../components/common/passwordTooltips";

describe("PasswordToolTips Component Test", () => {
  const pwdCharactersNumError = "Password must have 6-16 characters";
  const pwdAlphaDigitError = "At least one alphabet and one number";
  const pwdTypeError = "Contains only 0-9, a-z, A-Z and _";
  const possibleErrors = {
    pwdCharactersNumError,
    pwdAlphaDigitError,
    pwdTypeError
  };

  it("should render PasswordToolTips without errors", () => {
    const props = { possibleErrors, passwordErrors: [] };
    const wrapper = shallow(<PasswordToolTips {...props} />).dive();
    expect(wrapper).toMatchSnapshot();

    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdAlphaDigitInvalid")
    ).toBe(false);
    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdCharactersNumInvalid")
    ).toBe(false);
    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdTypeInvalid")
    ).toBe(false);
  });

  it("should render PasswordToolTips with all errors", () => {
    const props = {
      possibleErrors,
      passwordErrors: [pwdCharactersNumError, pwdAlphaDigitError, pwdTypeError]
    };
    const wrapper = shallow(<PasswordToolTips {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdAlphaDigitInvalid")
    ).toBe(true);
    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdCharactersNumInvalid")
    ).toBe(true);
    expect(
      wrapper
        .find("StyledComponent")
        .at(0)
        .prop("isPwdTypeInvalid")
    ).toBe(true);
  });
});
