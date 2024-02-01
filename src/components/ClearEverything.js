// ResetButton.js

import React from 'react';
import axios from 'axios';
import './ClearEverything.css'; // Import local CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ClearEverything = () => {
  const handleResetClick = async () => {
    try {
       let confirmation= window.confirm("ARE YOU SURE TO RESET WHOLE DATA!!!!!");
       if(confirmation){
        let message=window.prompt('Type "Reset" ');
        if(message=="Reset")
        {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reset`); // Replace '/api/reset' with your actual API endpoint

      // Handle the response as needed
      console.log('Reset successful:', response.data);
        }
       }

      // You can also show a success message to the user if desired
      alert('Reset successful!');
    } catch (error) {
      // Handle errors
      console.error('Error resetting data:', error.message);

      // Show an error message to the user
      alert('Error resetting data. Please try again.');
    }
  };

  return (
    <div className="reset-container">
      <div className="card reset-card">
        <div className="card-body">
          <h1 className="card-title">Admin Section</h1>
          <p className="card-text">Reset the entire website by clicking the button below.</p>
          <div className="text-center">
            <button className="btn btn-danger" onClick={handleResetClick}>
              Reset Everything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearEverything;
