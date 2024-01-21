// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faChartBar, faQuestion } from '@fortawesome/free-solid-svg-icons';
import '../components/NavBar.css';

const Navbar = () => {
  const features = [
    { title: 'Upload Marks', link: '/upload-mark-admin', icon: faUpload },
    { title: 'Student Submissions', link: '/view-student-submissions', icon: faEye },
    { title: 'Reports', link: '/reports', icon: faChartBar },
    { title: 'Upload Question', link: '/upload-question', icon: faQuestion },
  ];

  return (
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
  );
};

export default Navbar;
