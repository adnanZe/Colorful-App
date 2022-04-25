import React from 'react';

interface ButtonProps {
  classNames: string[];
  innerText: string;
  type: 'button' | 'submit';
  onClick?(): void;
}

function Button(props: ButtonProps): JSX.Element {
  const { classNames, innerText, type, onClick } = props;

  return (
    <button
      className={`button-colorful ${classNames.join(' ')}`}
      type={type}
      onClick={onClick}
    >
      {innerText}
    </button>
  );
}

export default Button;
