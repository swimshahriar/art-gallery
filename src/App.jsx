import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './App.css';
import Modal from './components/Modal';

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

  return (
    <>
      {isOpen && <Modal art={modalArt} setIsOpen={setIsOpen} />}
      <h1 className="header">Art Gallery App</h1>
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
                setModalArt(art);
                setIsOpen(true);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default App;
