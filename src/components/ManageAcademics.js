// DepartmentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAcademics.css'; // Import the CSS file for styling
import { FaBook, FaTimes, FaBuilding } from 'react-icons/fa'; // Import icons from react-icons library

const DepartmentForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    semesters: Array.from({ length: 8 }, (_, i) => ({ semesterNumber: i + 1, subjects: '' })),
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    // Fetch all departments upon component mount
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSemesterChange = (semesterIndex, event) => {
    const { value } = event.target;
    setFormData((prevData) => {
      const updatedSemesters = [...prevData.semesters];
      const subjectsArray = value.split(',').map(subject => subject.trim());
      updatedSemesters[semesterIndex] = { ...updatedSemesters[semesterIndex], subjects: subjectsArray };
      return { ...prevData, semesters: updatedSemesters };
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send data to the API
      await axios.post(`${process.env.REACT_APP_API_URL}/add-department`, formData);
      // Handle success or redirect to another page
      console.log('Data uploaded successfully!');
      // Optionally, reset the form or perform other actions
      setShowForm(false); // Hide the form after successful submission

      // Update the list of departments after adding a new one
      const updatedDepartments = [...departments, formData.department];
      setDepartments(updatedDepartments);
    } catch (error) {
      // Handle error
      console.error('Error uploading data:', error);
    }
  };

  const handleRemoveDepartment = async (departmentToRemove) => {
    try {

        const confirmation=window.confirm("You are trying to remove whole DEPARTMENT of "+departmentToRemove+" . Are you sure???");
        if(confirmation){
      // Send a request to remove the department
      await axios.delete(`${process.env.REACT_APP_API_URL}/remove-department/${departmentToRemove}`);
        
      // Handle success or redirect to another page
      console.log('Department removed successfully!');
        

      // Update the list of departments after removing one
      const updatedDepartments = departments.filter((department) => department !== departmentToRemove);
      setDepartments(updatedDepartments);
        }
        
    } catch (error) {
      // Handle error
      console.error('Error removing department:', error);
    }
  };

  const handleDepartmentClick = async (department) => {
    try {
      // Fetch data for the selected department
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments/${department}`);
      setSelectedDepartment(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching department data:', error);
    }
  };

  const handleHideSemesters = () => {
    // Hide semesters when clicking the department name again
    setSelectedDepartment(null);
  };

  const handleEditSemester = async (department, semesterIndex) => {
    // Fetch the current semester details if needed
  
    // Implement your logic to allow the user to edit the subjects
  
    // Send a PUT request to update the department's semesters
    const updatedSemesters = [...selectedDepartment.semesters];
    // Implement your logic to update the subjects for the specific semester
  
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/edit-department/${department}`,
        { semesters: updatedSemesters }
      );
      console.log('Semester updated successfully!');
      // Optionally, update the state or perform other actions
    } catch (error) {
      console.error('Error updating semester:', error);
    }
  };

  return (
    <div>
      <h2>ManageAcademics</h2>

      <div className="department-form-container">
        {showForm && (
          <form className="department-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Department:
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department name"
                  value={formData.department}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <div className="semester-column">
                {formData.semesters.slice(0, 4).map((semester, index) => (
                  <div key={index}>
                    <label>
                      Semester {semester.semesterNumber} Subjects:
                      <input
                        type="text"
                        name={`semesters[${index}].subjects`}
                        placeholder="Enter subjects separated by commas"
                        value={semester.subjects}
                        onChange={(event) => handleSemesterChange(index, event)}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="semester-column">
                {formData.semesters.slice(4).map((semester, index) => (
                  <div key={index + 4}>
                    <label>
                      Semester {semester.semesterNumber} Subjects:
                      <input
                        type="text"
                        name={`semesters[${index + 4}].subjects`}
                        placeholder="Enter subjects separated by commas"
                        value={semester.subjects}
                        onChange={(event) => handleSemesterChange(index + 4, event)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}

        <button onClick={() => setShowForm(!showForm)} className="add-department-button">
          {showForm ? 'Cancel' : 'Add Department'}
        </button>



        <div className="department-list" style={{ width: '100%', textAlign: 'left', padding: '10px' }}>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {departments.map((department) => (
      <li
        key={department}
        style={{
          borderBottom: '1px solid #ccc', // Adding a border at the bottom of each list item
          margin: '5px 0',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between', // Align buttons at the ends
          alignItems: 'center', // Center items vertically
          fontWeight: 'bold', // Making the department name bold
        }}
      >
        <button
          onClick={() => handleDepartmentClick(department)}
          onBlur={handleHideSemesters}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#000', // Set text color to black
            display: 'flex',
            alignItems: 'center', // Align icon and text vertically
          }}
        >
          <FaBuilding style={{ marginRight: '8px' }} />
          {department}
        </button>
        <button
          onClick={() => handleRemoveDepartment(department)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#000', // Set text color to black
          }}
        >
          <FaTimes />
        </button>
      </li>
    ))}
  </ul>
</div>

{/* Selected Department */}

{/* Selected Department */}
{/* Selected Department */}
{selectedDepartment && (
  <div
    className="selected-department"
    style={{
      textAlign: 'left',
      padding: '15px',
      margin: '20px 0',
      width: '100%', // Ensure full width
      border: '1px solid #ddd', // Adding a border for a subtle box around the selected department
      borderRadius: '8px', // Adding border radius for a slightly rounded corner
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow for depth
      backgroundColor: '#f8f8f8', // Setting a light background color
    }}
  >
    <h2 style={{ margin: '0', color: '#333' }}>
      <FaBuilding style={{ marginRight: '8px' }} />
      {selectedDepartment.department}
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Two columns layout
        gap: '20px', // Gap between columns
        marginTop: '15px',
      }}
    >
      <div>
        {selectedDepartment.semesters.slice(0, 4).map((semester) => (
          <div
            key={semester.semesterNumber}
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1em',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <strong style={{ color: '#555', marginBottom: '8px' }}>
              <FaBook style={{ marginRight: '8px' }} />
              Semester {semester.semesterNumber}:
            </strong>
            <span>{semester.subjects.join(', ')}</span>
          </div>
        ))}
      </div>

      <div>
        {selectedDepartment.semesters.slice(4).map((semester) => (
          <div
            key={semester.semesterNumber}
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1em',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <strong style={{ color: '#555', marginBottom: '8px' }}>
              <FaBook style={{ marginRight: '8px' }} />
              Semester {semester.semesterNumber}:
            </strong>
            <span>{semester.subjects.join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}






        
      </div>
    </div>
  );
};

export default DepartmentForm;
