import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp,FaTrash } from 'react-icons/fa';
import Navbar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Add this line to import axios



const DepartmentDataComponent = ({ department }) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedCOs, setExpandedCOs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCO, setSelectedCO] = useState(null);
  const [username,setUsername]=useState('');

  const outsideClickRef = useRef();



  useEffect(() => {

    // Get the token from where you have stored it (e.g., localStorage, cookies)
    const token = sessionStorage.getItem('authToken'); // Change this according to your storage method

    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Access the username from the decoded token
      const { username } = decodedToken.user;

      // Set the username in the component state
      setUsername(username);
      console.log("usernameeee: "+username);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(username);
        console.log(username);



        const response = await fetch(`${process.env.REACT_APP_API_URL}/department-data/${username}`);
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData); // Initially set filteredData to all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
        setExpandedCOs({});
        setSelectedCO(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Implement search logic whenever searchTerm changes
    if (data) {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.semester.toLowerCase().includes(searchTermLower) ||
          item.subject.toLowerCase().includes(searchTermLower) ||
          item.co.toLowerCase().includes(searchTermLower) ||
          item.question.toLowerCase().includes(searchTermLower) ||
          item.department.toLowerCase().includes(searchTermLower)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const toggleSemester = (semester) => {
    setExpandedSemesters((prev) => ({ ...prev, [semester]: !prev[semester] }));
  };

  const toggleSubject = (subject) => {
    setExpandedSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  const toggleCO = (coSubjectKey) => {
    setExpandedCOs((prev) => ({ ...prev, [coSubjectKey]: !prev[coSubjectKey] }));
    setSelectedCO(coSubjectKey);
  };

  const handleRemoveAll = async () => {
    try {
       let confirmation = window.confirm("are you sure to remove all question of your department??? ");
       if(confirmation){
      // Make an API call to trigger the server to remove all data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/remove-all-questions`,{username});
      console.log(response.data.message); // Log the server response message
       }
       else{
        console.log("remove cancelled");
       }
      // Add any additional client-side logic as needed
    } catch (error) {
      console.error('Error removing all data:', error);
      // Handle errors as needed
    }
  };

  const handleRemoveSubject = async (subject) => {
    try {
       let confirmation = window.confirm("are you sure to remove all question of: "+subject+"??? ");
       if(confirmation){
      // Make an API call to trigger the server to remove all data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/remove-all-subject-questions`,{username,subject});
      console.log(response.data.message); // Log the server response message
       }
       else{
        console.log("remove cancelled");
       }
      // Add any additional client-side logic as needed
    } catch (error) {
      console.error('Error removing all data:', error);
      // Handle errors as needed
    }
  };

  const handleRemoveCo = async (co,subject) => {
    try {
       let confirmation = window.confirm("are you sure to remove all question of: "+subject+"and "+co+" ??? ");
       if(confirmation){
      // Make an API call to trigger the server to remove all data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/remove-all-subject-co-questions`,{username,subject,co});
      console.log(response.data.message); // Log the server response message
       }
       else{
        console.log("remove cancelled");
       }
      // Add any additional client-side logic as needed
    } catch (error) {
      console.error('Error removing all data:', error);
      // Handle errors as needed
    }
  };

  const renderQuestions = (co, subject, semester) => {
    const filteredData = data.filter(
      (item) =>
        item.co === co && item.subject === subject && item.semester === semester
    );

    return (
      <ul style={styles.listGroup} className="list-group questions">
        {filteredData.map((item) => (
          <li key={item._id} style={{ textAlign: 'left' }} className="list-group-item">
            <span style={styles.questionIcon}>&#8226;</span> {item.question}
          </li>
        ))}
      </ul>
    );
  };

  const renderCO = (subject, semester) => {
    const subjectCOs = Array.from(
      new Set(
        data
          .filter((item) => item.subject === subject && item.semester === semester)
          .map((item) => item.co)
      )
    );

    return (
      <ul style={styles.listGroup} className="list-group">
        {subjectCOs.map((co) => (
          <li
            key={co}
            style={{
              ...styles.listItem,
              ...(selectedCO === `${co}-${subject}` && styles.selectedItem),
            }}
            onClick={() => toggleCO(`${co}-${subject}`)}
          >
            <h5 style={styles.coText} className="mb-0">
              <span style={styles.coIcon}>&#9658;</span> CO: {co}
            </h5>
            <button style={styles.smallIconButton} onClick={() => handleRemoveCo(co,subject)}>
            {/* Replace 'Icon' with your actual small icon */}
            <FaTrash />
          </button> 
            {expandedCOs[`${co}-${subject}`] ? <FaChevronUp style={styles.chevronIcon} /> : <FaChevronDown style={styles.chevronIcon} />}
          </li>
        ))}
        {subjectCOs.map((co) => (
          expandedCOs[`${co}-${subject}`] && (
            <div key={`cos-${co}`} className="co-questions">
              {renderQuestions(co, subject, semester)}
            </div>
          )
        ))}
      </ul>
    );
  };

  const renderSubjects = (semester) => {
    const semesterSubjects = Array.from(
      new Set(data.filter((item) => item.semester === semester).map((item) => item.subject))
    );

    return (
      <ul style={styles.listGroup} className="list-group">
        {semesterSubjects.map((subject) => (
          <li
            key={subject}
            style={{
              ...styles.listItem,
              ...(expandedSubjects[subject] && styles.expandedItem),
            }}
            onClick={() => toggleSubject(subject)}
          >
            
            <h4 style={styles.subjectText} className="mb-0">
              <span style={styles.subjectIcon}>&#9658;</span> Subject: {subject}
            </h4>
            <button style={styles.smallIconButton} onClick={() => handleRemoveSubject(subject)}>
            {/* Replace 'Icon' with your actual small icon */}
            <FaTrash />
          </button>            {expandedSubjects[subject] ? <FaChevronUp style={styles.chevronIcon} /> : <FaChevronDown style={styles.chevronIcon} />}
          </li>
        ))}
        {semesterSubjects.map((subject) => (
          expandedSubjects[subject] && (
            <div key={`subjects-${subject}`}>
              {renderCO(subject, semester)}
            </div>
          )
        ))}
      </ul>
    );
  };

  const renderSemesters = () => {
    const semesters = Array.from(new Set(data.map((item) => item.semester)));

    return (
      <ul style={styles.listGroup} className="list-group semesters">
        {semesters.map((semester) => (
          <li
            key={semester}
            style={{
              ...styles.listItem,
              ...(expandedSemesters[semester] && styles.expandedItem),
            }}
            onClick={() => toggleSemester(semester)}
          >
            <h3 style={styles.semesterText} className="mb-0">
              <span style={styles.semesterIcon}>&#9658;</span> Semester: {semester}
            </h3>
            {expandedSemesters[semester] ? <FaChevronUp style={styles.chevronIcon} /> : <FaChevronDown style={styles.chevronIcon} />}
          </li>
        ))}
        {semesters.map((semester) => (
          expandedSemesters[semester] && (
            <div key={`semesters-${semester}`}>
              {renderSubjects(semester)}
            </div>
          )
        ))}
      </ul>
    );
  };

  return (
    <div>
        <Navbar />
      <div className="container mt-4">
        <h2 className="mb-3"></h2>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          className="form-control mb-3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div ref={outsideClickRef}>
          {filteredData && renderSemesters()}
        </div>
      </div>
      <div>
      {/* Your component JSX */}
      <button
        onClick={handleRemoveAll}
        style={{ marginLeft: '50px', display: 'flex', alignItems: 'center' }}
      >
        <FaTrash style={{ marginRight: '5px' }} /> Remove All Questions
      </button>
    </div>
    </div>
  );
};

// ... (previous code)

// ... (previous code)

// ... (previous code)

// ... (previous code)

const styles = {
    // ... (previous styles)
  
    listItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row', // Ensure items are in a row
      textAlign: 'left',
      padding: '15px',
      borderBottom: '1px solid #ddd',
      transition: 'background 0.3s',
      cursor: 'pointer',
    },
    questionIcon: {
      marginRight: '10px',
      fontSize: '18px',
    },
    coText: {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: 0,
    },
    coIcon: {
      marginLeft: '5px',
      fontSize: '18px',
    },
    subjectText: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: 0,
    },
    subjectIcon: {
      marginLeft: '5px',
      fontSize: '18px',
    },
    semesterText: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 0,
    },
    semesterIcon: {
      marginLeft: '5px',
      fontSize: '20px',
    },
    chevronIcon: {
      marginLeft: '5px',
      fontSize: '20px',
    },
    searchInput: {
      width: '100%',
      padding: '15px',
      boxSizing: 'border-box',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
    smallIconButton: {
        color: 'black',       // Text color

        background: 'none',
        border: 'none',
        fontSize: '12px', // Adjust the font size as needed
        cursor: 'pointer',
        marginLeft: 'auto', // Right-align the button
      },
    
  };
  
  // ... (remaining code)
  
  
export default DepartmentDataComponent;
