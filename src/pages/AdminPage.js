import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChalkboardTeacher,
  faFileAlt,
  faEnvelope,
  faChartBar,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import './adminhome.css'; // Import the CSS file for styling
import Navbar from '../components/NavBar';
import GenralComponent from '../components/GenralComponent';

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuVisible, setMenuVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    // Clear the selected file when changing the option
    setSelectedFile(null);

    if (option === 'addStudent') {
      console.log(option);
    }

    // Add logic to perform the specific action based on the selected option
  };

  const handleFileChange = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    // Upload the selected file to the server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/addstudent', {
          method: 'POST',
          body: formData,
        });

        // Handle the response from the server if needed
        console.log('File uploaded successfully:', response);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDownloadSample = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/downloadsamplefile/Upload_Student_Sample.xlsx');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Upload_Student_Sample.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading sample file:', error);
    }
  };

  const menuIcons = {
    ManageStudents: faUser,
    ManageProfessors: faChalkboardTeacher,
    MapStudent: faChalkboardTeacher,
    
    AnnouncementMail: faEnvelope,
    Report: faChartBar,
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="admin-page">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`side-menu ${menuVisible ? '' : 'hidden'}`}>
        <div className="menu-items">
          {/* Menu title below the three-line button */}
          <div className="menu-title">Menu</div>

          {/* Menu items */}
          {Object.keys(menuIcons).map((option) => (
            <div className="menu-item" key={option} onClick={() => handleOptionClick(option)}>
              <FontAwesomeIcon icon={menuIcons[option]} className="menu-icon" />
              <span className="menu-name">{option.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        {selectedOption ? (
          <div className="selected-option">
            {/* Add specific UI or form for the selected option */}
            <GenralComponent option={selectedOption}/>
            
            {/* ... other UI components or forms ... */}
          </div>
        ) : (
          <div className="default-content">
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Manage your educational institution efficiently with ease!</p>
            <p>Select an option from the menu to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;