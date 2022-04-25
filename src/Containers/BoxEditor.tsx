import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import Modal from '../Components/Modal';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

function BoxEditor(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormRGBInputs>({ resolver: yupResolver(schema) });

  const [rgbInfo, setRgbInfo] = useState<FormRGBInputs>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(rgbInfo);
  }, [rgbInfo]);

  function onSubmit(data: FormRGBInputs): void {
    setRgbInfo({
      red: String(data.red),
      green: String(data.green),
      blue: String(data.blue),
    });
    reset();
  }

  const handleModal = useCallback(() => {
    const newShowModal = showModal ? false : true;
    setShowModal(newShowModal);
  }, [showModal]);

  return (
    <section className="box-editor">
      <h3>Box Editor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label={'red'} register={register} />
        <Input label={'green'} register={register} />
        <Input label={'blue'} register={register} />
        <p className="errors-editor">
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </p>
        <p className="editor-boxNumber">Box number 2</p>
        <Button
          classNames={['info']}
          innerText={'Info'}
          type={'button'}
          onClick={handleModal}
        />
        <div className="selected-color">Box selected</div>
        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={'submit'}
        />
      </form>
      {showModal && <Modal closeModal={handleModal} />}
    </section>
  );
}

export default BoxEditor;
