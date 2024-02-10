import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrashAlt, FaCheck,FaTimes } from 'react-icons/fa'; // Import the icons from React Icons
import './MarksTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon
import Navbar from '../components/NavBar';


const MarksTable = () => {
  const [marksData, setMarksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editableRowId, setEditableRowId] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchMarksData();
  }, [sortConfig]);

  useEffect(() => {
    // Add event listener for clicks outside the table
    const handleOutsideClick = (e) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(e.target) &&
        e.target.tagName !== 'BUTTON'
      ) {
        setEditableRowId(null); // Stop editing when clicked outside the table and not on a button
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const fetchMarksData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/marks-data`);
      const data = await response.json();
      setMarksData(data.content);
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const handleDeleteSearchResults = async () => {
    try {

        let confirmation=window.confirm("All data present in table at this point will be deleted. Are you sure?");
        if(confirmation){
      const idsToDelete = filteredMarksData.map((mark) => mark._id);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-marks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idsToDelete }),
      });

      if (response.ok) {
        setMarksData((prevMarksData) =>
          prevMarksData.filter((mark) => !idsToDelete.includes(mark._id))
        );
        setEditableRowId(null); // Stop editing when search results are deleted
        console.log('Data deleted successfully');
      } else {
        console.error('Error deleting data:', response.statusText);
      }
    }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (id) => {
    setEditableRowId(id);
  };

  const handleSave = async (id) => {
    try {
      const editedMark = marksData.find((mark) => mark._id === id);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-mark/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMark),
      });

      if (response.ok) {
        setEditableRowId(null);
        console.log('Data updated successfully');
      } else {
        console.error('Error updating data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-mark/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMarksData((prevMarksData) => prevMarksData.filter((mark) => mark._id !== id));
        setEditableRowId(null); // Stop editing when a row is deleted
        console.log('Data deleted successfully');
      } else {
        console.error('Error deleting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleInputChange = (e, field, id) => {
    const updatedData = marksData.map((mark) =>
      mark._id === id ? { ...mark, [field]: e.target.value } : mark
    );
    setMarksData(updatedData);
  };

  const sortedMarksData = marksData.sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    const valueA = a[key] || '';
    const valueB = b[key] || '';

    if (key === 'semester' || key === 'rollNo') {
      return (parseInt(valueA) - parseInt(valueB)) * direction;
    }

    return valueA.localeCompare(valueB) * direction;
  });

  const filteredMarksData = sortedMarksData.filter((mark) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      mark.department.toLowerCase().includes(searchTerm) ||
      mark.semester.toString().includes(searchTerm) ||
      mark.rollNo.toLowerCase().includes(searchTerm) ||
      mark.subject.toLowerCase().includes(searchTerm) ||
      Object.values(mark).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
  });

  return (
    <div>

        <Navbar />
      <h1>Marks Data</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
       <button
        onClick={handleDeleteSearchResults}
        style={{
          background: 'none',
          border: '1px solid #333',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '16px',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaTimes style={{ marginRight: '5px' }} /> {/* React Icons "times" icon */}
        Delete Search Results
      </button>
      <table className="marks-table" ref={tableRef}>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('department')}>Department</th>
            <th onClick={() => handleSort('semester')}>Semester</th>
            <th onClick={() => handleSort('rollNo')}>Roll No</th>
            <th onClick={() => handleSort('subject')}>Subject</th>
            <th>CO1</th>
            <th>CO2</th>
            <th>CO3</th>
            <th>CO4</th>
            <th>CO5</th>
            <th>CO6</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarksData.map((mark, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.department}
                    onChange={(e) => handleInputChange(e, 'department', mark._id)}
                  />
                ) : (
                  mark.department
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.semester}
                    onChange={(e) => handleInputChange(e, 'semester', mark._id)}
                  />
                ) : (
                  mark.semester
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.rollNo}
                    onChange={(e) => handleInputChange(e, 'rollNo', mark._id)}
                  />
                ) : (
                  mark.rollNo
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.subject}
                    onChange={(e) => handleInputChange(e, 'subject', mark._id)}
                  />
                ) : (
                  mark.subject
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co1}
                    onChange={(e) => handleInputChange(e, 'co1', mark._id)}
                  />
                ) : (
                  mark.co1
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co2}
                    onChange={(e) => handleInputChange(e, 'co2', mark._id)}
                  />
                ) : (
                  mark.co2
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co3}
                    onChange={(e) => handleInputChange(e, 'co3', mark._id)}
                  />
                ) : (
                  mark.co3
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co4}
                    onChange={(e) => handleInputChange(e, 'co4', mark._id)}
                  />
                ) : (
                  mark.co4
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co5}
                    onChange={(e) => handleInputChange(e, 'co5', mark._id)}
                  />
                ) : (
                  mark.co5
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <input
                    value={mark.co6}
                    onChange={(e) => handleInputChange(e, 'co6', mark._id)}
                  />
                ) : (
                  mark.co6
                )}
              </td>
              <td>
                {editableRowId === mark._id ? (
                  <button
                    onClick={() => handleSave(mark._id)}
                    style={{ background: 'none', color: 'black', border: 'none' }}
                  >
                    <FaCheck style={{ color: 'black' }} /> {/* React Icons check icon */}
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(mark._id)}
                    style={{ background: 'none', color: 'black', border: 'none' }}
                  >
                    <FaEdit style={{ color: 'black' }} /> {/* React Icons edit icon */}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(mark._id)}
                  style={{ background: 'none', color: 'black', border: 'none' }}
                >
                  <FaTrashAlt style={{ color: 'black' }} /> {/* React Icons trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
