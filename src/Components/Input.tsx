import React, { BaseSyntheticEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

type InputProps = {
  label: Path<FormRGBInputs>;
  register: UseFormRegister<FormRGBInputs>;
  handleChange?(e: BaseSyntheticEvent): void;
};

function Input(props: InputProps): JSX.Element {
  const { label, register, handleChange } = props;

  return (
    <div>
      <label>{label}:</label>
      <input
        type="number"
        {...register(label, { onChange: handleChange })}
        id={label}
      />
    </div>
  );
}

export default Input;
