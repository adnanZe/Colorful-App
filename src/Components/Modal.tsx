import React from 'react';
import { BoxItem } from '../Store/Reducers';
import Button, { ButtonType } from './Button';

interface ModalProps {
  closeModal(): void;
  rgbInfo?: BoxItem;
  handleDeleteBox(): void;
}

function Modal(props: ModalProps): JSX.Element {
  const { closeModal, rgbInfo, handleDeleteBox } = props;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
        <div className="modal-rgb">
          <p className="modal-color">
            <span className="modal-colorName">Red:</span>{' '}
            <span>{rgbInfo?.red}</span>
          </p>
          <p className="modal-color">
            <span className="modal-colorName">Green:</span>{' '}
            <span>{rgbInfo?.green}</span>
          </p>
          <p className="modal-color">
            <span className="modal-colorName">Blue:</span>{' '}
            <span>{rgbInfo?.blue}</span>
          </p>
        </div>
        <p className="boxNumber-modal">Box number: {rgbInfo?.boxNumber}</p>
        {/* <div className="boxId-modal">Box Id: {rgbInfo?.boxId}</div> */}
        <p className="creationTime-modal">
          Creation time: {rgbInfo?.creationTime.toLocaleTimeString()}
        </p>
        <Button
          classNames={['delete-box']}
          innerText={'Delete'}
          type={ButtonType.button}
          onClick={handleDeleteBox}
        />
      </div>
    </div>
  );
}

export default Modal;
