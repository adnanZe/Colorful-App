import React from 'react';

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
      {innerText}
    </button>
  );
}

export default Button;
