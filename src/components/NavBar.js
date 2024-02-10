// Navbar.js

import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faChartBar, faQuestion,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../components/NavBar.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserBadge from './UserBadge';

let LOGOUT_TIME=3600000;



const Navbar = () => {
  const [username,setUsername]=useState("None");
  const features = [
    { title: 'Upload Marks', link: '/upload-mark-admin', icon: faUpload },
    {title: 'View Marks', link: '/view-marks',icon: faEye},
    { title: 'Upload Question', link: '/upload-question', icon: faQuestion },
    {title: 'Question Bank', link: '/question-bank',icon: faEye},
    { title: 'Student Submissions', link: '/view-student-submissions', icon: faEye },
    { title: 'Reports', link: '/reports', icon: faChartBar },
    


  ];


  useEffect(() => {
    // Get the token from where you have stored it (e.g., localStorage, cookies)
    const token = sessionStorage.getItem('authToken'); // Change this according to your storage method

    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Access the username from the decoded token
      const { username } = decodedToken.user;

      // Set the username in the component state
      console.log("usernameeee: "+username);
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    

    const pollingInterval = LOGOUT_TIME;

    // Setup polling with setInterval
    const intervalId = setInterval(() => {
      handleLogout(); // Fetch data at regular intervals
    }, pollingInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 
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
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {features.map((feature, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link" to={feature.link}>
                  <FontAwesomeIcon icon={feature.icon} className="mr-2" />
                  {feature.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <ul className="navbar-nav ms-auto">
          <UserBadge username={username} marginRight="10px" marginTop="5px"/>

            <li className="nav-item">
              <Button
                variant="contained"
                onClick={handleLogout}
                className="logout-button"
                style={{
                  background: 'transparent',
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
                }}
               
                startIcon={<FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;