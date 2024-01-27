// DepartmentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAcademics.css'; // Import the CSS file for styling

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
      updatedSemesters[semesterIndex] = { ...updatedSemesters[semesterIndex], subjects: value };
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
      // Send a request to remove the department
      await axios.delete(`${process.env.REACT_APP_API_URL}/remove-department/${departmentToRemove}`);
      // Handle success or redirect to another page
      console.log('Department removed successfully!');

      // Update the list of departments after removing one
      const updatedDepartments = departments.filter((department) => department !== departmentToRemove);
      setDepartments(updatedDepartments);
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

      <div className="department-list">
        
        <ul>
          {departments.map((department) => (
            <li key={department}>
              <button onClick={() => handleDepartmentClick(department)}>{department}</button>
              <button onClick={() => handleRemoveDepartment(department)}>-</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedDepartment && (
        <div className="selected-department">
          <h2>{selectedDepartment.department}</h2>
          <ul>
            {selectedDepartment.semesters.map((semester) => (
              <li key={semester.semesterNumber}>
                <strong>Semester {semester.semesterNumber}:</strong> {semester.subjects}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default DepartmentForm;
