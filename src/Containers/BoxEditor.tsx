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
import { ColorPicker, useColor as useColorPallet } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

function BoxEditor(): JSX.Element {
  const currentBox = useSelector(getBoxItemSelected);
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
  const [colorPallet, setColorPallet] = useColorPallet('rgb', {
    r: Number(rgbInfo?.red),
    g: Number(rgbInfo?.green),
    b: Number(rgbInfo?.blue),
  });

  useEffect(() => {
    setRgbInfo(currentBox);
  }, [currentBox]);

  useEffect(() => {
    if (rgbInfo) {
      setValue('red', rgbInfo?.red);
      setValue('green', rgbInfo?.green);
      setValue('blue', rgbInfo?.blue);

      // if (Number(rgbInfo.red)) {
      //   setColorPallet({
      //     red: Number(rgbInfo.red),
      //     g: Number(rgbInfo.green),
      //     b: Number(rgbInfo.blue),
      //   });
      // }
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
    setValue('red', '');
    setValue('green', '');
    setValue('blue', '');
  }, []);

  const handleOpenPallet = useCallback(() => {
    setShowPallet(true);
  }, []);

  const handleClosePallet = useCallback(() => {
    setShowPallet(false);
  }, []);

  const handleColorPallet = useCallback(() => {
    console.log(colorPallet);
  }, []);

  return (
    <section className="box-editor">
      <h3>Box Editor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'red'}
          register={register}
          handleChange={handleChangeRed}
          isError={errors.red ? true : false}
          isDisabled={currentBox ? false : true}
        />
        <Input
          label={'green'}
          register={register}
          handleChange={handleChangeGreen}
          isError={errors.green ? true : false}
          isDisabled={currentBox ? false : true}
        />
        <Input
          label={'blue'}
          register={register}
          handleChange={handleChangeBlue}
          isError={errors.blue ? true : false}
          isDisabled={currentBox ? false : true}
        />
        <p className="errors-editor">
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </p>
        <p className="editor-boxNumber">Box Number: {rgbInfo?.boxNumber}</p>
        <Button
          classNames={['info']}
          innerText={'Info'}
          type={ButtonType.button}
          onClick={handleModal}
          isDisabled={!currentBox}
        />
        {rgbInfo ? (
          <div
            className="selected-color"
            style={{
              backgroundColor: `rgb(${rgbInfo?.red}, ${rgbInfo?.green}, ${rgbInfo?.blue})`,
            }}
            onClick={handleOpenPallet}
          >
            <Button
              classNames={['preview-box']}
              innerText={'Preview'}
              type={ButtonType.button}
              onClick={handleDeleteBox}
            />
          </div>
        ) : (
          <div></div>
        )}
        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={ButtonType.submit}
          isDisabled={!isValid || !isDirty || !currentBox}
        />
      </form>
      {showModal && currentBox && (
        <Modal
          closeModal={handleModal}
          rgbInfo={currentBox}
          handleDeleteBox={handleDeleteBox}
        />
      )}
      {showPallet && (
        <aside className="color-pallet">
          <Button
            classNames={['close-pallet']}
            type={ButtonType.button}
            onClick={handleClosePallet}
            innerText={'X'}
          />
          <ColorPicker
            width={200}
            height={200}
            color={colorPallet}
            onChangeComplete={handleColorPallet}
            onChange={setColorPallet}
            hideHSV
            hideHEX
            dark
          />
        </aside>
      )}
    </section>
  );
}

export default BoxEditor;
