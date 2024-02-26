import React, { useState,useEffect } from 'react';
import './FileUpload.css';
import Navbar from '../components/NavBar';
import { FaDownload, FaUpload } from 'react-icons/fa';

export default function UploadQuestion() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCO, setSelectedCO] = useState('');
  const [departments, setDepartments] = useState({});
  const[uploadedFileName,setUploadedFileName]=useState("No File Selected");

  


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
    setUploadedFileName(file.name);
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
     <button className="download-button" onClick={handleDownload}>
      <FaDownload />  Sample File</button>

      <h1>Question Upload Page</h1>
      <div>
      <label>Department</label>

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
          <label>Sem</label>


            <label>
              
              <select value={selectedSem} onChange={handleSemChange}>
                <option value="">Select Semester</option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </label>
            </div>
          )}
      

      {selectedSem &&
            selectedDepartment &&
            departments[selectedDepartment]?.[selectedSem] && (
              <div>
                      <label>Subject</label>

              <label>
               
                <select value={selectedSubject} onChange={handleSubjectChange}>
                  <option value="">Select Subject</option>
                  {Object.entries(departments[selectedDepartment][selectedSem]).map(([subjectKey, subjectValue]) => (
                    <option key={subjectKey} value={subjectValue}>
                      {subjectValue}
                    </option>
                  ))}
                </select>
              </label>
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
                          {uploadedFileName && <p style={{ marginTop : '100px' }}>Uploaded File: {uploadedFileName}</p>}

          <label className="file-input-label">
            <input type="file" onChange={handleFileChange} />
            Choose File
          </label>

          <button className="upload-button" onClick={handleUpload}>
            <FaUpload />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
