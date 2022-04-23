import React from 'react';

interface ButtonProps {
  classNames: string[];
  innerText: string;
}

function Button(props: ButtonProps): JSX.Element {
  const { classNames, innerText } = props;

  return (
    <button className={`button-colorful ${classNames.join(' ')}`}>
      {innerText}
    </button>
  );
}

export default Button;
