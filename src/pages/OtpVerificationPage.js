import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './otpVerificationPage.css'; // Import your CSS file for styling

const OtpVerificationPage = ({ username, password }) => {
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    setIsError(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send a request to the server with the entered OTP, username, and password
      const response = await fetch(`${process.env.REACT_APP_API_URL}` + '/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
       sessionStorage.setItem("adminToken", data.adminToken);

        // Handle success
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/admin-home');
        }, 1500);
      } else {
        // Handle error
        setIsError(true);
        window.alert(data.msg);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during OTP verification:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      // Reset the OTP field after submission (optional)
      setOtp('');
    }
  };

  return (
    <div className="otp-verification-container">
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter OTP:
          <input type="text" value={otp} onChange={handleInputChange} />
        </label>
        <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit OTP'}
        </button>
      </form>
      {isError && (
        <div className="error-message">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>OTP verification failed. Please try again.</span>
        </div>
      )}
      {isSuccess && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>OTP verified successfully. Redirecting...</span>
        </div>
      )}
    </div>
  );
};

export default OtpVerificationPage;
