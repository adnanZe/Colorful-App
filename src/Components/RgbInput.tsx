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
  isError?: boolean;
  isDisabled?: boolean;
};
// memo
function Input(props: InputProps): JSX.Element {
  const { label, register, handleChange, isError, isDisabled } = props;

  return (
    <input
      type="number"
      {...register(label, { onChange: handleChange })}
      id={label}
      className={isError ? 'error' : ''}
      disabled={isDisabled}
      placeholder={label}
    />
  );
}

export default Input;
