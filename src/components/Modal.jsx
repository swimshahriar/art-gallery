import React, { useState, useEffect } from 'react';
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
  const [selectedArt, setSelectedArt] = useState(null);

  const openFullscreen = () => {
    const elem = document.getElementById('full-screen');
    elem.requestFullscreen();
    setIsFullScreen(true);
  };

  const closeFullscreen = () => {
    document.exitFullscreen();
    setIsFullScreen(false);
  };

  useEffect(() => {
    setSelectedArt(art);
    return () => {
      setSelectedArt(null);
    };
  }, [art]);

  if (!selectedArt) {
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
          {selectedArt.id > 0 && (
            <div
              className="img-slider-icon"
              onClick={() => modalArtChangeNegative(selectedArt.id)}
            >
              <AiOutlineLeftCircle />
            </div>
          )}
          <motion.img
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${art.imagePath}`}
            alt={selectedArt.title}
          />
          {selectedArt.id !== max - 1 && (
            <div
              className="img-slider-icon"
              onClick={() => modalArtChangePositive(selectedArt.id)}
            >
              <AiOutlineRightCircle />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <p>{selectedArt.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
