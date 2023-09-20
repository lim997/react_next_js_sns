import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content modal">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;