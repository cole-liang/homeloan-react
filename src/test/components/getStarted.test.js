import React from "react";
import { shallow } from "enzyme";
import { GetStarted } from "./../../components/getStarted";
import {
  singleData,
  singleDataFalse1,
  singleDataFalse2,
  singleDataFalse3,
  coupleData
} from "../fixture/loanInfoForm";

describe("GetStarted Component Test", () => {
  const wrongStep = { params: { step: "0" } };
  const firstStep = { params: { step: "1" } };
  const history = { push: jest.fn() };
  const props = { match: firstStep, history };

  it("should render GetStarted component with wrong step", () => {
    const badProps = { ...props, match: wrongStep };
    const wrapper = shallow(<GetStarted {...badProps} />);
    expect(history.push).toBeCalledWith("/notFound");
    expect(wrapper).toMatchSnapshot();
  });

  describe("Calculate probability test", () => {
    const wrapperInstance = shallow(<GetStarted {...props} />).instance();

    it("With eligible single data(weekly)", () => {
      expect(wrapperInstance.calculateProb(singleData)).toBe(true);
    });

    it("With ineligible single data1(fortnightly)", () => {
      expect(wrapperInstance.calculateProb(singleDataFalse1)).toBe(false);
    });

    it("With ineligible single data2", () => {
      expect(wrapperInstance.calculateProb(singleDataFalse2)).toBe(false);
    });

    it("With ineligible single data3(monthly)", () => {
      expect(wrapperInstance.calculateProb(singleDataFalse3)).toBe(false);
    });

    it("With eligible couple data(quarterly, yearly)", () => {
      expect(wrapperInstance.calculateProb(coupleData)).toBe(true);
    });
  });

  describe("Render ChooseCategory component", () => {
    const wrapper = shallow(<GetStarted {...props} />);

    it("should render ChooseCategory component if currentStep is 1", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should set category and go to step 2 when clicking single category in ChooseCategory component", () => {
      const category = "single";
      wrapper
        .find("ConnectFunction")
        .at(0)
        .prop("onClick")(category);
      expect(wrapper.state("category")).toBe(category);
      expect(history.push).toBeCalledWith("/getStarted/2");
    });
  });

  describe("Render LoanInfoForm component", () => {
    const secondStep = { params: { step: "2" } };
    const newProps = { ...props, match: secondStep };
    const wrapper = shallow(<GetStarted {...newProps} />);

    const loanInfoFormWrapper = wrapper.find("LoanInfoForm").at(0);

    it("should render LoanInfoForm component if currentStep is 2", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should go back 1 step when clicking 'Back' button ", () => {
      loanInfoFormWrapper.prop("previousStep")();
      expect(history.push).toBeCalledWith("/getStarted/1");
    });

    it("should set canHelp and go to step 3 when clicking 'Next' button ", () => {
      loanInfoFormWrapper.prop("onSubmit")(singleData);

      expect(wrapper.state("canHelp")).toBe(true);
      expect(history.push).toBeCalledWith("/getStarted/3");
    });
  });

  describe("Render Result component", () => {
    it("should render Result component if currentStep is 3", () => {
      const thirdStep = { params: { step: "3" } };
      const newProps = { ...props, match: thirdStep };
      const wrapper = shallow(<GetStarted {...newProps} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
