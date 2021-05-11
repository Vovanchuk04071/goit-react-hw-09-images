import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ imgSrc, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleBackDropClick}>
      <div className={style.Modal}>
        <img src={imgSrc} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}
