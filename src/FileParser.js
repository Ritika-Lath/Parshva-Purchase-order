import React from 'react';
import * as XLSX from 'xlsx';

function FileParser({ setExcelData }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonSheet = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      for (let i = 1; i < jsonSheet.length; i++) {
        for (let key in jsonSheet[i]) {
          if (jsonSheet[i][key] === '') {
            jsonSheet[i][key] = jsonSheet[i - 1][key];
          }
        }
      }

      setExcelData(jsonSheet);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
}

export default FileParser;
