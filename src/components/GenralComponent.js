// Navbar.js

import React, { useState, useEffect, useRef } from "react";

import "./genralComponent.css";
import GenralComponent2 from "./GenralComponent2";
import ManageAcademics from "./ManageAcademics";
import ClearEverything from "./ClearEverything";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { FaEdit, FaTrashAlt, FaCheck,FaTimes,FaUpload, FaDownload, FaRemoveFormat, FaTrash } from 'react-icons/fa'; // Import the icons from React Icons

import AdminReport from "./AdminReport";

const GenralComponent = (option) => {

  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState('No File Selected');

  const [editableRow, setEditableRow] = useState(null);
const [editedData, setEditedData] = useState({}); // To store the edited data


  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [mappings, setMappings] = useState([]);


  const [selectedSem, setSelectedSem] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartmentp, setSelectedDepartmentp] = useState("");
  const [selectedSemm, setSelectedSemm] = useState("");
  const [selectedDepartmentm, setSelectedDepartmentm] = useState("");

  const [marksData, setMarksData] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);





  const [searchUsername, setSearchUsername] = useState("");
  const [searchUsernamem, setSearchUsernamem] = useState("");

  const [searchUsernampe, setSearchUsernamep] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [studentId, setStudentId] = useState(""); // New state for student ID
  const [studentDetails, setStudentDetails] = useState(null); // New state for student details
  const [Pname, setPname] = useState(""); // New state for student ID
  const [professorDetails, setProfessorDetails] = useState(null); // New state for student details
  const [Dsem, setDsem] = useState(""); // New state for student ID
  const [dsemDetails, setdsemDetails] = useState(null); // New state for student details
  const [studentData, setStudentData] = useState(null);

  const [departments, setDepartments] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');

  console.log(option.option);

  useEffect(() => {
    // Fetch data when selectedSem or selectedDepartment changes
    if (selectedDepartment) {
      fetchStudentDataToPrint();
    }

  }, [ selectedDepartment]);
  useEffect(() => {
    // Fetch data when selectedSem or selectedDepartment changes
    if (selectedDepartmentp) {
      fetchProfessorDataToPrint();
    }
    
  }, [ selectedDepartmentp]);



  useEffect(() => {
    // Fetch data when selectedSem or selectedDepartment changes
    
     if(selectedDepartmentm && selectedSemm)
    {
      fetchMappingDataToPrint();

    }
    
  }, [ selectedSemm,selectedDepartmentp]);
  const handleSearch = () => {
    // Filter students based on the entered username
    const filteredStudents = students.filter((student) =>
      student.username.includes(searchUsername)
    );
    setStudents(filteredStudents);
  };
  

  const handleDownloadSample = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}` +
          "/downloadsamplefile/Upload_Student_Sample.xlsx"
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Upload_Student_Sample.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading sample file:", error);
    }
  };

  const handleDownloadSample2 = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}` +
          "/downloadsamplefile/Upload_Professor_Sample.xlsx"
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Upload_Professor_Sample.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading sample file:", error);
    }
  };

  const handleDownloadSample3 = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}` +
          "/downloadsamplefile/Upload_Mapping_Sample.xlsx"
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Upload_Mapping_Sample.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading sample file:", error);
    }
  };

  const handleUpload = async () => {
    // Upload the selected file to the server
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response2 = await fetch(
          `${process.env.REACT_APP_API_URL}` + "/addstudent",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response2.json();
        window.alert(data.message);

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleUpload2 = async () => {
    // Upload the selected file to the server
    if (selectedFile2) {
      const formData = new FormData();
      formData.append("file", selectedFile2);

      try {
        const response3 = await fetch(
          `${process.env.REACT_APP_API_URL}` + "/addprofessor",
          {
            method: "POST",
            body: formData,
          }
        );

        const data3 = await response3.json();
        window.alert(data3.message);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleUpload3 = async () => {
    // Upload the selected file to the server
    if (selectedFile3) {
      const formData = new FormData();
      formData.append("file", selectedFile3);

      try {
        const response4 = await fetch(
          `${process.env.REACT_APP_API_URL}` + "/addmapping",
          {
            method: "POST",
            body: formData,
          }
        );

        const data4 = await response4.json();
        window.alert(data4.message);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
    console.log("File selected is: ",file);
    setUploadedFileName(file ? file.name : null);

    setSelectedFile(file);
  };

  const handleFileChange2 = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
    console.log("File selected is: ",file);
    setUploadedFileName(file ? file.name : null);
    setSelectedFile2(file);
  };

  const handleFileChange3 = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
    console.log("File selected is: ",file);
    setUploadedFileName(file ? file.name : null);
    setSelectedFile3(file);
  };

  const handleRemoveStudent = async (studentid) => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/removestudent/${studentid}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleRemoveMapping = async (username) => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/removemapping/${username}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleRemoveProfessor = async (Pname) => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/removeprofessor/${Pname}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing professor:", error);
    }
  };

  const handleRemoveAllStudent = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const confirmed = window.confirm(
        "Are you sure to want to delete all student data?????"
      );
      if (confirmed) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}` + "/removeallstudent",
          {
            method: "post",
          }
        );

        const data = await response.json();
        window.alert(data.message);
      }
    } catch (error) {
      console.error("Error removing all student:", error);
    }
  };

  const handleRemoveAllDsem = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const confirmed=window.confirm(
        "Are you sure to want to delete all students Roll number entry?????"
      );
      if(confirmed){
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}` + "/removealldsem",
        {
          method: "post",
        }
      );

      const data = await response.json();
      window.alert(data.message);}
    } catch (error) {
      console.error("Error removing all students roll no mapping:", error);
    }
  };

  const handleRemoveAllProfessor = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const confirmed=window.confirm("Are you sure to want to delete all student data?????");
      if(confirmed){
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}` + "/removeallprofessor",
        {
          method: "post",
        }
      );

      const data = await response.json();
      window.alert(data.message);
    }
    } catch (error) {
      console.error("Error removing all proffesors:", error);
    }
  };

 
  



  const fetchStudentDataToPrint = async () => {
    try {
      setLoading(true); // Set loading to true when data fetching starts

      console.log(selectedDepartment);
      const selectedval = {
        selectedDepartment: selectedDepartment,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/studentdataadmin`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedval),
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        // Check if the received data is an array
        setStudents(data);
      } else {
        // If not an array, set students to an empty array or handle it as needed
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };


  const fetchProfessorDataToPrint = async () => {
    try {
      setLoading(true); // Set loading to true when data fetching starts

      console.log(selectedDepartment);
      const selectedval = {
        selectedDepartmentp: selectedDepartmentp,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/professordataadmin`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedval),
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        // Check if the received data is an array
        setProfessors(data);
      } else {
        // If not an array, set students to an empty array or handle it as needed
        setProfessors([]);
      }
    } catch (error) {
      console.error("Error fetching professor:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };


  const fetchMappingDataToPrint = async () => {
    try {
      setLoading(true); // Set loading to true when data fetching starts

      console.log(selectedSemm);
      const selectedval = {
        selectedSemm:selectedSemm,
        selectedDepartmentm: selectedDepartmentm,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/mappingdataadmin`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedval),
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        // Check if the received data is an array
        setMappings(data);
      } else {
        // If not an array, set students to an empty array or handle it as needed
        setMappings([]);
      }
    } catch (error) {
      console.error("Error fetching professor:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };


  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedSubject('');
    setSelectedSem('');
  };

  const handleDepartmentChangem = (event) => {
    const department = event.target.value;
    setSelectedDepartmentm(department);
    setSelectedSubject('');
    setSelectedSem('');
  };
  const handleDepartmentChangep = (event) => {
    const department = event.target.value;
    console.log("professor dep: "+department);
    setSelectedDepartmentp(department);
    
  };

  
  useEffect(() => {
    // Fetch departments data when component mounts
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-details`);
        const data = await response.json();

        if (response.ok) {
          setDepartments(data.departments);
        } else {
          console.error('Error fetching departments:', data.error);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);


  
  
  
   



  return (
    <div>
      {option.option === "ManageStudents" && (
  <>
    <h2>{option.option}</h2>

    {/* Dropdowns for selecting sem and department */}
    <div className="dropdown-student">
      <label>
        Select Department:
        <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          {Object.keys(departments).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>
    </div>

    {loading && (
      <div className="loading-overlay">
        <ClipLoader color="#3498db" loading={loading} size={50} />
      </div>
    )}

    {/* Search bar - live search */}
    <div className="search-bar">
      <input
        type="text"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        placeholder="Search by username"
        style={{ padding: '5px' }}
      />
    </div>

    {/* Display students in a table */}
    {students.length > 0 && (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mobile No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) =>
              student.username.toLowerCase().includes(searchUsername.toLowerCase())
            )
            .map((student, index) => (
              <tr key={student.username} style={{ border: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.username}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.mobile_no}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* <button
                    onClick={() =>
                      setStudents((prevStudents) =>
                        prevStudents.map((s) =>
                          s.username === student.username
                            ? { ...s, showDetails: !s.showDetails }
                            : s
                        )
                      )
                    }
                  >
                    {student.showDetails ? "-" : "+"}
                  </button> */}
                  <button
                    onClick={() => handleRemoveStudent(student.username)}
                    style={{ background: 'none', color: 'black', border: 'none' }}

                  >
                                                          <FaTrashAlt style={{ color: 'black' }} /> {/* React Icons trash icon */}

                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}

    <div style={{ margin: '20px 0' }}>
      <button
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleRemoveAllStudent}
      >
        <FaTrash />
        Remove All
      </button>
    </div>
    {uploadedFileName && <p style={{ marginTop : '100px', marginBottom: '-60px' }}>Uploaded File: {uploadedFileName}</p>}


    <label className="file-input-button" style={{ marginRight: '10px' }}>
      <input type="file" onChange={handleFileChange} />

      Add Student
    </label>

    <button
      onClick={handleUpload}
      style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
        <FaUpload />
    </button>
    <button
      className="sample-button"
      onClick={handleDownloadSample}
      style={{
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
      }}
    >
              <FaDownload />

       Download Sample
    </button>
  </>
)}

      {option.option === "ManageProfessors" && (
        <>
          <>
            <h2>{option.option}</h2>

            {/* Dropdowns for selecting sem and department */}
            <div className="dropdown-student">
            <label>
            Select Department:
            <select value={selectedDepartmentp} onChange={handleDepartmentChangep}>
              <option value="">Select Department</option>
              {Object.keys(departments).map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>
             
            </div>
            {loading && (
              <div className="loading-overlay">
                <ClipLoader color="#3498db" loading={loading} size={50} />
              </div>
            )}
            {/* Search bar - live search */}
            <div className="search-bar">
              <input
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Search by username"
              />
            </div>
            {/* Display students */}
    {professors.length === 0 ? (
      <p>No Professors found.</p>
    ) : (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile No</th>
            {/* Add more headers as needed */}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professors
            .filter((professor) =>
              professor.username.toLowerCase().includes(searchUsername.toLowerCase())
            )
            .map((professor, index) => (
              <tr key={professor.username}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{professor.username}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{professor.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{professor.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{professor.mobile_no}</td>
                {/* Add more cells as needed */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  
                  <button
                    onClick={() => handleRemoveProfessor(professor.username)}
                    style={{ background: 'none', color: 'black', border: 'none' }}

                  >
                                      <FaTrashAlt style={{ color: 'black' }} /> {/* React Icons trash icon */}

                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
    <div>
      <button
        style={{
          backgroundColor: "#ff4d4d",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleRemoveAllProfessor}
      >
        <FaTrash />
        Remove All
      </button>
    </div>
    {uploadedFileName && <p style={{ marginTop : '100px', marginBottom: '-60px' }}>Uploaded File: {uploadedFileName}</p>}

    
    <label className="file-input-button">

      <input type="file" onChange={handleFileChange2} />

      Add Professor
    </label>
    <button onClick={handleUpload2}   style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}>
        <FaUpload />
        </button>
    <button
      className="sample-button"
      style={{ marginLeft: "5px" }}
      onClick={handleDownloadSample2}
    >
      <FaDownload />
      Download Sample
    </button>
  </>
  </>
)}

{option.option === "MapStudent" && (
  <>
    <h2>{option.option}</h2>

    {/* Dropdowns for selecting sem and department */}
    <div className="dropdown-student">
      <select value={selectedDepartmentm} onChange={handleDepartmentChangem}>
        <option value="">Select Department</option>
        {Object.keys(departments).map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      {selectedDepartmentm && (
        <select onChange={(e) => setSelectedSemm(e.target.value)}>
          <option value="">Select Sem</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      )}
    </div>
    {loading && (
      <div className="loading-overlay">
        <ClipLoader color="#3498db" loading={loading} size={50} />
      </div>
    )}
    {/* Search bar - live search */}
    <div className="search-bar">
      <input
        type="text"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        placeholder="Search by username"
      />
    </div>
    {/* Display students */}
    {mappings.length === 0 ? (
      <p>No Student found.</p>
    ) : (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sem</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Roll_No</th>
            {/* Add more headers as needed */}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings
            .filter((mapping) =>
              mapping.id.toLowerCase().includes(searchUsername.toLowerCase())
            )
            .map((mapping, index) => (
              <tr key={mapping.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{mapping.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{mapping.sem}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{mapping.roll}</td>
                {/* Add more cells as needed */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  
                  <button
                    onClick={() => handleRemoveMapping(mapping.id)}
                    style={{ background: 'none', color: 'black', border: 'none' }}

                  >
                                                          <FaTrashAlt style={{ color: 'black' }} /> {/* React Icons trash icon */}

                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
    <div>
      <button
        style={{
          backgroundColor: "#ff4d4d",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleRemoveAllDsem}
      >
        <FaTrash />
        Remove All
      </button>
    </div>
    {uploadedFileName && <p style={{ marginTop : '100px', marginBottom: '-60px' }}>Uploaded File: {uploadedFileName}</p>}


    <label className="file-input-button">
      <input type="file" onChange={handleFileChange3} />
      Add Mapping
    </label>
    <button onClick={handleUpload3}   style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}>
        <FaUpload />
        </button>
    <button
      className="sample-button"
      style={{ marginLeft: "5px" }}
      onClick={handleDownloadSample3}
    >
      <FaDownload />
      Download Sample
    </button>
  </>
)}


      
      {option.option === "AnnouncementMail" && (
        <>
          <GenralComponent2 option={(option = option.option)} />
        </>
      )}
      {option.option === "ManageAcademics" && (
        <>
          <ManageAcademics option={(option = option.option)} />
        </>
      )}
      {option.option === "ClearEverything" && (
        <>
          <ClearEverything option={(option = option.option)} />
        </>
      )}
       {option.option === "Report" && (
        <>
        <AdminReport />
        </>
      )}

    </div>
  );
};

export default GenralComponent;
