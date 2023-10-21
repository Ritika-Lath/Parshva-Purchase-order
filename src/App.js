import logo from './logo.svg';
import './App.css';
import FileParser from './FileParser';
import { useState,useEffect } from 'react';
import DocketForm from './DocketForm';
import Popup from './Popup';

function App() {
  const [excelData, setExcelData] = useState(null); // Initialize excelData as null
  const [isOpen, setIsOpen] = useState(false);
  const [dockets, setDockets] = useState([]);


  useEffect(() => {
    if(excelData)
    {
      setIsOpen(true)
    }
  }, [excelData])
  

  return (
    <div>
      <h1>CSV Parser</h1>
      <FileParser setExcelData={setExcelData} />
      {isOpen? 
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} dockets={dockets} setDockets={setDockets} excelData={excelData}/>
      : null}
      {dockets? <div>
        <h2>Dockets 
        <button onClick={()=>setIsOpen(true)}> Create Docket</button>
        </h2>
        <ul>
          {dockets.map((docket, index) => (
            <li key={index}>
              Name: {docket.name},
              Start Time:{docket.startTime},
              End Time:{docket.endTime}, 
              Hours Worked: {docket.noOfHoursWorked},
              Rate Per Hour:{docket.ratePerHour}, 
              Total Amount: {docket.totalAmount}, 
              Supplier: {docket.supplier},
              PO Number: {docket.poNumber} , 
              Description: {docket.description}
            </li>
          ))}
        </ul>
      </div>:null}
    </div>
  );
}

export default App;
