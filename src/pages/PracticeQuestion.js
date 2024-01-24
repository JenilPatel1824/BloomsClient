import React, { useState, useEffect, useCallback } from 'react';
import { luname } from './Signin';
import './PracticeQuestion.css';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


export default function PracticeQuestion() {
  const { subject } = useParams();
  console.log(subject);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCO, setSelectedCO] = useState('');
  const [cosForSelectedSubject, setCosForSelectedSubject] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [driveLink, setDriveLink] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [flag, setFlag] = useState(null);
  const [toggleButton, setToggleButton] = useState(true); // true: Check Status, false: Submit Drive Link

  const fetchData = useCallback(async () => {
    try {
      const ssdata = { luname };
      const res = await fetch(`${process.env.REACT_APP_API_URL}`+"/fetchassignedquestions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ssdata),
      });
      const responseData = await res.json();
      
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (subject && data && data.length > 0) {
      const selectedSubjectData = data.filter(item => item.subject === subject);
      const allCOs = [...new Set(selectedSubjectData.flatMap(item => item.CO))];
      setCosForSelectedSubject(allCOs.map(co => (co ? co.toUpperCase() : '')));
      setSelectedCO('');
    }
  }, [subject, data]);

  useEffect(() => {
    if (subject && selectedCO && data && data.length > 0) {
      const selectedQuestions = data
        .filter(item => item.subject === subject && item.CO && item.CO.toUpperCase() === selectedCO.toUpperCase())
        .flatMap(item => item.questions);
      setSelectedQuestions([...new Set(selectedQuestions)]);
    } else {
      setSelectedQuestions([]);
    }
  }, [subject, selectedCO, data]);

  const handleButtonClick = () => {
    // Resetting previous status
    setSubmitClicked(false);

    // Making a request to check the status
    const statusData = {
      luname: luname,
      subject: subject,
      selectedCO: selectedCO,
      driveLink: driveLink,
    };

    fetch(`${process.env.REACT_APP_API_URL}`+"/uploadsubmission", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Status check success:', data);
        let status1;
        if (data.flag === "1") {
          status1 = "Pending For Verification";
        } else if (data.flag === "0") {
          status1 = "Submission is accepted";
        } else if (data.flag === "-1") {
          status1 = "Your Submission has been rejected";
        } else if (data.flag === "2") {
          status1 = "Your Submission is rejected 2nd time. Please meet Professor";
        }

        setStatusMessage(status1);
        setRemark(data.remark);
        setFlag(data.flag);
        setSubmitClicked(true);
        setToggleButton(false); // Switch to "Submit Drive Link" mode
      })
      .catch(error => {
        console.error('Error checking status:', error);
        window.alert('An error occurred while checking the status.');
      });
  };

  const handleSubmitDriveLink = () => {
    if (!driveLink) {
      window.alert('Please enter a valid Drive Link.');
      return;
    }

    const uploadData = {
      luname: luname,
      subject: subject,
      selectedCO: selectedCO,
      driveLink: driveLink,
    };

    fetch(`${process.env.REACT_APP_API_URL}`+"/uploadsubmission", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Upload success:', data);
        let status;
        if (data.flag === "1") {
          status = "Pending For Verification";
        } else if (data.flag === "0") {
          status = "Submission is accepted";
        } else if (data.flag === "-1") {
          status = "Your Submission has been rejected";
        } else if (data.flag === "2") {
          status = "Your Submission is rejected 2nd time. Please meet Professor";
        }

        setStatusMessage(status);
        setRemark(data.remark);
        setToggleButton(true); // Switch back to "Check Status" mode
        setSubmitClicked(true);
        window.alert(data.message);
      })
      .catch(error => {
        console.error('Error handling upload submission:', error);
        window.alert('An error occurred while processing the submission.');
      });
  };

  const handleHideStatus = () => {
    // Reset state when hiding status
    setSubmitClicked(false);
    setToggleButton(true);
    setStatusMessage('');
    setRemark('');
  };

  return (
    <div className="practice-container">
      <h2>Practice Page</h2>

      {loading && (
              <div className="loading-overlay">
                <ClipLoader color="#3498db" loading={loading} size={50} />
              </div>
            )}

      <div className="select-container">
        {subject && (
          <div>
            <label>CO:</label>
            <select className="select-box" onChange={(e) => setSelectedCO(e.target.value)} value={selectedCO}>
              <option value="">Select CO</option>
              {cosForSelectedSubject.map((co, index) => (
                <option key={index} value={co}>{co}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {(subject && selectedCO !== '') && (
        <div className="selected-info">
          <h3>Selected Subject: {subject}</h3>
          <h4>Selected CO: {selectedCO}</h4>
          <ul>
            {selectedQuestions.map((question, questionIndex) => (
              <li key={questionIndex}>{question}</li>
            ))}
          </ul>

          {submitClicked && (
            <div className="status-container">
              <h4>Status: {statusMessage}</h4>
              {remark && <p>Remark: {remark}</p>}
              {flag === "0" ? (
                // Render nothing when flag is "0"
                <></>
              ) : (
                <div className="drive-link-container">
                  <label>Enter Drive Link:</label>
                  <input type="text" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} />
                  <button onClick={handleSubmitDriveLink}>Submit Drive Link</button>
                </div>
              )}
              <button onClick={handleHideStatus}>Hide Status</button>
            </div>
          )}

          {!submitClicked && toggleButton && (
            <div className="submit-button-container">
              <button onClick={handleButtonClick}>Check Status</button>
            </div>
          )}

          {!toggleButton && !submitClicked && (
            <div className="drive-link-container">
              <label>Enter Drive Link:</label>
              <input type="text" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} />
              <button onClick={handleSubmitDriveLink}>Submit Drive Link</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
