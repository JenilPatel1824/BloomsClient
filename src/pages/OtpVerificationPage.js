import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const OtpVerificationPage = ({ username, password }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server with the entered OTP, username, and password
      const response = await fetch(`${process.env.REACT_APP_API_URL}`+"/verify-otp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
        }),
      });

      const data=await response.json();
      if(response.status==200){
        // TODO: Handle success, e.g., redirect to another page
       // console.log('OTP verified successfully');
        console.log(data.msg);
        navigate("/admin-home");
    }
    else {
        // TODO: Handle error, e.g., show an error message to the user
        console.error('OTP verification failed');
        window.alert(data.msg);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during OTP verification:', error);
    }

    // Reset the OTP field after submission (optional)
    setOtp('');
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter OTP:
          <input type="text" value={otp} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
