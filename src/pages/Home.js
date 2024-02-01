// Import necessary modules and components
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faChartBar, faQuestion, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToApp icon
let LOGOUT_TIME=3600000;

// Define features data
const features = [
  { title: 'Upload Marks', link: '/upload-mark-admin', icon: faUpload },
  { title: 'Student Submissions', link: '/view-student-submissions', icon: faEye },
  { title: 'Reports', link: '/reports', icon: faChartBar },
  { title: 'Upload Question', link: '/upload-question', icon: faQuestion },
  {title: 'Question Bank', link: '/question-bank'},

];

// Define functional component Home
const Home = () => {


  useEffect(() => {
    

    const pollingInterval = LOGOUT_TIME;

    // Setup polling with setInterval
    const intervalId = setInterval(() => {
      handleLogout(); // Fetch data at regular intervals
    }, pollingInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 
  

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const authToken = sessionStorage.getItem('authToken'); // Get the authToken from sessionStorage
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add the token to the headers
        },
      });

      sessionStorage.removeItem('authToken'); // Clear the authToken from sessionStorage

      // Redirect or perform other actions after logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  window.addEventListener('beforeunload', async (event) => {
    // Perform logout actions when the user is leaving the page
    event.preventDefault();
    
    try {
      await handleLogout();
    } catch (error) {
      // Handle errors, if any
    }
  
    // Standard for most browsers
    delete event['returnValue'];
    // For some older browsers
    return;
  });

  // Style for the logout button
  const buttonStyle = {
    background: 'none',
    color: '#fff', // White color
    border: 'none',
    borderRadius: '5px',
    padding: '4px 8px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  // Render the component
  return (
    <div>
      <div className="container mt-5 home-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              Home
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto"> {/* Right-aligned navigation */}
                {/* Features Links */}
                {features.map((feature, index) => (
                  <li className="nav-item" key={index}>
                    <Link className="nav-link" to={feature.link}>
                      <FontAwesomeIcon icon={feature.icon} className="mr-2" />
                      {feature.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Logout Button */}
            <div className="ml-auto">
              <Button
                variant="contained"
                onClick={handleLogout}
                className="logout-button"
                style={buttonStyle}
                startIcon={<FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />}
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
        <div className="mt-3 home-content">
          <div className="features-container">
            {features.map((feature, index) => (
              <div className="feature" key={index}>
                <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                <h4>{feature.title}</h4>
                <p>Explore and manage {feature.title.toLowerCase()} here.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
