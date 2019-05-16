import React from "react";
import { shallow } from "enzyme";
import { Result } from "../../components/result";
import testUsers from "../fixture/users";

describe("Result Component Test", () => {
  const testUser = testUsers[0];

  it("should render result of being able to help the customers WITH user logged in", () => {
    const props = { canHelp: true, user: testUser };
    const wrapper = shallow(<Result {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render result of NOT being able to help the customers WITH user logged in", () => {
    const props = { canHelp: false, user: testUser };
    const wrapper = shallow(<Result {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render result of being able to help the customers WITHOUT user logged in", () => {
    const props = { canHelp: true, user: null };
    const wrapper = shallow(<Result {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render result of NOT being able to help the customers WITHOUT user logged in", () => {
    const props = { canHelp: false, user: null };
    const wrapper = shallow(<Result {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
