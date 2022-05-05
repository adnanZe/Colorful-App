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
import { BoxItem, getBoxItemSelected } from '../Store/Reducers';
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
  const boxStoreSelected = useSelector(getBoxItemSelected);
  const boxesState = useSelector(store.getState);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormRGBInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [rgbInfo, setRgbInfo] = useState<BoxItem | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPallet, setShowPallet] = useState<boolean>(false);
  const [colorPallet, setColorPallet] = useState<RGBColorPallet>();

  useEffect(() => {
    setRgbInfo(boxStoreSelected);
  }, [boxStoreSelected]);

  useEffect(() => {
    if (rgbInfo) {
      setValue('red', rgbInfo?.red);
      setValue('green', rgbInfo?.green);
      setValue('blue', rgbInfo?.blue);
      setColorPallet({
        r: Number(rgbInfo?.red),
        g: Number(rgbInfo?.green),
        b: Number(rgbInfo?.blue),
      });
    }
  }, [rgbInfo]);

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

  function changeColor(color: keyof BoxItem, e: BaseSyntheticEvent) {
    if (rgbInfo) {
      const newRgbInfo = {
        ...rgbInfo,
        [color]: String(e.target.value),
      };
      setRgbInfo(newRgbInfo);
    }
  }

  const handleChangeRed = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('red', e);
    },
    [rgbInfo]
  );

  const handleChangeGreen = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('green', e);
    },
    [rgbInfo]
  );

  const handleChangeBlue = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('blue', e);
    },
    [rgbInfo]
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
      if (rgbInfo && colorPallet) {
        const newRgbInfo = rgbInfo;
        newRgbInfo.red = String(colorPallet.r);
        newRgbInfo.green = String(colorPallet.g);
        newRgbInfo.blue = String(colorPallet.b);
        setRgbInfo(newRgbInfo);

        setValue('red', rgbInfo?.red);
        setValue('green', rgbInfo?.green);
        setValue('blue', rgbInfo?.blue);
      }
    },
    [colorPallet]
  );

  return (
    <article id="box-editor">
      <h3>Box Editor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'red'}
          register={register}
          handleChange={handleChangeRed}
          isError={errors.red ? true : false}
          isDisabled={boxStoreSelected ? false : true}
        />
        <Input
          label={'green'}
          register={register}
          handleChange={handleChangeGreen}
          isError={errors.green ? true : false}
          isDisabled={boxStoreSelected ? false : true}
        />
        <Input
          label={'blue'}
          register={register}
          handleChange={handleChangeBlue}
          isError={errors.blue ? true : false}
          isDisabled={boxStoreSelected ? false : true}
        />
        <mark>
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </mark>

        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={ButtonType.SUBMIT}
          isDisabled={!isValid || !isDirty || !boxStoreSelected}
        />
      </form>

      <section>
        {rgbInfo ? (
          <figure
            style={{
              backgroundColor: `rgb(${rgbInfo?.red}, ${rgbInfo?.green}, ${rgbInfo?.blue})`,
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

        {rgbInfo ? (
          <figcaption>Box Number: {rgbInfo?.boxNumber}</figcaption>
        ) : (
          <figcaption></figcaption>
        )}

        <Button
          classNames={['info']}
          innerText={'Info'}
          type={ButtonType.BUTTON}
          handleClick={handleModal}
          isDisabled={!boxStoreSelected}
        />

        {showModal && boxStoreSelected && (
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
            onChangeComplete={handleChangePallet}
            disableAlpha={true}
            color={colorPallet}
          />
        </aside>
      )}
    </article>
  );
}

export default BoxEditor;
