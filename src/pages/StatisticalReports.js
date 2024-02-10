import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
  InputLabel,
  Input,
  FormControl,
  Box,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/NavBar';

const generateDemoData = () => {
  let dataobj = [
    { department: 'Computer Science', semester: 1, subject: 'Mathematics', skill: 'Problem Solving', unsuccessfulStudents: 15, successfulSubmissions: 85 },
    { department: 'Computer Science', semester: 1, subject: 'Physics', skill: 'Experimental Skills', unsuccessfulStudents: 5, successfulSubmissions: 95 },
    // Add more data...
  ];

  return dataobj;
};

const StatisticalReports = () => {
  const chartCanvasRef = useRef(null);

  const [data, setData] = useState(generateDemoData());
  const [filteredData, setFilteredData] = useState(data); // New state for filtered data
  const [chartData, setChartData] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
    console.log("fetch called");
  }, []);

  useEffect(() => {
    // Update filteredData whenever data or searchQuery changes
    const filteredData = data.filter((row) =>
      ['Department', 'Semester', 'Subject', 'Skill'].some((property) =>
        String(row[property]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  }, [data, searchQuery]);

  const fetchData = async (username) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getreports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      let reportresult = await response.json();
      console.log(reportresult.data);
      setData(reportresult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (property) => {
    const newSortOrder = sortBy === property && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(property);
    setSortOrder(newSortOrder);

    const sortedData = [...filteredData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });

    setFilteredData(sortedData);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleVisualize = () => {
    const chartLabels = filteredData.map((row) => `${row.Department} - Sem ${row.Semester} - ${row.Subject} - ${row.Skill}`);
    const chartDataset = filteredData.map((row) => row.UnsuccessfulStudents);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Unsuccessful Students',
          data: chartDataset,
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    });
  };

  useEffect(() => {
    const chartCanvas = chartCanvasRef.current;

    if (chartCanvas && chartData) {
      chartCanvas.width = 20; // Adjust the width as needed
      chartCanvas.height = 20; // Adjust the height as needed

      const chartContext = chartCanvas.getContext('2d');
      if (chartContext) {
        chartContext.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

        new Chart(chartContext, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Unsuccessful Students Visualization',
                font: {
                  size: 16,
                },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return (
    <div>

      <Navbar />

      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          Statistics Report
        </Typography>
      </Box>

      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <Input id="search-input" type="text" value={searchQuery} onChange={handleSearch} label="Search" />
      </FormControl>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={() => handleSort('UnsuccessfulStudents')} variant="contained" color="primary">
          Sort by Unsuccessful Students {sortBy === 'UnsuccessfulStudents' && (sortOrder === 'asc' ? '↑' : '↓')}
        </Button>

       

        <Button onClick={handleVisualize} variant="contained" color="primary">
          Visualize Data
        </Button>
      </Box>

      <Box mt={3}>
        <Paper>
          <canvas ref={chartCanvasRef} />
        </Paper>
      </Box>

      <Box mt={3}>
        {chartData && <Bar data={chartData} />}
      </Box>

      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Skill</TableCell>
                <TableCell>Unsuccessful Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Department}</TableCell>
                  <TableCell>{row.Semester}</TableCell>
                  <TableCell>{row.Subject}</TableCell>
                  <TableCell>{row.Skill}</TableCell>
                  <TableCell>{row.UnsuccessfulStudents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default StatisticalReports;
