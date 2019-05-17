import React from "react";
import { shallow } from "enzyme";
import { NavigationBar } from "../../../components/common/navigationBar";
import testUsers from "../../fixture/users";

describe("NavigationBar Component Test", () => {
  it("should render NavigationBar component WITH user logged in", () => {
    const testUser = testUsers[0];
    const props = { user: testUser };
    const wrapper = shallow(<NavigationBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render NavigationBar component WITHOUT user logged in", () => {
    const props = { user: null };
    const wrapper = shallow(<NavigationBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render NavigationBar component WITH user login error", () => {
    const error = "Test error";
    const props = { user: { error } };
    const wrapper = shallow(<NavigationBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
