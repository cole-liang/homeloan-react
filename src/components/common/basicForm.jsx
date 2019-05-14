import React, { Component } from "react";

import { Form, Button, InputGroup } from "react-bootstrap";

import styled from "styled-components";

const InputDiv = styled.div`
  & .inputToolTip {
    font-size: 13px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.5);
  }

  & [id$="Icon"] {
    margin-left: 0px !important;
  }

  & .asterisk::before {
    content: "*";
    color: red;
    margin-right: 5px;
  }

  /* sm-md(small to middle screen)*/
  @media only screen and (max-width: 767.5px) {
    & .periodSelect select {
      width: 90px;
      padding: 3px;
    }
  }
`;

class BasicForm extends Component {
  renderInput = (
    path,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    options = {}
  ) => {
    const {
      label,
      handleFocus,
      type = "text",
      posFeedback = "Looks good!",
      prepend,
      pwdStrengthMeter,
      placeholder,
      toolTip,
      passwordChange,
      required = false,
      periodSelect = null
    } = options;
    return (
      <InputDiv>
        <Form.Group controlId={`${path}Validation`}>
          {label && (
            <Form.Label>
              <div className="labelText">
                {required && <span className="asterisk" />}
                {label}
              </div>
            </Form.Label>
          )}
          {toolTip && (
            <div className="inputToolTip d-block d-md-none">{toolTip}</div>
          )}
          {passwordChange && pwdStrengthMeter}
          <InputGroup>
            {prepend && (
              <InputGroup.Prepend>
                <InputGroup.Text id={`${path}Prepend`}>
                  {prepend}
                </InputGroup.Text>
              </InputGroup.Prepend>
            )}
            <Form.Control
              type={type}
              name={path}
              value={values[path]}
              placeholder={placeholder ? placeholder : label}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isValid={posFeedback && touched[path] && !errors[path]}
              isInvalid={touched[path] && !!errors[path]}
            />
            <div className="periodSelect ml-2">{periodSelect}</div>
            {posFeedback && (
              <Form.Control.Feedback>{posFeedback}</Form.Control.Feedback>
            )}
            <Form.Control.Feedback type="invalid">
              {errors[path]}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </InputDiv>
    );
  };

  renderSelect = (path, handleChange, options) => (
    <Form.Control as="select" name={path} onChange={handleChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  );

  renderCheckBox = (
    label,
    path,
    touched,
    errors,
    handleChange,
    options = {}
  ) => {
    const { required = false } = options;
    return (
      <InputDiv>
        <Form.Group>
          <Form.Check
            name={path}
            label={
              <div>
                {required && <span className="asterisk" />}
                {label}
              </div>
            }
            onChange={handleChange}
            isInvalid={touched[path] && !!errors[path]}
            feedback={errors[path]}
            id={`${path}Validation`}
          />
        </Form.Group>
      </InputDiv>
    );
  };

  renderSubmitButton = label => (
    <Button variant="outline-primary" type="submit" block>
      {label}
    </Button>
  );

  renderCustomButton = (
    label,
    onClick,
    variant = "outline-primary",
    type = "button"
  ) => (
    <Button variant={variant} type={type} onClick={onClick} block>
      {label}
    </Button>
  );

  renderCustomSubmitButton = (label, variant = "outline-primary") => (
    <Button variant={variant} type="submit" block>
      {label}
    </Button>
  );
}

export default BasicForm;
