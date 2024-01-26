// Navbar.js

import React, { useState, useEffect, useRef } from "react";

import "./genralComponent.css";
import GenralComponent2 from "./GenralComponent2";
import ManageAcademics from "./ManageAcademics";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const GenralComponent = (option) => {
  const fileInputRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [mappings, setMappings] = useState([]);


  const [selectedSem, setSelectedSem] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartmentp, setSelectedDepartmentp] = useState("");
  const [selectedSemm, setSelectedSemm] = useState("");
  const [selectedDepartmentm, setSelectedDepartmentm] = useState("");




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
    setSelectedFile(file);
  };

  const handleFileChange2 = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
    setSelectedFile2(file);
  };

  const handleFileChange3 = (event) => {
    // Handle file selection and update the state
    const file = event.target.files[0];
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

  const handleViewStudent = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/viewstudent/${studentId}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      setStudentDetails(data.details);

      window.alert(data.message);
    } catch (error) {
      console.error("Error getting student:", error);
    }
  };

  const handleViewDsem = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/viewdsem/${Dsem}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      setdsemDetails(data.number);

      window.alert(data.message);
    } catch (error) {
      console.error("Error getting no of students from roll entry:", error);
    }
  };

  const handleViewProfessor = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/viewprofessor/${Pname}`,
        {
          method: "post",
        }
      );

      const data = await response.json();
      setProfessorDetails(data.details);

      window.alert(data.message);
    } catch (error) {
      console.error("Error getting professor:", error);
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




  return (
    <div>
      {option.option === "ManageStudents" && (
        <>
          <>
            {" "}
            <h2>{option.option}</h2>
            {/* Dropdowns for selecting sem and department */}
            <div className="dropdown-student">
              <select onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CE">CE</option>
              </select>
              {/* {selectedDepartment && (
                <select onChange={(e) => setSelectedSem(e.target.value)}>
                  <option value="">Select Sem</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              )} */}
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
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              students
                .filter((student) =>
                  student.username
                    .toLowerCase()
                    .includes(searchUsername.toLowerCase())
                )
                .map((student, index) => (
                  <div key={student.username} className="student-container">
                    <div className="student-header">
                      {/* Toggle details visibility */}
                      <button
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
                      </button>

                      <div>
                        {index + 1}. {student.username}
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveStudent(student.username)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Check if details should be displayed */}
                    {student.showDetails && (
                      <div className="student-details">
                        <div>Name: {student.name}</div>
                        <div>Password: {student.password}</div>
                        <div>Email: {student.email}</div>
                        <div>Mobile No: {student.mobile_no}</div>
                        {/* Add more details as needed */}
                      </div>
                    )}
                  </div>
                ))
            )}
          </>
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
              onClick={handleRemoveAllStudent}
            >
              Remove All
            </button>
          </div>
          <label className="file-input-button">
            <input type="file" onChange={handleFileChange} />
            Add Student
          </label>
          <button onClick={handleUpload}>Upload</button>
          <button className="sample-button" onClick={handleDownloadSample}>
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
              <select onChange={(e) => setSelectedDepartmentp(e.target.value)}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CE">CE</option>
              </select>
             
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
              professors
                .filter((professor) =>
                  professor.username
                    .toLowerCase()
                    .includes(searchUsernampe.toLowerCase())
                )
                .map((professor, index) => (
                  <div key={professor.username} className="student-container">
                    <div className="student-header">
                      {/* Toggle details visibility */}
                      <button
                        onClick={() =>
                          setProfessors((prevProfessors) =>
                            prevProfessors.map((p) =>
                              p.username === professor.username
                                ? { ...p, showDetails: !p.showDetails }
                                : p
                            )
                          )
                        }
                      >
                        {professor.showDetails ? "-" : "+"}
                      </button>

                      <div>
                        {index + 1}. {professor.username}
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveProfessor(professor.username)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Check if details should be displayed */}
                    {professor.showDetails && (
                      <div className="student-details">
                        <div>Name: {professor.name}</div>
                        <div>Password: {professor.password}</div>
                        <div>Email: {professor.email}</div>
                        <div>Mobile No: {professor.mobile_no}</div>
                        {/* Add more details as needed */}
                      </div>
                    )}
                  </div>
                ))
            )}
          </>
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
              Remove All
            </button>
          </div>

          <label className="file-input-button">
            <input type="file" onChange={handleFileChange2} />
            Add Professor
          </label>
          <button onClick={handleUpload2}>Upload</button>
          <button className="sample-button" onClick={handleDownloadSample2}>
            Download Sample
          </button>
        </>
      )}

      {option.option === "MapStudent" && (
        <>


          <>
            <h2>{option.option}</h2>

            {/* Dropdowns for selecting sem and department */}
            <div className="dropdown-student">
              <select onChange={(e) => setSelectedDepartmentm(e.target.value)}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CE">CE</option>
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
              mappings
                .filter((mapping) =>
                  mapping.id
                    .toLowerCase()
                    .includes(searchUsername.toLowerCase())
                )
                .map((mapping, index) => (
                  <div key={mapping.id} className="student-container">
                    <div className="student-header">
                      {/* Toggle details visibility */}
                      <button
                        onClick={() =>
                          setMappings((prevMappings) =>
                            prevMappings.map((m) =>
                              m.id === mapping.id
                                ? { ...m, showDetails: !m.showDetails }
                                : m
                            )
                          )
                        }
                      >
                        {mapping.showDetails ? "-" : "+"}
                      </button>

                      <div>
                        {index + 1}. {mapping.id}
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveMapping(mapping.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Check if details should be displayed */}
                    {mapping.showDetails && (
                      <div className="student-details">
                        <div>Id: {mapping.id}</div>
                        <div>Sem: {mapping.sem}</div>
                        <div>Roll_No: {mapping.roll}</div>
                        {/* Add more details as needed */}
                      </div>
                    )}
                  </div>
                ))
            )}
          </>
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
              Remove All
            </button>
          </div>




          <label className="file-input-button">
            <input type="file" onChange={handleFileChange3} />
             Add Mapping
          </label>
          <button onClick={handleUpload3}>Upload</button>
          <button className="sample-button" onClick={handleDownloadSample3}>
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
    </div>
  );
};

export default GenralComponent;
