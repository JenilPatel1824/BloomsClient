import React, { useState } from 'react';
import './FileUpload.css';
import Navbar from '../components/NavBar';

export default function UploadQuestion() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCO, setSelectedCO] = useState('');
  
  

  const subjects = {
    IT: {
      '1': {
        'subject1': 'Mathematics 1',
        'subject2': 'BEE',
        'subject3': 'PPS1',
      },
      '2': {
        'subject1': 'Mathematics 2',
        'subject2': 'PPS 2',
        'subject3': 'Physics',
      },
      '3': {
        'subject1': 'PTS',
        'subject2': 'CS',
        'subject3': 'DDC',
        'subject4': 'OOPJ',
        'subject5': 'DSA',
      },
      '4': {
        'subject1': 'DM',
        'subject2': 'CCN',
        'subject3': 'DBMS',
        'subject4': 'DAA',
        'subject5': 'MAPI',
      },
      '5': {
        'subject1': 'TAFL',
        'subject2': 'AJT',
        'subject3': 'SE',
        'subject4': 'AD',
      },
      '6': {
        'subject1': 'LT',
        'subject2': 'AOS',
        'subject3': 'FSD',
      },
      '7': {
        'subject1': 'ML',
        'subject2': 'ADOS',
        'subject3': 'WT',
      },
      '8': {
        'subject1': 'Industrial Training',
      },
    },
    CE: {
      // Define subjects for CE department and sem here
    },
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedSem('');
    setSelectedSubject('');
    setSelectedCO('');
  };

  const handleSemChange = (event) => {
    const sem = event.target.value;
    setSelectedSem(sem);
    setSelectedSubject('');
    setSelectedCO('');
   
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    setSelectedCO('');
  };

  const handleCOChange = (event) => {
    const co = event.target.value;
    setSelectedCO(co);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  const handleUpload = () => {
    if (
      selectedFile &&
      selectedDepartment &&
      selectedSem &&
      selectedSubject &&
      selectedCO
     
    ) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('department', selectedDepartment);
      formData.append('sem', selectedSem);
      formData.append('subject', selectedSubject);
      formData.append('co', selectedCO);


      fetch(`${process.env.REACT_APP_API_URL}`+"/uploadquestionendpoint", {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
          window.alert('Data Uploaded');
          // You can handle the server response here
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    } else {
      window.alert('Please enter details for all fields.');
    }
  };
  const handleDownload = async () => {
    // Replace the URL with the endpoint where your server serves the sample Excel file
    const downloadUrl = `${process.env.REACT_APP_API_URL}`+"/downloadsamplefile/Upload_Question_Sample.xlsx";
  
    // Trigger the download
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
  
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    
    // Set the filename for the downloaded file
    link.setAttribute('download', 'Upload_Question_Sample.xlsx');
    
    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const isUploadSectionVisible =
    selectedDepartment !== '' && selectedSem !== '' && selectedSubject !== '' && selectedCO !== '';

  return (
    <div>
         <Navbar />
    <div className="file-upload-container">
     <button className="download-button" onClick={handleDownload}>Download Sample File</button>

      <h1>Question Upload Page</h1>
      <div>
        <label>Department:</label>
        <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="CE">CE</option>
        </select>
      </div>

      {selectedDepartment && (
        <div>
          <label>Sem:</label>
          <select value={selectedSem} onChange={handleSemChange}>
            <option value="">Select Sem</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      )}

      {selectedSem &&
        selectedDepartment &&
        subjects[selectedDepartment]?.[selectedSem] && (
          <div>
            <label>Subject:</label>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {Object.entries(subjects[selectedDepartment][selectedSem]).map(([subjectKey, subjectValue]) => (
                <option key={subjectKey} value={subjectValue}>
                  {subjectValue}
                </option>
              ))}
            </select>
          </div>
        )}

      {selectedSubject && (
        <div>
          <label>CO:</label>
          <select value={selectedCO} onChange={handleCOChange}>
            <option value="">Select CO</option>
            <option value="CO1">CO1</option>
            <option value="CO2">CO2</option>
            <option value="CO3">CO3</option>
            <option value="CO4">CO4</option>
            <option value="CO5">CO5</option>
            <option value="CO6">CO6</option>
          </select>
        </div>
      )}

      {isUploadSectionVisible && (
        <div>
          <label className="file-input-label">
            <input type="file" onChange={handleFileChange} />
            Choose File
          </label>

          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
