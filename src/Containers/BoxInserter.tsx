import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

function BoxInserter(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormRGBInputs>({ resolver: yupResolver(schema) });

  const [localRGB, setLocalRGB] = useState<FormRGBInputs>();

  useEffect(() => {
    console.log(localRGB);
  }, [localRGB]);

  function onSubmit(data: FormRGBInputs): void {
    setLocalRGB({
      red: String(data.red),
      green: String(data.green),
      blue: String(data.blue),
    });
    reset();
  }

  const handleRandomRGB = useCallback(() => {
    setLocalRGB({
      red: String(Math.floor(Math.random() * 256)),
      green: String(Math.floor(Math.random() * 256)),
      blue: String(Math.floor(Math.random() * 256)),
    });
  }, []);

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
