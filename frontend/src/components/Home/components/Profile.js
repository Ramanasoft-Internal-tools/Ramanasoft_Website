import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import avatar2 from '../images/avatar2.avif';
import ramana from '../images/p3.jpeg';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-234-567-8900",
    skills: "JavaScript, React, Node.js",
    experience: "1"
  });
  const [profileImage, setProfileImage] = useState(avatar2); // Default image
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated Profile Data:', formData);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the selected image as the new profile picture
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(selectedFile); // Read the file as a Data URL
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  return (
    <Container>
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
              <Nav.Link href="#about" className="fw-bold me-4 text-secondary">About</Nav.Link>
              <Nav.Link href="#applied" className="fw-bold me-4 text-secondary">Applied</Nav.Link>
              <Nav.Link href="/dashboard/profile" className="fw-bold me-4 text-danger text-decoration-underline">Profile</Nav.Link>
            </Nav>
            <Nav>
              <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold" style={{ width: '50px', height: '50px' }}>
                KK
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row className='mt-3'>
        <Col md={3}>
          <div className="text-center flex-column d-flex">
            <img
              src={imagePreview || profileImage} // Show the image preview or default image
              alt="Profile"
              className="img-fluid rounded-circle img-thumbnail"
              style={{width:'300px',height:'300px', objectFit: 'cover' }}
            />
            <Form.Group controlId="formFile" className="mt-3">
              <Form.Label className="d-none">Upload New Picture </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef} // Attach ref to the file input
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the file input
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-3 px-2 fw-bold"
              onClick={triggerFileInput}
              disabled={!isEditing}
            >
              Upload New Picture <i class="fa-regular fa-image"></i>
            </Button>
          </div>
        </Col>
        <Col md={8} className='ms-5'>
          <h2 className="mb-4 text-center fw-semibold border rounded p-2">Profile Information <i class="fa-solid fa-id-card"></i></h2>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formName">
              <Form.Label className="fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="+1-234-567-8900"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="formSkills">
              <Form.Label className="fw-bold">Skills</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="skills"
                placeholder="Skill 1, Skill 2, Skill 3"
                value={formData.skills}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="formExperience">
              <Form.Label className="fw-bold">Experience (in years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                placeholder="2"
                value={formData.experience}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="button" 
              className="mt-4 fw-bold px-4" 
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? (<>Save Changes <i class="fa-solid fa-check text-dark fs-5"></i></>) : (<>Change <i class="fa-solid fa-user-pen text-dark"></i></>)}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
