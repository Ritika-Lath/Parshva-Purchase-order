import React, { useState,useEffect } from 'react';

const DocketForm = ({ excelData }) => {
  // Define state variables to store the form data
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [ratePerHour, setRatePerHour] = useState('');
  const [supplier, setSupplier] = useState(''); // Add state for the selected supplier
  const [dockets, setDockets] = useState([]);
console.log("excel",excelData)


useEffect(() => {
  // Extract unique suppliers from excelData when it's available
  if (excelData && excelData.Supplier) {
    const uniqueSuppliers = [excelData.Supplier]; // You can modify this logic if there are multiple suppliers in your data
    setSupplier(excelData.Supplier); // Set the default supplier
  }
}, [excelData]);


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the number of hours
    const hoursWorked = (new Date(endTime) - new Date(startTime)) / 3600000;

    // Calculate the total amount
    const totalAmount = hoursWorked * ratePerHour;

    // Create a new docket object
    const newDocket = {
      name,
      startTime,
      endTime,
      hoursWorked,
      ratePerHour,
      totalAmount,
      supplier, // Include the selected supplier
    };

    // Add the new docket to the dockets array
    setDockets([...dockets, newDocket]);

    // Clear the form inputs
    setName('');
    setStartTime('');
    setEndTime('');
    setRatePerHour('');
    setSupplier(''); // Clear the selected supplier
  };

  return (
    <div>
      <h1>Docket Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label>Rate per Hour:</label>
          <input type="number" value={ratePerHour} onChange={(e) => setRatePerHour(e.target.value)} required />
        </div>
        <div>
          <label>Supplier:</label>
          <select value={supplier} onChange={(e) => setSupplier(e.target.value)} required>
            <option value="">Select Supplier</option>
            {excelData.Supplier.map((supplier, index) => (
              <option key={index} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Docket</button>
      </form>
      <div>
        <h2>Dockets</h2>
        <ul>
          {dockets.map((docket, index) => (
            <li key={index}>
              Name: {docket.name}, Hours Worked: {docket.hoursWorked}, Total Amount: {docket.totalAmount}, Supplier: {docket.supplier}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocketForm;
