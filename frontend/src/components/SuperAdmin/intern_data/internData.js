import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { Table, Box, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const InternTable = () => {
  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [internsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/intern_data');
        setInterns(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (candidateID) => {
    console.log("Deleting intern with ID: ", candidateID); // Log the ID for debugging
    try {
      await axios.delete(`http://localhost:5000/intern_data/${candidateID}`);
      setInterns((prevInterns) => prevInterns.filter(intern => intern.candidateID !== candidateID));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = interns.slice(indexOfFirstIntern, indexOfLastIntern);

  const totalPages = Math.ceil(interns.length / internsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container className="intern-table-container" style={{ overflow: 'auto', width: "1200px" }}>
      <Table
        bordered
        hover
        responsive
        style={{ backgroundColor: '#1f2c39' }}
      >
        <thead style={{ backgroundColor: '#1f2c39', color: 'white' }}>
          <tr>
            <th style={{ padding: '16px' }}>Intern ID</th>
            <th style={{ padding: '16px' }}>Full Name</th>
            <th style={{ padding: '16px' }}>Email</th>
            <th style={{ padding: '16px' }}>Mobile No</th>
            <th style={{ padding: '16px' }}>Domain</th>
            <th style={{ padding: '16px' }}>Batch No</th>
            <th style={{ padding: '16px' }}>Mode of Internship</th>
            <th style={{ padding: '16px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentInterns.map(intern => (
            <tr key={intern.candidateID} style={{ backgroundColor: '#ffffff', '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.candidateID}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.fullName}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.email}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.mobileNo}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.domain}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.batchNo}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>{intern.modeOfInternship}</td>
              <td style={{ padding: '16px' }}>
                <Button variant="danger" onClick={() => handleDelete(intern.candidateID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default InternTable;
