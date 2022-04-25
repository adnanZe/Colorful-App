import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import Modal from '../Components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { BoxItem } from '../Store/Reducers';
import store from '../Store/Store';
import { boxAdded } from '../Store/Actions';

interface FormRGBInputs {
  red: string;
  green: string;
  blue: string;
}

function BoxEditor(): JSX.Element {
  const boxItem = useSelector(store.getState);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormRGBInputs>({ resolver: yupResolver(schema) });

  const [rgbInfo, setRgbInfo] = useState<BoxItem>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setRgbInfo(
      boxItem.boxList.find(
        (box: BoxItem) => box.boxId == boxItem.selectedBoxNumber
      )
    );
  }, [boxItem]);

  useEffect(() => {
    if (rgbInfo) {
      setValue('red', rgbInfo?.red);
      setValue('green', rgbInfo?.green);
      setValue('blue', rgbInfo?.blue);
    }
  }, [rgbInfo]);

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
        <p className="editor-boxNumber">Box Number: {rgbInfo?.boxNumber}</p>
        <Button
          classNames={['info']}
          innerText={'Info'}
          type={'button'}
          onClick={handleModal}
        />
        {rgbInfo ? (
          <div
            className="selected-color"
            style={{
              backgroundColor: `rgb(${rgbInfo?.red}, ${rgbInfo?.green}, ${rgbInfo?.blue})`,
            }}
          ></div>
        ) : (
          <div></div>
        )}
        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={'submit'}
        />
      </form>
      {showModal && <Modal closeModal={handleModal} rgbInfo={rgbInfo} />}
    </section>
  );
}

export default BoxEditor;
