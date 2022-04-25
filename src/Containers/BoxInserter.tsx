/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import { useDispatch } from 'react-redux';
import { boxAdded } from '../Store/Actions';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

function BoxInserter(): JSX.Element {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormRGBInputs>({ resolver: yupResolver(schema) });

  // const [localRGB, setLocalRGB] = useState<FormRGBInputs>();

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
        <Input label="red" register={register} />
        <Input label="green" register={register} />
        <Input label="blue" register={register} />
        <p className="errors-inserter">
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </p>
        <Button classNames={['insert']} innerText={'Insert'} type={'submit'} />
        <Button
          classNames={['insert-random']}
          innerText={'Insert random'}
          type={'button'}
          onClick={handleRandomRGB}
        />
      </form>
    </section>
  );
}

export default BoxInserter;
