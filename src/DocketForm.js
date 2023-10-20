import React, { useState,useEffect } from 'react';

const DocketForm = ({ excelData }) => {
  // Define state variables to store the form data
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [noOfHoursWorked, setNoOfHoursWorked] = useState('')
  const [ratePerHour, setRatePerHour] = useState('');
  const [supplierOptions, setSupplierOptions] = useState([]); 
  const [supplier, setSupplier] = useState(); // Add state for the selected supplier
  const [dockets, setDockets] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState()
console.log("excel",excelData)


useEffect(() => {

  if (excelData) {
    const uniqueSuppliers = new Set();
    excelData.forEach((data) => {
      if (data && data.Supplier && data.Supplier.trim() !== "") {
        uniqueSuppliers.add(data.Supplier.trim());
      }
    });
  
   console.log("uniqueSuppliers",uniqueSuppliers)
    const uniqueSuppliersArray = [...uniqueSuppliers];
  
    setSupplierOptions(uniqueSuppliersArray);
  }
  
}, [excelData]);

const getPurchaseOrder=()=>{
 let filteredPurchaseOrder=[]
      filteredPurchaseOrder= excelData.filter(data => data.Supplier === supplier);
    return filteredPurchaseOrder
//  console.log("filetyered",filteredPurchaseOrder)
}
// console.log("gyjgy",getPurchaseOrder())
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();


    const totalAmount = noOfHoursWorked * ratePerHour;

    // Create a new docket object
    const newDocket = {
      name,
      startTime,
      endTime,
      noOfHoursWorked,
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
    setNoOfHoursWorked('')
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
          <label>No Of Hours Worked:</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label>Rate per Hour:</label>
          <input type="number" value={ratePerHour} onChange={(e) => setRatePerHour(e.target.value)} required />
        </div>
        <div>
          <label>Supplier Name:</label>
          <select value={supplier} onChange={(e) => setSupplier(e.target.value)} required>
            <option value="">Select Supplier</option>
            {/* {console.log("excelData",excelData)}
            {console.log("supplier",supplier)} */}
            {supplierOptions && supplierOptions.map((supplierName, index) => (
              <option key={index} value={supplierName}>
                {supplierName}
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

export default DocketForm;