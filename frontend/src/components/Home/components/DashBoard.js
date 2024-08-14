import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Cookies from 'js-cookie';
import ramana from '../images/p3.jpeg';
import { Link, useNavigate } from 'react-router-dom';



const JobPortal = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const verified = Cookies.get('verified');
  //   if (verified === undefined) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([
    { id: 'JS001', name: 'Tech Innovators Inc.', appliedCount: 42, technology: 'JavaScript', lastDate: '2024-08-15', jobType: 'Full-Time', city: 'Pune' },
    { id: 'JS002', name: 'CodeCrafters Ltd.', appliedCount: 55, technology: 'JavaScript', lastDate: '2024-08-20', jobType: 'Part-Time', city: 'Madurai' },
    { id: 'PY001', name: 'DataMasters Corp.', appliedCount: 37, technology: 'Python', lastDate: '2024-09-01', jobType: 'Full-Time', city: 'Noida' },
    { id: 'PY002', name: 'AI Pioneers Inc.', appliedCount: 29, technology: 'Python', lastDate: '2024-09-05', jobType: 'Contract', city: 'Bangelore' },
    { id: 'JA001', name: 'Enterprise Solutions Ltd.', appliedCount: 48, technology: 'Java', lastDate: '2024-08-30', jobType: 'Full-Time', city: 'Hyderabad' },
    { id: 'JA002', name: 'Backend Builders LLC.', appliedCount: 53, technology: 'Java', lastDate: '2024-09-10', jobType: 'Part-Time', city: 'Chennai' },
    { id: 'CS001', name: 'DotNet Developers Inc.', appliedCount: 34, technology: 'C#', lastDate: '2024-08-25', jobType: 'Full-Time', city: 'Chennai' },
    { id: 'CS002', name: 'Sharp Coders Ltd.', appliedCount: 41, technology: 'C#', lastDate: '2024-09-02', jobType: 'Contract', city: 'Mumbai' },
  ]);

  const getUserInitials = (name) => {
    if (!name) return 'RS';
    const initials = name.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  const filteredCompanies = companies.filter((company) => {
    const searchText = searchTerm.toLowerCase();
    return (
      company.id.toLowerCase().includes(searchText) ||
      company.name.toLowerCase().includes(searchText) ||
      company.technology.toLowerCase().includes(searchText) ||
      company.lastDate.toLowerCase().includes(searchText) ||
      company.jobType.toLowerCase().includes(searchText) ||
      company.city.toLowerCase().includes(searchText) ||
      company.appliedCount.toString().includes(searchText)
    );
  });

  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={ramana}
              width="200"
              className="d-inline-block align-top rounded"
              alt="Left Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/about" className="fw-bold me-4 text-secondary">About</Nav.Link>
              <Nav.Link href="#applied" className="fw-bold me-4 text-secondary">Applied</Nav.Link>
              <Nav.Link href="/dashboard/profile" className="fw-bold me-4 text-secondary">Profile</Nav.Link>
            </Nav>
            <Nav>
              <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold" style={{ width: '50px', height: '50px' }}>
                {getUserInitials(sessionStorage.getItem('name')).toString()}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h1 className="mb-4">IT Job Portal</h1>
        <p className="mb-4">Welcome to our IT Job Portal. Use the search bar below to filter job opportunities.</p>

        <TextField
          className="mb-4 w-75 rounded"
          placeholder="Search jobs by technology, job type, city etc.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i class="fa-solid fa-magnifying-glass fs-5"></i>
              </InputAdornment>
            ),
          }}
        />

        <div>
          <hr></hr>
          {filteredCompanies.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className='bg-info'>Job ID</th>
                  <th className='bg-info'>Company Name</th>
                  <th className='bg-info'>Technology</th>
                  <th className='bg-info'>Last Date</th>
                  <th className='bg-info'>Job Type</th>
                  <th className='bg-info'>City</th>
                  <th className='bg-info'>Total Applied</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, index) => (
                  <tr key={index}>
                    <td>{company.id}</td>
                    <td>
                      <Link to={`/company/${company.id}`} className='text-decoration-none fw-bold'>
                        {company.name}
                      </Link>
                    </td>
                    <td>{company.technology}</td>
                    <td>{company.lastDate}</td>
                    <td>{company.jobType}</td>
                    <td>{company.city}</td>
                    <td>{company.appliedCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className='text-secondary text-center fw-bold mt-5'>No job opportunities available.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default JobPortal;
