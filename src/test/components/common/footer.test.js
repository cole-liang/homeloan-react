import React from "react";
import { shallow } from "enzyme";
import Footer from "../../../components/common/footer";

describe("Footer Component Test", () => {
  it("should render Footer component", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
