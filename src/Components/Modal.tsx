import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../Store';
import Button, { ButtonType } from './Button';
import { BoxItem } from '../Store/Store';

interface ModalProps {
  handleClick(): void;
  handleDeleteBox(): void;
}

function Modal(props: ModalProps): JSX.Element {
  const boxesState = useSelector(store.getState);
  const [boxInfo, setBoxInfo] = useState<BoxItem | null | undefined>(null);

  useEffect(() => {
    const boxSelected = boxesState.box.boxList?.find(
      (box: BoxItem) => box.boxId == boxesState.box.selectedBoxNumber
    );
    setBoxInfo(boxSelected);
  }, [boxesState.box.selectedBoxNumber]);

  const { handleClick, handleDeleteBox } = props;

  return (
    <div>
      <button onClick={handleClick}>X</button>
      <div>
        <p>
          <span>Red:</span> <span>{boxInfo?.red}</span>
        </p>
        <p>
          <span>Green:</span> <span>{boxInfo?.green}</span>
        </p>
        <p>
          <span>Blue:</span> <span>{boxInfo?.blue}</span>
        </p>
      </div>
      <p>Box number: {boxInfo?.boxNumber}</p>
      <p>Creation time: {boxInfo?.creationTime}</p>

      <Button
        classNames={['delete-box']}
        innerText={'Delete'}
        type={ButtonType.BUTTON}
        handleClick={handleDeleteBox}
      />
    </div>
  );
}

export default Modal;
