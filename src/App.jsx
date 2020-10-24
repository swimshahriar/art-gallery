import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalArt, setModalArt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://async-2-staging.appspot.com/users/cloud-strife/arts?rel=artist&type=masters&page=1&count=100&sortBy=reservePrice&sortDirection=-1'
      );

      const jsonRes = await res.json();

      setResponseData(jsonRes);
    };
    fetchData();
  }, []);

  const modalArtChangePositive = (artId) => {
    const filteredData = responseData.arts.filter(
      (art, index) => index === artId + 1
    );
    setModalArt({ ...filteredData[0], id: artId + 1 });
  };

  const modalArtChangeNegative = (artId) => {
    const filteredData = responseData.arts.filter(
      (art, index) => index === artId - 1
    );
    setModalArt({ ...filteredData[0], id: artId - 1 });
  };

  return (
    <>
      {isOpen && (
        <Modal
          art={modalArt}
          setIsOpen={setIsOpen}
          modalArtChangePositive={modalArtChangePositive}
          modalArtChangeNegative={modalArtChangeNegative}
          max={responseData && responseData.arts.length}
        />
      )}

      <h1 className="header">Art Gallery</h1>
      <div className="image-grid">
        {responseData &&
          responseData.arts.map((art, index) => (
            <motion.img
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              key={index}
              src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${art.imagePath}`}
              alt={art.title}
              onClick={() => {
                setModalArt({ ...art, id: index });
                setIsOpen(true);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default App;
