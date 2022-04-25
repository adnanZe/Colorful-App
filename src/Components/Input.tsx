import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

type InputProps = {
  label: Path<FormRGBInputs>;
  register: UseFormRegister<FormRGBInputs>;
};

function Input(props: InputProps): JSX.Element {
  const { label, register } = props;

  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <input type="number" {...register(label)} id={label} />
    </div>
  );
}

export default Input;
