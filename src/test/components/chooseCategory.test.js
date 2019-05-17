import React from "react";
import { shallow } from "enzyme";
import { ChooseCategory } from "./../../components/chooseCategory";
import testUsers from "../fixture/users";

describe("ChooseCategory Component Test", () => {
  const testUser = testUsers[0];
  const onClick = jest.fn();
  const props = { onClick, user: testUser };
  const wrapper = shallow(<ChooseCategory {...props} />);

  it("should render ChooseCategory component WITH user logged in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render ChooseCategory component WITHOUT user logged in", () => {
    const propsWithoutUser = { ...props, user: null };
    const wrapperWithoutUser = shallow(
      <ChooseCategory {...propsWithoutUser} />
    );
    expect(wrapperWithoutUser).toMatchSnapshot();
  });

  it("onClick should be called when clicking Single", () => {
    wrapper
      .find("div#singleIcon")
      .at(0)
      .prop("onClick")();
    expect(onClick).toBeCalledWith("single");
  });

  it("onClick should be called when clicking Couple", () => {
    wrapper
      .find("div#coupleIcon")
      .at(0)
      .prop("onClick")();
    expect(onClick).toBeCalledWith("couple");
  });
});
