import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button, { ButtonType } from '../Components/Button';
import Input, { FormRGBInputs } from '../Components/RgbInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import { useDispatch, useSelector } from 'react-redux';
import { boxAdded } from '../Store/Store';
import { store } from '../Store';

function BoxInserter(): JSX.Element {
  const boxesState = useSelector(store.getState);
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
    <article id="box-inserter">
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
        <mark>
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </mark>
        <Button
          classNames={['insert']}
          innerText={'Insert'}
          type={ButtonType.SUBMIT}
          isDisabled={!isValid || !isDirty}
        />
      </form>

      <section>
        <Button
          classNames={['insert-random']}
          innerText={'Insert random'}
          type={ButtonType.BUTTON}
          handleClick={handleRandomRGB}
        />

        {boxesState.box.isMaximum && (
          <mark className="alert-maximum">
            Maximum number of 9 boxes reached.
          </mark>
        )}
      </section>
    </article>
  );
}

export default BoxInserter;
