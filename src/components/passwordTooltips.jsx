import React from "react";
import styled from "styled-components";

const PasswordToolTipsDiv = styled.div`
  & #pwdCharactersNumErrorText {
    color: ${props => (props.isPwdCharactersNumInvalid ? "red" : "green")};
  }

  & #pwdCharactersNumErrorIcon {
    margin-left: 30px;
  }

  & #pwdCharactersNumErrorIcon .fa-check-circle {
    display: ${props =>
      props.isPwdCharactersNumInvalid ? "none" : "inline-block"};
  }

  & #pwdCharactersNumErrorIcon .fa-times-circle {
    display: ${props =>
      props.isPwdCharactersNumInvalid ? "inline-block" : "none"};
  }

  & #pwdAlphaDigitErrorText {
    color: ${props => (props.isPwdAlphaDigitInvalid ? "red" : "green")};
  }

  & #pwdAlphaDigitErrorIcon {
    margin-left: 16px;
  }

  & #pwdAlphaDigitErrorIcon .fa-check-circle {
    display: ${props =>
      props.isPwdAlphaDigitInvalid ? "none" : "inline-block"};
  }

  & #pwdAlphaDigitErrorIcon .fa-times-circle {
    display: ${props =>
      props.isPwdAlphaDigitInvalid ? "inline-block" : "none"};
  }

  & #pwdTypeErrorText {
    color: ${props => (props.isPwdTypeInvalid ? "red" : "green")};
  }

  & #pwdTypeErrorIcon {
    margin-left: 53px;
  }

  & #pwdTypeErrorIcon .fa-check-circle {
    display: ${props => (props.isPwdTypeInvalid ? "none" : "inline-block")};
  }

  & #pwdTypeErrorIcon .fa-times-circle {
    display: ${props => (props.isPwdTypeInvalid ? "inline-block" : "none")};
  }

  & i {
    font-size: 17px;
  }

  & i.fa-check-circle {
    color: green;
  }

  & i.fa-times-circle {
    color: red;
  }
`;

const PasswordToolTips = ({ possibleErrors, passwordErrors }) => {
  return (
    <PasswordToolTipsDiv
      isPwdCharactersNumInvalid={passwordErrors.includes(
        possibleErrors.pwdCharactersNumError
      )}
      isPwdAlphaDigitInvalid={passwordErrors.includes(
        possibleErrors.pwdAlphaDigitError
      )}
      isPwdTypeInvalid={passwordErrors.includes(possibleErrors.pwdTypeError)}
    >
      {Object.keys(possibleErrors).map(error => (
        <p key={`${error}Text`} id={`${error}Text`}>
          {possibleErrors[error]}
          <span id={`${error}Icon`}>
            <i className="fa fa-check-circle" />
            <i className="fa fa-times-circle" />
          </span>
        </p>
      ))}
    </PasswordToolTipsDiv>
  );
};

export default PasswordToolTips;
