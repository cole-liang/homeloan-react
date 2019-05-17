import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../../components/common/notFound";

describe("NotFound Component Test", () => {
  it("should render NotFound component", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
