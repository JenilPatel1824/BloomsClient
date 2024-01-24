import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faChartBar, faQuestion } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToApp icon




const features = [
  { title: 'Upload Marks', link: '/upload-mark-admin', icon: faUpload },
  { title: 'Student Submissions', link: '/view-student-submissions', icon: faEye },
  { title: 'Reports', link: '/reports', icon: faChartBar },
  { title: 'Upload Question', link: '/upload-question', icon: faQuestion },
];


const Home = () => {

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


const buttonStyle = {
  background: 'none',
  color: '#fff',  // Set to white color
  border: '2px solid #fff',
  borderRadius: '25px',
  padding: '8px 16px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
};


  return (

    <div>
   <div className="logout-button-container">
      <Button
        variant="contained"
        onClick={handleLogout}
        className="logout-button"
        style={{ ...buttonStyle, }}

        startIcon={<ExitToAppIcon className="logout-icon" />}
      >
        Logout
      </Button>
    </div>
     
    <div className="container mt-5 home-container">
      

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <div className="container-fluid">

          
          <Link className="navbar-brand" to="/">
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
