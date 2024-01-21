// ViewSubmissions.js

import React, { useState } from 'react';
import './SubmissionPage.css';
import Navbar from '../components/NavBar';

const ViewSubmissions = () => {
  const [studentData, setStudentData] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [isSubjectVisible, setIsSubjectVisible] = useState(false);
  const [isShowButtonVisible, setIsShowButtonVisible] = useState(false);
  const [showDetailsIndex, setShowDetailsIndex] = useState(null);
  const [showSubmissionIndex, setShowSubmissionIndex] = useState(null);
  const [submissionLink, setSubmissionLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remark, setRemark] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowButton = async (sem, subjectName) => {
    setIsLoading(true);

    const res = await fetch(`${process.env.REACT_APP_API_URL}`+"/geteverythingaboutstudent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        sem,
        subjectName,
      }),
    });

    const data = await res.json();
    setStudentData(data);
    
    setIsLoading(false);
  };

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const subjectsBySemester = {
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
  };

  const handleSemesterChange = (event) => {
    const newSemester = event.target.value;
    setSelectedSemester(newSemester);
    setSelectedSubjectCode('');
    setSelectedSubjectName('');
    setIsSubjectVisible(Boolean(newSemester));
    setIsShowButtonVisible(false);
    setSearchTerm('');
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectCode = event.target.value;
    const selectedSubjectName =
      subjectsBySemester[selectedSemester] &&
      subjectsBySemester[selectedSemester][selectedSubjectCode];
    setSelectedSubjectCode(selectedSubjectCode);
    setSelectedSubjectName(selectedSubjectName);
    setIsShowButtonVisible(Boolean(selectedSubjectCode));
    setSearchTerm('');
  };

  const handleViewSubmission = async (index, selectedSemester, selectedSubjectName, studentName, coItem) => {
    setShowSubmissionIndex(showSubmissionIndex === index ? null : index);

    const response = await fetch(`${process.env.REACT_APP_API_URL}`+"/getsubmissionlink", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        semester: selectedSemester,
        subject: selectedSubjectName,
        name: studentName,
        co: coItem,
      }),
    });

    const statusofaction = await response.json();
    
    if (statusofaction.error === "Student has not Submitted Anything Yet.") {
      window.alert("Student has not submitted anything.");
    }

    setSubmissionLink(statusofaction.submissionLink);

    let statusMessage = '';
    if (statusofaction.flag === "-1") {
      statusMessage = "Rejected Once";
    } else if (statusofaction.flag === "0") {
      statusMessage = "Accepted";
    } else if (statusofaction.flag === "2") {
      statusMessage = "Rejected Twice";
    }
    else if (statusofaction.flag === "1") {
      statusMessage = "Student Has Submitted";
    }

    setStatusMessage(statusMessage);
  };

  const handleAcceptReject = async (action, coIndex, coItem, selectedSemester, selectedSubjectName, stdid, remark) => {
    const submissionverifier = await fetch(`${process.env.REACT_APP_API_URL}`+"/verifysubmission", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: action,
        remark: remark,
        coItem: coItem,
        sem: selectedSemester,
        subject: selectedSubjectName,
        id: stdid,
      }),
    });

    const statusofaction = await submissionverifier.json();

    if (submissionverifier.error === "Submission details not found error") {
      window.alert("Submission details not found error");
    }

    setSubmissionLink(statusofaction.submissionLink);

    let statusMessage = '';
    if (statusofaction.flag === "-1") {
      statusMessage = "Rejected Once";
    } else if (statusofaction.flag === "0") {
      statusMessage = "Accepted";
    } else if (statusofaction.flag === "2") {
      statusMessage = "Rejected Twice";
    }

    setStatusMessage(statusMessage);
  };
  

  const filterFlaggedStudents = () => {
    if (!studentData) {
      return [];
    }
    const searchTermLowerCase = searchTerm.toLowerCase();
    return studentData.filter((student) => {
      const isFlagged = student.flag;
      return isFlagged && student.ID.toLowerCase().includes(searchTermLowerCase);
    });
  };

  return (
    <div>
         <Navbar />
    <div className="submission-container">
      <h1 className="page-title">Welcome to the Submission Page</h1>

      <form className="submission-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Select Semester:
          <select value={selectedSemester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </label>

        {isSubjectVisible && (
          <label>
            Select Subject:
            <select value={selectedSubjectCode} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {Object.entries(subjectsBySemester[selectedSemester] || {}).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        )}

        {isShowButtonVisible && (
          <button className="show-button" onClick={() => handleShowButton(selectedSemester, selectedSubjectName)}>
            Show
          </button>
        )}

        {isShowButtonVisible && (
          <div className="search-container">
            <label>
              Search by Name:
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        )}
      </form>

      {isShowButtonVisible && (
        <div className="student-information">
          <h2>Student Information</h2>
          {filterFlaggedStudents().length > 0 ? (
            filterFlaggedStudents().map((student, index) => (
              <div key={`${student.ID}_${index}`} className="student-details">
                <p>Name: {student.ID}</p>

                <button
                  className="details-button"
                  onClick={() => setShowDetailsIndex(showDetailsIndex === index ? null : index)}
                >
                  {showDetailsIndex === index ? 'Hide Details' : 'More Details'}
                </button>

                {showDetailsIndex === index && (
                  <div className="co-details">
                    {student.CoArray.map((coItem, coIndex) => (
                      <div key={`${student.ID}_${coIndex}`} className="co-item">
                        <p>{`${Object.keys(coItem)[0]}: ${Object.values(coItem)[0]}`}</p>

                        {coItem.questions && coItem.questions.length > 0 && (
                          <div className="questions">
                            <p>Questions:</p>
                            {coItem.questions.map((question, qIndex) => (
                              <p key={`${student.ID}${coIndex}${qIndex}`}>
                                {`${qIndex + 1}. ${question}`}
                              </p>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => handleViewSubmission(
                            coIndex,
                            selectedSemester,
                            selectedSubjectName,
                            student.ID,
                            coItem
                          )}
                          className="view-submission-button"
                        >
                          View Submission
                        </button>

                        {showSubmissionIndex === coIndex && statusMessage !== "Accepted" && (
                          <div className="submission-actions">
                            <label>
                              Remark:
                              <input
                                type="text"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                              />
                            </label>
                            <button
                              onClick={() => handleAcceptReject('accept', coIndex, coItem, selectedSemester, selectedSubjectName, student.ID, remark)}
                              className="accept-button"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleAcceptReject('reject', coIndex, coItem, selectedSemester, selectedSubjectName, student.ID, remark)}
                              className="reject-button"
                            >
                              Reject
                            </button>
                            {submissionLink && (
                              <div className="submission-details">
                                <p>Submission Details:</p>
                                <p>
                                  Submission Link: <a href={submissionLink} target="_blank" rel="noopener noreferrer">{submissionLink}</a>
                                </p>
                                <p>Status: {statusMessage}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-matching-students">No matching students found.</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default ViewSubmissions;