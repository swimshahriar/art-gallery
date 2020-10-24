import React, { useState } from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';

import './Modal.css';

const Modal = ({ art, setIsOpen }) => {
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
          <img
            src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${art.imagePath}`}
            alt={art.title}
          />
        </div>
        <div className="modal-footer">
          <p>{art.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
