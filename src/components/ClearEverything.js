import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ClearEverything.css'; // Import local CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

Modal.setAppElement('#root'); // Set the root element for accessibility

const ClearEverything = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetInput, setResetInput] = useState('');

  const handleResetClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmReset = async () => {
    try {
      if (resetInput === 'Reset') {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reset`); // Replace '/api/reset' with your actual API endpoint
        console.log('Reset successful:', response.data);
      } else {
        alert('Invalid input. Please type "Reset" to confirm.');
      }
    } catch (error) {
      console.error('Error resetting data:', error.message);
      alert('Error resetting data. Please try again.');
    } finally {
      setIsModalOpen(false);
      setResetInput('');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setResetInput('');
  };

  const modalStyles = {
    content: {
      width: '500px',
      height: '300px', // Adjusted height
      margin: 'auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Reset Confirmation Modal"
        style={modalStyles}
      >
        <div>
          <h2>Confirm Reset</h2>
          <p>Are you sure you want to reset the entire website?</p>
          <p>Type "Reset" to confirm:</p>
          <input
            type="text"
            value={resetInput}
            onChange={(e) => setResetInput(e.target.value)}
          />
          <div className="button-group mt-3">
            <button className="btn btn-danger" onClick={handleConfirmReset}>
              Confirm Reset
            </button>
            <button className="btn btn-secondary ml-2" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClearEverything;
