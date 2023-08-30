import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ open, onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode || !open) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={() => { console.log("Background clicked!"); onClose(); }} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}