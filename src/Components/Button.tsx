import React from 'react';

interface ButtonProps {
  classNames: string[];
  innerText: string;
  type: 'button' | 'submit';
}

function Button(props: ButtonProps): JSX.Element {
  const { classNames, innerText, type } = props;

  return (
    <button className={`button-colorful ${classNames.join(' ')}`} type={type}>
      {innerText}
    </button>
  );
}

export default Button;
