// FileUpload.js
import React, { useState, useEffect } from 'react';
import './FileUpload.css';
import NavBar from '../components/NavBar';

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
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-details`); // Replace with your server's URL
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

  const handleDownload = async () => {
    const downloadUrl = `${process.env.REACT_APP_API_URL}/downloadsamplefile/Upload_Mark_Sample.xlsx`;
    const response = await fetch(downloadUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Upload_Mark_Sample.xlsx');
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

      fetch(`${process.env.REACT_APP_API_URL}/upload-endpoint`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
          window.alert('Data Uploaded');
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
    selectedSubject !== '' &&
    selectedSem !== '';

  return (
    <div>
      <NavBar />
      <div className="file-upload-container">
        <button className="download-button" onClick={handleDownload}>
          Download Sample File
        </button>

        <h1>Mark Upload Page</h1>
        <div>
          <label>Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            {Object.keys(departments).map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
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
          departments[selectedDepartment]?.[selectedSem] && (
            <div>
              <label>Subject:</label>
              <select value={selectedSubject} onChange={handleSubjectChange}>
                <option value="">Select Subject</option>
                {departments[selectedDepartment][selectedSem].map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
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
