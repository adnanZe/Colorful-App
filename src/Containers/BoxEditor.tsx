import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Button, { ButtonType } from '../Components/Button';
import Input, { FormRGBInputs } from '../Components/RgbInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Validations/InputCheck';
import Modal from '../Components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoxItemNumberSelected,
  getBoxItemRgbSelected,
} from '../Store/Reducers';
import { boxDeleted, boxUpdated } from '../Store/Actions';
import 'react-color-palette/lib/css/styles.css';
import { ChromePicker, ColorResult } from 'react-color';
import store from '../Store/Store';

interface RGBColorPallet {
  b: number;
  g: number;
  r: number;
}

function BoxEditor(): JSX.Element {
  const boxItemRgbSelected = useSelector(getBoxItemRgbSelected);
  const boxBoxItemIdSelected = useSelector(getBoxItemNumberSelected);
  const boxesState = useSelector(store.getState);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormRGBInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPallet, setShowPallet] = useState<boolean>(false);
  const [colorPallet, setColorPallet] = useState<RGBColorPallet>();

  useEffect(() => {
    setColorPallet({
      r: Number(boxItemRgbSelected?.red),
      g: Number(boxItemRgbSelected?.green),
      b: Number(boxItemRgbSelected?.blue),
    });

    if (boxItemRgbSelected) {
      setValue('red', boxItemRgbSelected?.red);
      setValue('green', boxItemRgbSelected?.green);
      setValue('blue', boxItemRgbSelected?.blue);
    }
  }, [boxItemRgbSelected]);

  function onSubmit(data: FormRGBInputs): void {
    dispatch(
      boxUpdated({
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

  function changeColor(color: keyof RGBColorPallet, e: BaseSyntheticEvent) {
    if (colorPallet) {
      const newColorPallet = {
        ...colorPallet,
        [color]: Number(e.target.value),
      };
      setColorPallet(newColorPallet);
    }
  }

  const handleChangeRed = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('r', e);
    },
    [colorPallet]
  );

  const handleChangeGreen = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('g', e);
    },
    [colorPallet]
  );

  const handleChangeBlue = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('b', e);
    },
    [colorPallet]
  );

  const handleDeleteBox = useCallback(() => {
    setShowPallet(false);
    dispatch(boxDeleted());
    reset();
    setShowModal(false);
  }, [boxesState.boxList]);

  const handleOpenPallet = useCallback(() => {
    setShowPallet(true);
  }, [showPallet]);

  const handleClosePallet = useCallback(() => {
    setShowPallet(false);
  }, [showPallet]);

  const handleChangePallet = useCallback(
    (updatedColor: ColorResult) => {
      setColorPallet(updatedColor.rgb);
    },
    [colorPallet]
  );

  useEffect(() => {
    if (boxBoxItemIdSelected) {
      setValue('red', String(colorPallet?.r), { shouldValidate: true });
      setValue('green', String(colorPallet?.g), { shouldValidate: true });
      setValue('blue', String(colorPallet?.b), { shouldValidate: true });
    }
  }, [colorPallet]);

  return (
    <article id="box-editor">
      <h3>Box Editor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'red'}
          register={register}
          handleChange={handleChangeRed}
          isError={errors.red ? true : false}
          isDisabled={boxBoxItemIdSelected ? false : true}
        />
        <Input
          label={'green'}
          register={register}
          handleChange={handleChangeGreen}
          isError={errors.green ? true : false}
          isDisabled={boxBoxItemIdSelected ? false : true}
        />
        <Input
          label={'blue'}
          register={register}
          handleChange={handleChangeBlue}
          isError={errors.blue ? true : false}
          isDisabled={boxBoxItemIdSelected ? false : true}
        />
        <mark>
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </mark>

        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={ButtonType.SUBMIT}
          isDisabled={!boxBoxItemIdSelected}
        />
      </form>

      <section>
        {boxBoxItemIdSelected ? (
          <figure
            style={{
              backgroundColor: `rgb(${colorPallet?.r}, ${colorPallet?.g}, ${colorPallet?.b})`,
            }}
            onClick={handleOpenPallet}
          >
            <Button
              classNames={['preview-box']}
              innerText={'Preview'}
              type={ButtonType.BUTTON}
            />
          </figure>
        ) : (
          <figure></figure>
        )}

        {colorPallet ? (
          <figcaption>Box Number: {boxBoxItemIdSelected}</figcaption>
        ) : (
          <figcaption></figcaption>
        )}

        <Button
          classNames={['info']}
          innerText={'Info'}
          type={ButtonType.BUTTON}
          handleClick={handleModal}
          isDisabled={!boxBoxItemIdSelected}
        />

        {showModal && boxBoxItemIdSelected && (
          <aside id="info-modal">
            <Modal
              handleClick={handleModal}
              handleDeleteBox={handleDeleteBox}
            />
          </aside>
        )}
      </section>

      {showPallet && (
        <aside id="color-pallet">
          <Button
            classNames={['close-pallet']}
            type={ButtonType.BUTTON}
            handleClick={handleClosePallet}
            innerText={'X'}
          />
          <ChromePicker
            onChange={handleChangePallet}
            disableAlpha={true}
            color={colorPallet}
          />
        </aside>
      )}
    </article>
  );
}

export default BoxEditor;
