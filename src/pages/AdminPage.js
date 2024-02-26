import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import  { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp,FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



import {
  faUser,
  faChalkboardTeacher,
  faEnvelope,
  faChartBar,
  faUserPlus,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { IoPerson, IoSchool, IoPersonAdd } from 'react-icons/io5';
import styled from 'styled-components';
import './adminhome.css';
import GenralComponent from '../components/GenralComponent';
let LOGOUT_TIME=3600000;

const AdminPage = () => {
  const navigate = useNavigate();

  const [menuHeight, setMenuHeight] = useState('auto');

  const [selectedOption, setSelectedOption] = useState(null);
  const [menuVisible, setMenuVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalProfessors, setTotalProfessors] = useState(0);
  const [loggedInUsers, setLoggedInUsers] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxHeight = 500; // Set a maximum height if needed

      // Dynamically adjust the menu height based on scroll position
      setMenuHeight(Math.min(maxHeight, scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/active-users`);
        const { activeUsers,students,professors } = response.data;
        console.log(activeUsers);
        
        // Set the state with the count of active users
        setLoggedInUsers(activeUsers);
        setTotalStudents(students);
        setTotalProfessors(professors);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };
   
    // setLoggedInUsers(10);
    fetchActiveUsers();

    const pollingInterval = 5000;

    // Setup polling with setInterval
    const intervalId = setInterval(() => {
      fetchActiveUsers(); // Fetch data at regular intervals
    }, pollingInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
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
  




  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setSelectedFile(null);

    if (option === 'addStudent') {
      console.log(option);
    }
  };

  




  const menuIcons = {   
     Dashboard: faChartBar,
    ManageStudents: faUser,
    ManageProfessors: faChalkboardTeacher,
    MapStudent: faChalkboardTeacher,
    AnnouncementMail: faEnvelope,
    Report: faChartBar,
    ManageAcademics:faBook,
    ClearEverything: faTrash,

  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const DashboardSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const DashboardContainer = styled.div`
display: flex;
justify-content: space-around;
width: 80%;
background-color: #fff; /* Your desired background color */
padding: 40px;
border-radius: 10px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DashboardBox = styled.div`
flex: 1;
border: 2px solid #3f51b5;
border-radius: 12px;
padding: 20px;
text-align: center;
transition: transform 0.2s ease-in-out;


&:hover {
  transform: scale(1.05);
  animation: ${fadeInAnimation} 0.5s ease-in-out;

}
`;

const DashboardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #3f51b5;
`;


const TotalUsers = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #3f51b5;
`;





  const handleLogout = async () => {
    try {
      const adminToken = sessionStorage.getItem('adminToken');
      await axios.post(`${process.env.REACT_APP_API_URL}/alogout`, null, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      sessionStorage.removeItem('adminToken');
      navigate("/login");
    } catch (error) {
      navigate("/login");
      sessionStorage.removeItem('adminToken');
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

  return (
    <div>
      

      <div className="admin-page">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`side-menu ${menuVisible ? '' : 'hidden'}` }>
          <div className="menu-items">
            <div className="menu-title">Menu</div>

            {Object.keys(menuIcons).map((option) => (
              <div className="menu-item" key={option} onClick={() => handleOptionClick(option)}>
                <FontAwesomeIcon icon={menuIcons[option]} className="menu-icon" />
                <span className="menu-name">{option.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}

            <div className="menu-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              <span className="menu-name">Logout</span>
            </div>
          </div>
        </div>

        <div className="main-content">
          {selectedOption ? (
            <div className="selected-option">
              {selectedOption === 'Dashboard' ? (
                <DashboardSection>
                  <DashboardContainer>
                    <DashboardBox>
                      <DashboardIcon>
                        <IoPersonAdd />
                      </DashboardIcon>
                      <TotalUsers>{totalStudents}</TotalUsers>
                      <p>Total Students</p>
                    </DashboardBox>

                    <DashboardBox>
                      <DashboardIcon>
                        <IoSchool />
                      </DashboardIcon>
                      <TotalUsers>{totalProfessors}</TotalUsers>
                      <p>Total Professors</p>
                    </DashboardBox>

                    <DashboardBox>
                      <DashboardIcon>
                        <IoPerson />
                      </DashboardIcon>
                      <TotalUsers>{loggedInUsers}</TotalUsers>
                      <p>Logged-in Users</p>
                    </DashboardBox>
                  </DashboardContainer>
                </DashboardSection>
              ) : (
                <GenralComponent option={selectedOption} />
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Preferred Order to Use Website</h1>
  <p style={{ fontSize: '18px', marginBottom: '30px' }}>
    Welcome to the Admin Dashboard. Manage your educational institution efficiently with ease! Follow the steps below to get started:
  </p>

  {/* Admin Actions */}
  <div style={{ marginBottom: '30px' }}>
    <p style={{ fontSize: '18px', marginBottom: '25px' }}>
      Take control of your institution by performing these essential administrative tasks:
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-building"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>1.Add Department</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-user-tie"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>2.Add Professors</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-user-graduate"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>3.Add Students</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-link"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>4.Add Mapping</p>
      </div>
    </div>
  </div>

  {/* Professors Actions */}
  <div style={{ marginBottom: '30px' }}>
    <p style={{ fontSize: '18px', marginBottom: '25px' }}>
      Empower your teaching staff with these professor-specific actions:
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-question-circle"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>1.Add Questions</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-pen"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>2.Add Marks</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-file-alt"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>3.View Submissions</p>
      </div>
      <div style={{ textAlign: 'center', flexBasis: '45%', margin: '20px 0' }}>
        <span style={{ fontSize: '24px' }}><i className="fas fa-check"></i></span>
        <p style={{ fontSize: '16px', marginTop: '15px', fontWeight: 'bold' }}>4.Verify Submissions</p>
      </div>
    </div>
  </div>

  {/* Admin Full Control */}
  <div>
    <p style={{ fontSize: '18px', marginBottom: '25px' }}>
      Your one-stop control center for overseeing all activities. Enjoy the convenience of one-click whole reset!
    </p>
  </div>
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
