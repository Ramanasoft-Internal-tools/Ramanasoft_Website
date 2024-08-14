import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card, Container, Row, Col } from 'react-bootstrap';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const internID = Cookies.get('internID');

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/applied-jobs/${internID}`);
      setAppliedJobs(response.data);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const getStatusColor = (status) => {
    if (status.toLowerCase() === 'eligible') return 'green';
    if (status.toLowerCase() === 'not-interested') return 'red';
    return 'blue';
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Applied Jobs</h2>
      <Row>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <Col key={job.jobId} sm={12} md={6} lg={4} className="mb-4">
              <Card style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                <Card.Body>
                  <Card.Title>{job.jobRole}</Card.Title>
                  <Card.Text>
                    <strong>Company Name:</strong> {job.companyName}
                  </Card.Text>
                  <Card.Text>
                    <strong>Applied On:</strong> {new Date(job.applied_date).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text style={{ color: getStatusColor(job.status), fontWeight: 'bold' }}>
                    <strong>Status:</strong> {job.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No jobs applied yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default AppliedJobs;
