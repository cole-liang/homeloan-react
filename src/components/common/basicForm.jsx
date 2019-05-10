import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";

const InputDiv = styled.div`
  & .inputToolTip {
    font-size: 13px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.5);
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
    options = null
  ) => {
    const {
      label,
      handleFocus,
      type = "text",
      posFeedback = "Looks good",
      prepend,
      pwdStrengthMeter,
      placeholder,
      toolTip
    } = options;
    return (
      <InputDiv>
        <Form.Group controlId={`${path}Validation`}>
          {label && <Form.Label>{label}</Form.Label>}
          {toolTip && (
            <div className="inputToolTip d-block d-md-none">{toolTip}</div>
          )}
          {pwdStrengthMeter}
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

  renderCheckBox = (label, path, touched, errors, handleChange) => (
    <Form.Group>
      <Form.Check
        name={path}
        label={label}
        onChange={handleChange}
        isInvalid={touched[path] && !!errors[path]}
        feedback={errors[path]}
        id={`${path}Validation`}
      />
    </Form.Group>
  );

  renderButton = label => (
    <Button variant="outline-primary" type="submit" block>
      {label}
    </Button>
  );
}

export default BasicForm;
