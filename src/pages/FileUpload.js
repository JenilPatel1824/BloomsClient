import React, { useState } from 'react';
import './FileUpload.css';
import NavBar from '../components/NavBar';

let gfsessionl;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [coMarks, setCoMarks] = useState({
    co1: '',
    co2: '',
    co3: '',
    co4: '',
    co5: '',
    co6: '',
  });

  
  const [cutoff, setCutoff] = useState('');


  


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

  
  const handleDownload = async () => {
    // Replace the URL with the endpoint where your server serves the sample Excel file
    const downloadUrl = `${process.env.REACT_APP_API_URL}`+"/downloadsamplefile/Upload_Mark_Sample.xlsx";
  
    // Trigger the download
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
  
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    
    // Set the filename for the downloaded file
    link.setAttribute('download', 'Upload_Mark_Sample.xlsx');
    
    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedYear('');
    setSelectedSubject('');
    setSelectedSem('');
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  const handleSemChange = (event) => {
    const sem = event.target.value;
    setSelectedSem(sem);
    setSelectedSubject('');
    setCoMarks({
      co1: '',
      co2: '',
      co3: '',
      co4: '',
      co5: '',
      co6: '',
    });
    setCutoff('');
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCoMarkChange = (co, value) => {
    setCoMarks((prevCoMarks) => ({
      ...prevCoMarks,
      [co]: value,
    }));
  };

  const handleCutoffChange = (event) => {
    const value = event.target.value;
    setCutoff(value);
  };

  const handleUpload = () => {
    if (
      selectedFile &&
      selectedDepartment &&
      selectedYear &&
      selectedSubject &&
      selectedSem &&
      Object.values(coMarks).every((co) => co !== '') &&
      cutoff !== ''
    ) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('department', selectedDepartment);
      formData.append('year', selectedYear);
      formData.append('subject', selectedSubject);
      formData.append('sem', selectedSem);
      formData.append('coMarks', JSON.stringify(coMarks));
      formData.append('cutoff', cutoff);

      gfsessionl = selectedSem;

      fetch(`${process.env.REACT_APP_API_URL}`+"/upload-endpoint", {
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

  const isUploadSectionVisible =
    selectedDepartment !== '' &&
    selectedYear !== '' &&
    selectedSubject !== '' &&
    selectedSem !== '';

  return (
    
    <div>
      <NavBar />
      <div className="file-upload-container">
        
            <button className="download-button" onClick={handleDownload}>Download Sample File</button>

      <h1>Mark Upload Page</h1>
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
          <label>Year:</label>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      )}

      {selectedYear && (
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

      {isUploadSectionVisible && (
        <div>
          <label className="file-input-label">
            <input type="file" onChange={handleFileChange} />
            Choose File
          </label>

          <div>
            <label>CO Marks:</label>
            {Object.entries(coMarks).map(([co, value]) => (
              <input
                key={co}
                type="number"
                placeholder={`CO${co.charAt(co.length - 1)}`}
                value={value}
                onChange={(e) => handleCoMarkChange(co, e.target.value)}
              />
            ))}
          </div>

          <div>
            <label>Cutoff:</label>
            <input type="number" placeholder="Cutoff" value={cutoff} onChange={handleCutoffChange} />
          </div>

          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default FileUpload;
export { gfsessionl };
