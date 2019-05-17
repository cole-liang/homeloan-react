import React from "react";
import { shallow } from "enzyme";
import { Logout } from "../../../components/common/logout";

describe("Logout Component Test", () => {
  const logout = jest.fn();
  const history = { push: jest.fn() };
  const props = { logout, history };
  const wrapper = shallow(<Logout {...props} />);

  it("should render Logout component", () => {
    expect(history.push).toBeCalledWith("/");
    expect(logout).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
