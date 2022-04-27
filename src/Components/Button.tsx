import React from 'react';

export enum ButtonType {
  button = 'button',
  submit = 'submit',
}
interface ButtonProps {
  classNames: string[];
  innerText: string;
  type: ButtonType;
  onClick?(): void;
  isDisabled?: boolean;
}

function Button(props: ButtonProps): JSX.Element {
  const { classNames, innerText, type, onClick, isDisabled } = props;

  return (
    <button
      className={`button-colorful ${classNames.join(' ')}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {innerText}
    </button>
  );
}

export default Button;
