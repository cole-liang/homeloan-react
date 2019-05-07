import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

class BasicForm extends Component {
  renderInput = (
    label,
    path,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleFocus = null,
    type = "text",
    posFeedback = "Looks good!",
    prepend = null
  ) => (
    <Form.Group controlId={`${path}Validation`}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        {prepend && (
          <InputGroup.Prepend>
            <InputGroup.Text id={`${path}Prepend`}>{prepend}</InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <Form.Control
          type={type}
          name={path}
          value={values[path]}
          placeholder={label}
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
  );

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
    <Button type="submit" block>
      {label}
    </Button>
  );
}

export default BasicForm;
