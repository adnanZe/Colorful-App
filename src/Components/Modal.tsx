import React from 'react';
import { BoxItem } from '../Store/Reducers';

interface ModalProps {
  closeModal(): void;
  rgbInfo?: BoxItem;
}

function Modal(props: ModalProps): JSX.Element {
  const { closeModal, rgbInfo } = props;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={closeModal}>X</button>
        <div className="red-modal">Red: {rgbInfo?.red}</div>
        <div className="green-modal">Green: {rgbInfo?.green}</div>
        <div className="blue-modal">Blue: {rgbInfo?.blue}</div>
        <div className="boxNumber-modal">Box number: {rgbInfo?.boxNumber}</div>
        {/* <div className="boxId-modal">Box Id: {rgbInfo?.boxId}</div> */}
        <div className="creationTime-modal">
          Creation time: {rgbInfo?.creationTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default Modal;
