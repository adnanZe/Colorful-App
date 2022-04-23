import React from 'react';

interface InputProps {
  color: string;
  colorId: string;
}

export const Input: any = React.forwardRef(
  (props: InputProps, ref: any): JSX.Element => {
    // const { color, colorId } = props;

    return (
      <div className="input-container">
        <label htmlFor={props.colorId}>{props.color}:</label>
        <input type="number" id={props.colorId} ref={ref} />
      </div>
    );
  }
);

Input.displayName = 'Input Component';
