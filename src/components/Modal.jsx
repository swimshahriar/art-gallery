import React, { useState, useEffect, useCallback } from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './Modal.css';

const Modal = ({
  art,
  setIsOpen,
  max,
  modalArtChangePositive,
  modalArtChangeNegative,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullscreen = () => {
    const elem = document.getElementById('full-screen');
    elem.requestFullscreen();
    setIsFullScreen(true);
  };

  const closeFullscreen = () => {
    document.exitFullscreen();
    setIsFullScreen(false);
  };

  const keyPressHandler = useCallback(
    (event) => {
      if (event.key === 'ArrowRight' && art.id !== max - 1) {
        modalArtChangePositive(art.id);
      } else if (event.key === 'ArrowLeft' && art.id > 0) {
        modalArtChangeNegative(art.id);
      }
    },
    [art.id, modalArtChangeNegative, modalArtChangePositive, max]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', keyPressHandler);
    return () => {
      document.body.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyPressHandler]);

  if (!art) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="modal-backdrop" id="full-screen">
      <div className="modal-container">
        <div className="modal-header">
          {isFullScreen ? (
            <div className="btn-icon" onClick={closeFullscreen}>
              <BsFullscreenExit />
            </div>
          ) : (
            <div className="btn-icon" onClick={openFullscreen}>
              <BsFullscreen />
            </div>
          )}
          <div className="btn-icon" onClick={() => setIsOpen(false)}>
            <ImCancelCircle />
          </div>
        </div>
        <div className="modal-body">
          {art.id > 0 && (
            <div
              id="slider-left"
              className="img-slider-icon"
              onClick={() => modalArtChangeNegative(art.id)}
            >
              <AiOutlineLeftCircle />
            </div>
          )}
          <motion.img
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${art.imagePath}`}
            alt={art.title}
          />
          {art.id !== max - 1 && (
            <div
              id="slider-right"
              className="img-slider-icon"
              onClick={() => modalArtChangePositive(art.id)}
            >
              <AiOutlineRightCircle />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <p>{art.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
