import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button';
import { Input } from '../Components/Input';
import { useYupValidationResolver, schema } from '../Validations/Input';
import * as yup from 'yup';

function BoxInserter(): JSX.Element {
  const resolver = useYupValidationResolver(schema);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<any>({ resolver });

  function onSubmit(data: any) {
    console.log(data);
  }
  const ref = React.createRef();

  return (
    <section className="box-inserter">
      <h3>Box Inserter</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          color={'red'}
          colorId={'redInserter'}
          {...register('red')}
          ref={ref}
        />
        <Input
          color={'green'}
          colorId={'greenInserter'}
          {...register('green')}
          ref={ref}
        />
        <Input
          color={'blue'}
          colorId={'blueInserter'}
          {...register('blue')}
          ref={ref}
        />
        <Button classNames={['insert']} innerText={'Insert'} type={'submit'} />
        <Button
          classNames={['insert-random']}
          innerText={'Insert random'}
          type={'button'}
        />
      </form>
    </section>
  );
}

export default BoxInserter;
