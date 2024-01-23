import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faChartBar, faQuestion } from '@fortawesome/free-solid-svg-icons';
import './home.css';

const features = [
  { title: 'Upload Marks', link: '/upload-mark-admin', icon: faUpload },
  { title: 'Student Submissions', link: '/view-student-submissions', icon: faEye },
  { title: 'Reports', link: '/reports', icon: faChartBar },
  { title: 'Upload Question', link: '/upload-question', icon: faQuestion },
];

const Home = () => {
  return (
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
  );
};

export default Home;
