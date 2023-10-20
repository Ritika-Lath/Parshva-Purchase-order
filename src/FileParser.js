import React from 'react';
import * as XLSX from 'xlsx';

function FileParser({setExcelData}) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Find the index of the "suppliers" column
      const suppliersIndex = jsonSheet[0].indexOf("suppliers");

      // Iterate through the rows and fill missing columns with data from the "suppliers" column
      for (let i = 1; i < jsonSheet.length; i++) {
        for (let j = 0; j < jsonSheet[0].length; j++) {
          if (j !== suppliersIndex && jsonSheet[i][j] === undefined) {
            jsonSheet[i][j] = jsonSheet[i - 1][j];
          }
        }
      }

      // Create JSON object with the first row as keys and the rest as values
      const jsonData = jsonSheet.slice(1).map((row) => {
        const entry = {};
        jsonSheet[0].forEach((key, index) => {
          entry[key] = row[index];
        });
        return entry;
      });

      // Now you have the JSON data with filled missing columns
      setExcelData(jsonData)
      // console.log(jsonData);
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
