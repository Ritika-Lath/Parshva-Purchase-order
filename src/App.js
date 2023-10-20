import logo from './logo.svg';
import './App.css';
import FileParser from './FileParser';
import { useState } from 'react';
import DocketForm from './DocketForm';

function App() {
  const [excelData, setExcelData] = useState(null); // Initialize excelData as null

  return (
    <div>
      <h1>CSV Parser</h1>
      <FileParser setExcelData={setExcelData} />
      {excelData ? (
        <DocketForm excelData={excelData} />
      ) : (
        null
      )}
    </div>
  );
}

export default App;
