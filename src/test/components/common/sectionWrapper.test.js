import React from "react";
import { shallow } from "enzyme";
import SectionWrapper from "../../../components/common/sectionWrapper";

describe("SectionWrapper Component Test", () => {
  const children = <div>Test message</div>;
  const name = "Test Section";
  const props = { children, name };

  it("should render SectionWrapper component", () => {
    const wrapper = shallow(<SectionWrapper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
