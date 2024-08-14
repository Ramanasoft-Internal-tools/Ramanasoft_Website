import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Box, Pagination } from '@mui/material';
import Cookies from 'js-cookie'
const qualifications = [
  'High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'
];

const experienceOptions = [
  '0-6 months', '6 months-1 year', '1-2 years', '2-3 years', '3-5 years', '5+ years'
];

const cities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'
];

const technologies = [
  'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin'
];

const HrViewJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const candidateID = Cookies.get("internID");
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedJobRole,setSelectedJobRole]=useState('');
  const [jobRoles, setJobRoles] = useState([]); 
  const [isApplying, setIsApplying] = useState(false); // State for form visibility
  const [formData, setFormData] = useState({
    jobId: '',
    companyName: '',
    candidateId: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    qualification: '',
    aggregate: '',
    yearOfPassedOut: '',
    gender: '',
    dateOfBirth: '',
    experience: '',
    location: '',
    technology: '',
    megaDrive: '',
    resume: null,
    applied_date:''
  });
  const [internData, setInternData] = useState({

  })
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const years = [2020, 2021, 2022, 2023, 2024];
  const months = [
    { value: '', label: 'Select Month' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchJobs();
    if (candidateID) {
      fetchInternDetails();
    }
  }, [candidateID]);
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/intern-view-jobs");
      setJobs(response.data);
      const uniqueRoles = [...new Set(response.data.map(job => job.jobTitle))];
      setJobRoles(uniqueRoles);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchInternDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/intern_data/${candidateID}`);
      console.log("data", response.data);
      setInternData(response.data[0]);
      setFormData(prevData => ({
        ...prevData,
        fullName: response.data.fullName,
        email: response.data.email,
        mobileNumber: response.data.mobileNo,
        qualification: response.data.qualification,
        aggregate: response.data.aggregate,
        yearOfPassedOut: response.data.yearOfPassedOut,
        gender: response.data.gender,
        dateOfBirth: response.data.dateOfBirth,
        experience: response.data.experience,
        location: response.data.location,
        technology: response.data.technology,
        megaDrive: response.data.megaDrive
      }));
    } catch (error) {
      console.error('Error fetching intern details:', error);
    }
  };
  console.log("internData :", internData)
  const filterJobs = () => {
    const filtered = jobs.filter(job => {
      const jobDate = new Date(job.postedOn);
      const jobYear = jobDate.getFullYear().toString();
      const jobMonth = String(jobDate.getMonth() + 1).padStart(2, '0');

      const yearMatch = selectedYear ? jobYear === selectedYear : true;
      const monthMatch = selectedMonth ? jobMonth === selectedMonth : true;
      const jobRoleMatch = selectedJobRole ? job.jobTitle === selectedJobRole : true;
      return yearMatch && monthMatch && jobRoleMatch;
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs();
  }, [jobs, selectedYear, selectedMonth, selectedJobRole]);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  const handleApplyNow = () => {
    setFormData({
      ...formData,
      jobId: selectedJob.jobId, // Set jobId from selected job
      companyName: selectedJob.companyName // Optionally set the companyName as well  
    });
    setShowModal(false); // Close the modal
    setIsApplying(true); // Show the application form
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setIsApplying(false);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleBackToJobs = () => {
    setIsApplying(false);
    setSelectedJob(null); // Optionally reset selected job
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleJobRoleChange=(e)=>{
    setSelectedJobRole(e.target.value);
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (event, value) => setCurrentPage(value);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Form Data :", formData);
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const currentDate=new Date().toISOString();
    setFormData(prevData=>({
      ...prevData,applied_date:currentDate
    }));
    for (const key in formData) {
      console.log(key);
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/apply-job', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response.data);
      setIsSubmitted(true);
      setErrorMessage('');
      setIsApplying(false);
      setSelectedJob(null); // Reset selected job after successful submission
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitted(false);
      setErrorMessage('Failed to submit the application. Please try again later.');
    }
    
 
  };
  const clearFilters = () => {
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedJobRole('');
    setFilteredJobs(jobs);  // Reset filtered jobs to all jobs
  }; 
  
  return (
    <div>
      <Container className="my-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1 style={{ color: '#888888', fontWeight: 'bold', fontSize: '25px' }}>Available Jobs</h1>
          <div style={{display:"flex"}}>
            <select
              id="year"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
            <select
              id="JobRole"
              name="JobRole"
              value={selectedJobRole}
              onChange={handleJobRoleChange}
              style={{ padding: '10px', fontSize: '16px' }}
            ><option> Select Job Role</option>
            {jobRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
            <Button 
              onClick={clearFilters} 
              style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
            >
              Clear
            </Button>
          </div>
        </div>
      </Container> 

      <Container className="px-0 ml-auto mr-auto mb-5" style={{overflow:"auto"}}>
        {isApplying ? (
          <div className="container mt-5">
            <h2 className="mb-4">Job Application Form</h2>
            {isSubmitted && <div className="alert alert-success">Data sent successfully!</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Job ID</Form.Label>
                <Form.Control type="text" name="jobId" value={formData.jobId} onChange={handleChange} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Candidate ID</Form.Label>
                <Form.Control type="text" name="candidateId" value={candidateID} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={internData.fullName} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={internData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="tel" name="mobileNumber" value={internData.mobileNo} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Select name="qualification" value={formData.qualification} onChange={handleChange} required>
                  <option value="">Select qualification</option>
                  {qualifications.map((qual, index) => (
                    <option key={index} value={qual}>{qual}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Aggregate</Form.Label>
                <Form.Control type="text" name="aggregate" value={formData.aggregate} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year of Passed Out</Form.Label>
                <Form.Control type="text" name="yearOfPassedOut" value={formData.yearOfPassedOut} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={internData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Select name="experience" value={formData.experience} onChange={handleChange} required>
                  <option value="">Select experience</option>
                  {experienceOptions.map((exp, index) => (
                    <option key={index} value={exp}>{exp}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select name="location" value={formData.location} onChange={handleChange} required>
                  <option value="">Select location</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Technology</Form.Label>
                <Form.Select name="technology" value={formData.technology} onChange={handleChange} required>
                  <option value="">Select technology</option>
                  {technologies.map((tech, index) => (
                    <option key={index} value={tech}>{tech}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mega Drive</Form.Label>
                <Form.Select name="megaDrive" value={formData.megaDrive} onChange={handleChange} required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control type="file" name="resume" onChange={handleFileChange} required />
              </Form.Group>
              <Button type="submit" variant="primary">Send</Button>
              <Button type="button" variant="secondary" onClick={handleBackToJobs} style={{margin:'10px'}}>Back</Button>
            </Form>
          </div>
        ) : (
          <>
          <Container style={{width:"1200px"}}>
            <Row >
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <Col key={job._id} sm={12} md={6} lg={4} className="mb-4">
                    <div className="card p-3" style={{ borderRadius: '10px', border: '1px solid #ddd'}}>
                      <h5>{job.jobRole}</h5>
                      <p><strong>JobID:</strong>{job.jobId}</p>
                      <p><strong>Company Name:</strong> {job.companyName}</p>
                      <p><strong>Job Role:</strong> {job.jobTitle}</p>
                      <p><strong>Posted On:</strong> {formatDate(job.postedOn)}</p>
                      <p><strong>Skills Required:</strong> {job.requiredSkills}</p>
                      <p><strong>Salary:</strong> {job.salary}</p>
                      <Button style={{width:'150px'}} onClick={() => handleCardClick(job)}>View Details</Button>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No jobs found</p>
              )}
            </Row>
            </Container>
            {filteredJobs.length > jobsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={paginate}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedJob ? (
            <>
              <p><strong>JobID:</strong>{selectedJob.jobId}</p>
              <p><strong>Job Role:</strong> {selectedJob.jobTitle}</p>
              <p><strong>Company Name:</strong> {selectedJob.companyName}</p>
              <p><strong>Description:</strong> {selectedJob.jobDescription}</p>
              <p><strong>Skills Required:</strong> {selectedJob.requiredSkills}</p>
              <p><strong>Location:</strong> {selectedJob.Location}</p>
              <p><strong>Salary:</strong> {selectedJob.salary}</p>
              <p><strong>Posted Date:</strong> {formatDate(selectedJob.postedOn)}</p>
              <p><strong>Last Date:</strong> {formatDate(selectedJob.lastDate)}</p>
            </>
          ) : (
            <p>Loading job details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedJob && (
            <Button
              variant="primary"
              onClick={handleApplyNow}  // Use the new handleApplyNow function
            >
              Apply Now
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HrViewJob;
