import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button, { ButtonType } from '../Components/Button';
import Input, { FormRGBInputs } from '../Components/RgbInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import { useDispatch, useSelector } from 'react-redux';
import { boxAdded } from '../Store/Actions';
import { getIsMaximum } from '../Store/Reducers';

function BoxInserter(): JSX.Element {
  const isMaximum = useSelector(getIsMaximum);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<FormRGBInputs>({ resolver: yupResolver(schema), mode: 'onBlur' });

  function onSubmit(data: FormRGBInputs): void {
    dispatch(
      boxAdded({
        red: String(data.red),
        green: String(data.green),
        blue: String(data.blue),
      })
    );
    reset();
  }

  const handleRandomRGB = useCallback(() => {
    dispatch(
      boxAdded({
        red: String(Math.floor(Math.random() * 256)),
        green: String(Math.floor(Math.random() * 256)),
        blue: String(Math.floor(Math.random() * 256)),
      })
    );
  }, [dispatch]);

  return (
    <section className="box-inserter">
      <h3>Box Inserter</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="red"
          register={register}
          isError={errors.red ? true : false}
        />
        <Input
          label="green"
          register={register}
          isError={errors.green ? true : false}
        />
        <Input
          label="blue"
          register={register}
          isError={errors.blue ? true : false}
        />
        <p className="errors-inserter">
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </p>
        <Button
          classNames={['insert']}
          innerText={'Insert'}
          type={ButtonType.submit}
          isDisabled={!isValid || !isDirty}
        />
        <Button
          classNames={['insert-random']}
          innerText={'Insert random'}
          type={ButtonType.button}
          onClick={handleRandomRGB}
        />
        {isMaximum && (
          <p className="alert-maximum">Maximum number of 9 boxes reached.</p>
        )}
      </form>
    </section>
  );
}

export default BoxInserter;
