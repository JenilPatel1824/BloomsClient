// Navbar.js

import React, { useState } from "react";

import './genralComponent.css';
import GenralComponent2 from "./GenralComponent2";



const GenralComponent = (option) => {
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




  console.log(option.option);


  const handleDownloadSample = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}`+"/downloadsamplefile/Upload_Student_Sample.xlsx"
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
        `"${process.env.REACT_APP_API_URL}`+"/downloadsamplefile/Upload_Professor_Sample.xlsx"
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
        `"${process.env.REACT_APP_API_URL}`+"/downloadsamplefile/Upload_Mapping_Sample.xlsx"
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
        const response2 = await fetch(`"${process.env.REACT_APP_API_URL}`+"/addstudent", {
          method: "POST",
          body: formData,
        });

        const data= await response2.json();
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
        const response3 = await fetch(`"${process.env.REACT_APP_API_URL}`+"/addprofessor", {
          method: "POST",
          body: formData,
        });

        const data3= await response3.json();
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
        const response4 = await fetch(`"${process.env.REACT_APP_API_URL}`+"/addmapping", {
          method: "POST",
          body: formData,
        });

        const data4= await response4.json();
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




  const handleRemoveStudent = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/removestudent/${studentId}`, {
        method: "post",
      });

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleRemoveProfessor = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/removeptofessor/${Pname}`, {
        method: "post",
      });

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing professor:", error);
    }
  };


  const handleRemoveAllStudent = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
        window.confirm("Are you sure to want to delete all student data?????");
      const response = await fetch(`"${process.env.REACT_APP_API_URL}`+"/removeallstudent", {
        method: "post",
      });

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing all student:", error);
    }
  };

  const handleRemoveAllDsem = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
        window.confirm("Are you sure to want to delete all students Roll number entry?????");
      const response = await fetch(`"${process.env.REACT_APP_API_URL}`+"/removealldsem", {
        method: "post",
      });

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing all students roll no mapping:", error);
    }
  };



  const handleRemoveAllProfessor = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
        window.confirm("Are you sure to want to delete all student data?????");
      const response = await fetch(`"${process.env.REACT_APP_API_URL}`+"/removeallprofessor", {
        method: "post",
      });

      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      console.error("Error removing all proffesors:", error);
    }
  };

  const handleViewStudent = async () => {
    // Call the API endpoint for removing a student using studentId
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/viewstudent/${studentId}`, {
        method: "post",
      });

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/viewdsem/${Dsem}`, {
        method: "post",
      });

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/viewprofessor/${Pname}`, {
        method: "post",
      });

      const data = await response.json();
      setProfessorDetails(data.details);

      window.alert(data.message);
    } catch (error) {
      console.error("Error getting professor:", error);
    }
  };
  







return (
  <div>
    {option.option === "AddStudent" && (
      <>
        <label className="file-input-button">
          <input type="file" onChange={handleFileChange} />
          Upload File
        </label>
        <button onClick={handleUpload}>Upload</button>
        <button className="sample-button" onClick={handleDownloadSample}>
          Download Sample
        </button>
      </>
    )}

    {option.option === "AddProfessor" && (
      <>
        <label className="file-input-button">
          <input type="file" onChange={handleFileChange2} />
          Upload File
        </label>
        <button onClick={handleUpload2}>Upload</button>
        <button className="sample-button" onClick={handleDownloadSample2}>
          Download Sample
        </button>
      </>
    )}


{option.option === "MapStudent" && (
      <>
        <label className="file-input-button">
          <input type="file" onChange={handleFileChange3} />
          Upload File
        </label>
        <button onClick={handleUpload3}>Upload</button>
        <button className="sample-button" onClick={handleDownloadSample3}>
          Download Sample
        </button>
      </>
    )}



{option.option === "RemoveStudent" && (
        <>
          <label className="remove-student">
            Student ID:
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </label>
          <button onClick={handleViewStudent}>View</button>

          {/* Display student details */}
          {studentDetails && (
            <div>
              <p>Name: {studentDetails.name}</p>
              <p>Username: {studentDetails.username}</p>
              {/* Display other details as needed */}
            </div>
          )}

          {/* Display "Remove" button only if studentDetails is available */}
          {studentDetails && <button onClick={handleRemoveStudent}>Remove</button>}
          {studentDetails && <button onClick={handleRemoveAllStudent}>Remove All</button>}


        </>
      )}

{option.option === "RemoveProfessor" && (
     <>
     <label className="remove-student">
       Professor Username:
       <input type="text" value={Pname} onChange={(e) => setPname(e.target.value)} />
     </label>
     <button onClick={handleViewProfessor}>View</button>

     {/* Display student details */}
     {professorDetails && (
       <div>
         <p>Name: {professorDetails.name}</p>
         <p>Username: {professorDetails.username}</p>
         {/* Display other details as needed */}
       </div>
     )}
     {/* Display "Remove" button only if studentDetails is available */}
     {professorDetails && <button onClick={handleRemoveProfessor}>Remove</button>}
     {professorDetails && <button onClick={handleRemoveAllProfessor}>Remove All</button>}


   </>
    )}


{option.option === "DropStudentSemRoll" && (
     <>
     <label className="remove-student">
       Semester:
       <input type="text" value={Dsem} onChange={(e) => setDsem(e.target.value)} />
     </label>
     <button onClick={handleViewDsem}>View No of student</button>

     {dsemDetails && (
       <div>
         <p>Number: {dsemDetails}</p>
       </div>
     )}
     {/* Display "Remove" button only if studentDetails is available */}
     {dsemDetails && <button onClick={handleRemoveAllDsem}>Remove All</button>}
   </>
    )}

    {option.option === "AnnouncementMail" && (
     <>     
     <GenralComponent2 option={option=option.option}/>
     </>
    )}








  </div>

);
};

export default GenralComponent;


