import React, { BaseSyntheticEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

export interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

type InputProps = {
  label: Path<FormRGBInputs>;
  register: UseFormRegister<FormRGBInputs>;
  handleChange?(e: BaseSyntheticEvent): void;
};
// memo
function Input(props: InputProps): JSX.Element {
  const { label, register, handleChange } = props;

  return (
    <label>
      {label}:
      <input
        type="number"
        {...register(label, { onChange: handleChange })}
        id={label}
      />
    </label>
  );
}

export default Input;
