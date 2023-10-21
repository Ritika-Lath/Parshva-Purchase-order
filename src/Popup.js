import React, { useState } from 'react';
import './App.css';
import DocketForm from './DocketForm';

const Popup = ({isOpen,setIsOpen,dockets,setDockets,excelData}) => {

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
           <DocketForm dockets={dockets} setDockets={setDockets} excelData={excelData} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
