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
import 'react-color-palette/lib/css/styles.css';
import { ChromePicker, ColorResult } from 'react-color';
import { BoxItem, boxUpdated, boxDeleted, BoxesState } from '../Store/Store';
import { store } from '../Store';

interface RGBColorPallet {
  b: number;
  g: number;
  r: number;
}

interface State {
  box: BoxesState;
}

function BoxEditor(): JSX.Element {
  const boxesState = useSelector(store.getState);
  const boxSelected = useSelector((state: State) =>
    state.box.boxList?.find(
      (box: BoxItem) => box.boxId == boxesState.box.selectedBoxNumber
    )
  );

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
      r: Number(boxSelected?.red),
      g: Number(boxSelected?.green),
      b: Number(boxSelected?.blue),
    });

    if (boxSelected) {
      setValue('red', boxSelected?.red);
      setValue('green', boxSelected?.green);
      setValue('blue', boxSelected?.blue);
    }
  }, [boxSelected]);

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
    if (colorPallet) {
      const newColorPallet = {
        ...colorPallet,
        [color]: String(e.target.value),
      };
      setColorPallet(newColorPallet);
    }
  }

  const handleChangeRed = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('red', e);
    },
    [colorPallet]
  );

  const handleChangeGreen = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('green', e);
    },
    [colorPallet]
  );

  const handleChangeBlue = useCallback(
    (e: BaseSyntheticEvent) => {
      changeColor('blue', e);
    },
    [colorPallet]
  );

  const handleDeleteBox = useCallback(() => {
    setShowPallet(false);
    dispatch(boxDeleted());
    reset();
    setShowModal(false);
  }, []);

  const handleOpenPallet = useCallback(() => {
    setShowPallet(true);
  }, []);

  const handleClosePallet = useCallback(() => {
    setShowPallet(false);
  }, []);

  const handleChangePallet = useCallback(
    (updatedColor: ColorResult) => {
      setColorPallet(updatedColor.rgb);
    },
    [colorPallet]
  );

  useEffect(() => {
    if (boxSelected) {
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
          isDisabled={boxesState.box.selectedBoxNumber ? false : true}
        />
        <Input
          label={'green'}
          register={register}
          handleChange={handleChangeGreen}
          isError={errors.green ? true : false}
          isDisabled={boxesState.box.selectedBoxNumber ? false : true}
        />
        <Input
          label={'blue'}
          register={register}
          handleChange={handleChangeBlue}
          isError={errors.blue ? true : false}
          isDisabled={boxesState.box.selectedBoxNumber ? false : true}
        />
        <mark>
          {errors.red?.message || errors.green?.message || errors.blue?.message}
        </mark>

        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={ButtonType.SUBMIT}
          isDisabled={!boxesState.box.selectedBoxNumber}
        />
      </form>

      <section>
        {boxSelected ? (
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
          <figcaption>Box Number: {boxSelected?.boxNumber}</figcaption>
        ) : (
          <figcaption></figcaption>
        )}

        <Button
          classNames={['info']}
          innerText={'Info'}
          type={ButtonType.BUTTON}
          handleClick={handleModal}
          isDisabled={!boxesState.box.selectedBoxNumber}
        />

        {showModal && boxesState.box.selectedBoxNumber && (
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
