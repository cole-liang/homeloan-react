import React from "react";
import { shallow } from "enzyme";
import { HomeLoan } from "./../../components/homeLoan";

describe("HomeLoan Component Test", () => {
  it("should render HomeLoan component", () => {
    const wrapper = shallow(<HomeLoan />);
    expect(wrapper).toMatchSnapshot();
  });
});
