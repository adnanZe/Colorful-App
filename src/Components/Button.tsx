import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}
interface ButtonProps {
  classNames: string[];
  innerText: string;
  type: ButtonType;
  handleClick?(): void;
  isDisabled?: boolean;
}

function Button(props: ButtonProps): JSX.Element {
  const { classNames, innerText, type, handleClick, isDisabled } = props;

  return (
    <button
      className={`button-colorful ${classNames.join(' ')}`}
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {/* <FontAwesomeIcon icon={faEye} /> */}
      {innerText == 'Preview' ? <FontAwesomeIcon icon={faEye} /> : innerText}
    </button>
  );
}

export default Button;
