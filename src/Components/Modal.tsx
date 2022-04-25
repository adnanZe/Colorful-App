import React from 'react';

interface ModalProps {
  closeModal(): void;
  rgbInfo?: any;
}

function Modal(props: ModalProps): JSX.Element {
  const { closeModal, rgbInfo } = props;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={closeModal}>X</button>
        <div className="red-modal">Red: 250</div>
        <div className="green-modal">Green: 250</div>
        <div className="blue-modal">Blue: 250</div>
        <div className="boxNumber-modal">Box number: 2</div>
        <div className="boxId-modal">Box number: sadasc</div>
        <div className="creationTime-modal">Creation time: 20-20-2022</div>
      </div>
    </div>
  );
}

export default Modal;
