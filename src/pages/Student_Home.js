// Student_Home.js
import { luname } from './Signin';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import React, { useState, useEffect } from 'react';
import './StudentHome.css';
let cutoffmarkso={};
let cocutoffflaga=[];
// for(let x=0;x<6;x++)
// {
//   cocutoffflaga[x]=false;
// }



const Student_Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const handleReload = (event) => {
      // Check if Ctrl (or Command) + R is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        const confirmReload = window.confirm('Are you sure you want to reload the page?');
        if (!confirmReload) {
          event.preventDefault(); // Prevent the default reload behavior
        }
      }
    };


    const fetchData = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    window.addEventListener('keydown', handleReload);

    return () => {
      window.removeEventListener('keydown', handleReload);};

    fetchData(); // Fetch data when the component mounts
  }, []);


   const navigate = useNavigate();
   const [hasAssignedQuestions, setHasAssignedQuestions] = useState(false);



 const checkCutoff = (value,subj,num) => {
  let c=cutoffmarkso[subj];
  if(value<c[num-1])
  {
    
    return false;
  }
  else{

    return true;
  } 
};

const checkTotal = (val1, val2, val3, val4, val5, val6, Sub) => {
  let c = cutoffmarkso[Sub];
  console.log(Sub);
  let a = [val1, val2, val3, val4, val5, val6];
  // Check if c is defined and is an array
  if (Array.isArray(c) && c.length === a.length) {
    
   for(let x=0;x<6;x++)
   {
    if(a[x]<c[x])
    {
      console.log(a[x]+"    "+c[x]);
      cocutoffflaga[x]=1;
    }
    else{
      console.log("in else");
      console.log(a[x]+"    "+c[x]);
      cocutoffflaga[x]=0;

    }
   }
    for (let x=0;x<6;x++) {
      if (a[x]<c[x]) {
        
        return false;
      }
    }
    console.log(cocutoffflaga);
    return true;
   } //else {
  //   // Handle the case where c is not defined or not an array
  //   console.error("Invalid or undefined cutoffmarkso[sub]");
  //   return false;
  // }
};



const checkerforautomatic = async (sdata) => {
  try {
    console.log("Function called");
    if (!hasAssignedQuestions) {
      setHasAssignedQuestions(true);

      const ssdata = {
        subject: sdata.subject,
        semester: sdata.semester,
        studentId: sdata.studentId,
        rollNo: sdata.rollNo,
        requiredco: cocutoffflaga,
      };

      console.log('Subject value before making the request:', sdata.subject); // Add this log

      const res = await fetch(`${process.env.REACT_APP_API_URL}`+"/checkerforfunctioncall", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ssdata),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Received response from checkerforfunctioncall:', data);

      if (data) {
        await assignquestionautomatically(sdata);
        navigate(`/practice-questions/${ssdata.subject}`);
      } else {
        // Set the state back to indicate assignment is complete
        setHasAssignedQuestions(false);
        navigate(`/practice-questions/${ssdata.subject}`);
      }
    }
  } catch (error) {
    console.error('Error in checkerforautomatic:', error);

    // Set the state back to indicate assignment is complete
    setHasAssignedQuestions(false);
  }
};


const assignquestionautomatically = async (sdata) => {
  try {

    console.log('assignquestionautomatically function is called');
    if (!sdata.subject) {
      console.error('Subject is undefined');
      return;
    }
    

    const ssdata = {
      subject: sdata.subject,
      semester: sdata.semester,
      studentId: sdata.studentId,
      rollNo: sdata.rollNo,
      requiredco: cocutoffflaga,
    };
    console.log('Sending fetchpq request with data:', ssdata);

    const res = await fetch(`${process.env.REACT_APP_API_URL}`+"/fetchpracticequestion", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ssdata),
    });

    const responseData2=await res.json();
    // window.alert(responseData2.practiceQuestions);
    // console.log(ssdata.studentId);
    
  

    // Handle the response as needed
  } catch (error) {
    console.error('Error in assignquestionautomatically:', error);
  }

};






  const [studentData, setStudentData] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`+"/fetchmark", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ luname }),
        });

        if (response.ok) {
          const data = await response.json();
          const subjects = data.m1.map((subjectData) => subjectData.subject);
          setStudentData(data.m1);  // Assuming 'm1' is the key for the required data
          // Initialize showDetails state with false for each CO
          
          const fdata = await fetch(`${process.env.REACT_APP_API_URL}`+"/fetchcutoff", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subjects),
        });
        const subdata = await fdata.json();
        for(let subdataa of subdata)
        {
          let cutoff=subdataa.cutoff;
          let coarray=subdataa.coMarks;
          let cutoffmarksa = [];
          for(let coMark of coarray)
          {
      
              let co1cutoff=coMark*cutoff/100;

              cutoffmarksa.push(co1cutoff);

          }

          cutoffmarkso[subdataa.subject]=cutoffmarksa;
        }


        setShowDetails(Object.fromEntries(data.m1.map(subjectData => ([subjectData.subject, false]))));
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [luname]); // Fetch data whenever luname changes

  const handleToggleDetails = (subject) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [subject]: !prevDetails[subject],
    }));
  };

  return (
    <div className="student-data-container">
      <h1>Student Data</h1>

      
      {studentData && (
        <div className="data-display">
          {/* Display specific key-value pairs in new lines */}
          {studentData.map((subjectData, index) => (
            <div key={index}>
              <p className="data-item">
                <span className="data-key">Subject:</span>
                <span className="data-value">{subjectData.subject}</span>
              </p>
              <p className="data-item">
                <span className="data-key">CO Total:</span>
                <span className="data-value" id={checkTotal(subjectData.co1, subjectData.co2, subjectData.co3, subjectData.co4, subjectData.co5, subjectData.co6, subjectData.subject,subjectData) ? '' : 'red-text'}>
                                    {subjectData.co1 + subjectData.co2 + subjectData.co3 + subjectData.co4 + subjectData.co5 + subjectData.co6}
                </span>

                {!checkTotal(subjectData.co1, subjectData.co2, subjectData.co3, subjectData.co4, subjectData.co5, subjectData.co6, subjectData.subject) && (
                  <button className="practice-button" onClick={async () => await checkerforautomatic(subjectData)}>Practice</button>

  )}
  
              </p>
              <p className="data-item">
                <span className="data-key">Roll Number:</span>
                <span className="data-value">{subjectData.rollNo}</span>
              </p>

              {/* Display toggle details button for each subject */}
              <button onClick={() => handleToggleDetails(subjectData.subject)}>
                {showDetails[subjectData.subject] ? 'Hide Details' : 'More Details'}
              </button>

              {/* Display CO details when the corresponding button is toggled */}
              {showDetails[subjectData.subject] && (
                <>
                <p className="data-item">
                  
                <span className="data-key">CO1:</span>
                <span className={`data-value ${checkCutoff(subjectData.co1,subjectData.subject,1) ? '' : 'red-text'}`}>{subjectData.co1}</span>
          
                </p>
                <p className="data-item">
                  <span className="data-key">CO2:</span>
                  <span className={`data-value ${checkCutoff(subjectData.co2,subjectData.subject,2) ? '' : 'red-text'}`}>{subjectData.co2}</span>
     
                </p>
                <p className="data-item">
                  <span className="data-key">CO3:</span>
                  <span className={`data-value ${checkCutoff(subjectData.co3,subjectData.subject,3) ? '' : 'red-text'}`}>{subjectData.co3}</span>

            </p>
                <p className="data-item">
                  <span className="data-key">CO4:</span>
                  <span className={`data-value ${checkCutoff(subjectData.co4,subjectData.subject,4) ? '' : 'red-text'}`}>{subjectData.co4}</span>
   
                </p>
                <p className="data-item">
                  <span className="data-key">CO5:</span>
                  <span className={`data-value ${checkCutoff(subjectData.co5,subjectData.subject,5) ? '' : 'red-text'}`}>{subjectData.co5}</span>
    
                </p>
                <p className="data-item">
                  <span className="data-key">CO6:</span>
                  <span className={`data-value ${checkCutoff(subjectData.co6,subjectData.subject,6) ? '' : 'red-text'}`}>{subjectData.co6}</span>
       
                </p>
              </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Student_Home;
