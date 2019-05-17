import React from "react";
import { shallow } from "enzyme";
import { LoanInfoForm } from "./../../components/loanInfoForm";

describe("LoanInfoForm Component Test", () => {
  const previousStep = jest.fn();
  const onSubmit = jest.fn();
  const props = { isCouple: true, previousStep, onSubmit };

  it("should render LoanInfoForm component", () => {
    const wrapper = shallow(<LoanInfoForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  // it("should render LoanInfoForm component with errors with no data", () => {
  //   const wrapper = shallow(<LoanInfoForm {...props} />);
  //   const formikWrapper = wrapper.find("Formik");
  //   const innerFormWrapper = formikWrapper
  //     .dive()
  //     .find("Form")
  //     .dive()
  //     .find("form");
  //   // .dive()
  //   // .find("Form")
  //   // .dive()
  //   // .find("form");

  //   // expect(formWrapper).toMatchSnapshot();

  //   innerFormWrapper.simulate("submit", {
  //     preventDefault: () => {}
  //   });
  //   // formWrapper
  //   //   .find('Button[type="submit"]')
  //   //   .dive()
  //   //   .simulate("click");

  //   // expect(formWrapper.find('Button[type="submit"]').dive()).toMatchSnapshot();
  //   expect(onSubmit).toHaveBeenCalled();
  //   // wrapper
  //   //   .dive()
  //   //   .find("button")
  //   //   .at(1)
  //   //   .simulate("click");

  //   expect(
  //     innerFormWrapper.find('FormControl[name="yourIncome"]').dive()
  //   ).toMatchSnapshot();

  //   // expect(
  //   //   formikWrapper
  //   //     .find('FormControl[name="yourIncome"]')
  //   //     .dive()
  //   //     .hasClass("is-invalid")
  //   // ).to.equal(true);
  // });

  // it("should render LoanInfoForm component without errors", () => {
  //   const wrapper = shallow(<LoanInfoForm {...props} />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it("onSubmit should be called when clicking Next button", () => {
  //   const wrapper = shallow(<LoanInfoForm {...props} />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it("should render LoanInfoForm component", () => {
  //   const wrapper = shallow(<LoanInfoForm {...props} />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it("should render LoanInfoForm component", () => {
  //   const wrapper = shallow(<LoanInfoForm {...props} />);
  //   expect(wrapper).toMatchSnapshot();
  // });
});
