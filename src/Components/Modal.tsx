import React from 'react';
import { useSelector } from 'react-redux';
import { getBoxItemSelected } from '../Store/Reducers';
import Button, { ButtonType } from './Button';

interface ModalProps {
  handleClick(): void;
  // rgbInfo?: BoxItem;
  handleDeleteBox(): void;
}

function Modal(props: ModalProps): JSX.Element {
  const currentBox = useSelector(getBoxItemSelected);

  const { handleClick, handleDeleteBox } = props;

  return (
    <div>
      <button onClick={handleClick}>X</button>
      <div>
        <p>
          <span>Red:</span> <span>{currentBox?.red}</span>
        </p>
        <p>
          <span>Green:</span> <span>{currentBox?.green}</span>
        </p>
        <p>
          <span>Blue:</span> <span>{currentBox?.blue}</span>
        </p>
      </div>
      <p>Box number: {currentBox?.boxNumber}</p>
      <p>Creation time: {currentBox?.creationTime.toLocaleTimeString()}</p>

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
