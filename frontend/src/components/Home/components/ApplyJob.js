import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ramana from '../images/p3.jpeg';
import logo from '../images/avatar2.avif';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  admissionId: Yup.string().required('Admission Id is required'),
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  altPhoneNumber: Yup.string(),
  qualification: Yup.string().required('Qualification is required'),
  aggregatePercentage: Yup.string().required('Aggregate Percentage is required'),
  yearOfPass: Yup.date().required('Year of Pass is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required'),
  experience: Yup.string().required('Experience is required'),
  location: Yup.string().required('Location is required'),
  technology: Yup.string().required('Technology is required'),
  megaDriveSelection: Yup.string().required('Mega Drive Selection is required'),
  resume: Yup.mixed().required('Resume is required')
});

const ApplyJob = () => {
    
   const navigate= useNavigate();

  const initialValues = {
    jobId: 'RS0201',
    companyName: 'RamanaSoft Inc',
    admissionId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    altPhoneNumber: '',
    qualification: '',
    aggregatePercentage: '',
    yearOfPass: '',
    gender: '',
    dob: '',
    experience: '',
    location: '',
    technology: '',
    megaDriveSelection: '',
    resume: null
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      navigate('/dashboard');
      toast.success('Form submitted successfully!');
      toast.success('Best of Luck!');
      console.log(values.resume);
      setSubmitting(false);
    }, 400);
  };

  return (
    <Container className="mt-3">
      <div>
        <img src={ramana} alt="logo" className="rounded mt-3 ms-3" style={{ width: '200px' }} />
        <div style={{ float: 'right' }} className="p-3 rounded me-3">
          <img src={logo} alt="profile" className="rounded" style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
      <h1 className="mb-4 text-nowrap">Job Application Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit} className="border rounded shadow p-3">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formJobId">
                  <Form.Label className="fw-bold">Job ID *</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobId"
                    value={values.jobId}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCompanyName">
                  <Form.Label className="fw-bold">Company Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAdmissionId">
                  <Form.Label className="fw-bold">Admission Id *</Form.Label>
                  <Form.Control
                    type="text"
                    name="admissionId"
                    value={values.admissionId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter QT/IHUB admission ID"
                    isInvalid={touched.admissionId && !!errors.admissionId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.admissionId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFullName">
                  <Form.Label className="fw-bold">Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ex: KUMAR KANDUGULA"
                    isInvalid={touched.fullName && !!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label className="fw-bold">Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ex: kumaarkandugula@gmail.com"
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className="fw-bold">Phone Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ex: 7993467747"
                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAltPhoneNumber">
                  <Form.Label className="fw-bold">Alternative Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="altPhoneNumber"
                    value={values.altPhoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ex: 8876543210"
                    isInvalid={touched.altPhoneNumber && !!errors.altPhoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.altPhoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formQualification">
                  <Form.Label className="fw-bold">Qualification *</Form.Label>
                  <Form.Control
                    as="select"
                    name="qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.qualification && !!errors.qualification}
                  >
                    <option value="">Select Your Qualification</option>
                    <option value="Animation, Graphics and Multimedia">Animation, Graphics and Multimedia</option>
                    <option value="Automation and Robotics">Automation and Robotics</option>
                    <option value="Aviation Courses">Aviation Courses</option>
                    <option value="B.E/B.Tech in Computer Science Engineering">B.E/B.Tech in Computer Science Engineering</option>
                    <option value="B.E/B.Tech in Mechanical Engineering">B.E/B.Tech in Mechanical Engineering</option>
                    <option value="B.E/B.Tech in Electronics and Communication Engineering">B.E/B.Tech in Electronics and Communication Engineering</option>
                    <option value="B.E/B.Tech in Electrical Engineering">B.E/B.Tech in Electrical Engineering</option>
                    <option value="B.E/B.Tech in Electrical and Electronics Engineering">B.E/B.Tech in Electrical and Electronics Engineering</option>
                    <option value="B.E/B.Tech in Civil Engineering">B.E/B.Tech in Civil Engineering</option>
                    <option value="B.E/B.Tech in Information Technology">B.E/B.Tech in Information Technology</option>
                    <option value="B.E/B.Tech in Instrumentation and Control Engineering">B.E/B.Tech in Instrumentation and Control Engineering</option>
                    <option value="B.E/B.Tech in Electronics Engineering">B.E/B.Tech in Electronics Engineering</option>
                    <option value="B.E/B.Tech in Electronics and Telecommunication Engineering">B.E/B.Tech in Electronics and Telecommunication Engineering</option>
                    <option value="B.E/B.Tech in Petroleum Engineering">B.E/B.Tech in Petroleum Engineering</option>
                    <option value="B.E/B.Tech in Aeronautical Engineering">B.E/B.Tech in Aeronautical Engineering</option>
                    <option value="B.E/B.Tech in Automobile Engineering">B.E/B.Tech in Automobile Engineering</option>
                    <option value="B.E/B.Tech in Mining Engineering">B.E/B.Tech in Mining Engineering</option>
                    <option value="B.E/B.Tech in Power Engineering">B.E/B.Tech in Power Engineering</option>
                    <option value="B.E/B.Tech in Production EngineeringB.E/B.Tech in Biotechnology Engineering">B.E/B.Tech in Production Engineering</option>
                    <option value="B.E/B.Tech in Genetic Engineering">B.E/B.Tech in Genetic Engineering</option>
                    <option value="B.E/B.Tech in Plastics Engineering">B.E/B.Tech in Plastics Engineering</option>
                    <option value="B.E/B.Tech in Food Processing and Technology">B.E/B.Tech in Food Processing and Technology</option>
                    <option value="B.E/B.Tech in Agricultural Engineering">B.E/B.Tech in Agricultural Engineering</option>
                    <option value="B.E/B.Tech in Environmental Engineering">B.E/B.Tech in Environmental Engineering</option>
                    <option value="B.E/B.Tech in Dairy Technology and Engineering">B.E/B.Tech in Dairy Technology and Engineering</option>
                    <option value="B.E/B.Tech in Agricultural Information Technology">B.E/B.Tech in Agricultural Information Technology</option>
                    <option value="B.E/B.Tech in Infrastructure Engineering">B.E/B.Tech in Infrastructure Engineering</option>
                    <option value="B.E/B.Tech in Motorsport Engineering">B.E/B.Tech in Motorsport Engineering</option>
                    <option value="B.E/B.Tech in Metallurgy Engineering">B.E/B.Tech in Metallurgy Engineering</option>
                    <option value="B.E/B.Tech in Textile Engineering">B.E/B.Tech in Textile Engineering</option>
                    <option value="B.E/B.Tech in Marine Engineering">B.E/B.Tech in Marine Engineering</option>
                    <option value="B.E/B.Tech in Naval Architecture">B.E/B.Tech in Naval Architecture</option>
                    <option value="B.E/B.Tech in Geoinformatics">B.E/B.Tech in Geoinformatics</option>
                    <option value="B.E/B.Tech in Nuclear Engineering">B.E/B.Tech in Nuclear Engineering</option>
                    <option value="B.E/B.Tech in Metallurgy Engineering">B.E/B.Tech in Metallurgy Engineering</option>
                    <option value="B.E/B.Tech in Robotics Engineering">B.E/B.Tech in Robotics Engineering</option>
                    <option value="M.E/M.Tech in Civil Engineering">M.E/M.Tech in Civil Engineering</option>
                    <option value="M.E/M.Tech in Computer Science Engineering">M.E/M.Tech in Computer Science Engineering</option>
                    <option value="M.E/M.Tech in Electronics and Communication Engineering">M.E/M.Tech in Electronics and Communication Engineering</option>
                    <option value="ML M.Tech in Mechanical Engineering">ML M.Tech in Mechanical Engineering</option>
                    <option value="M.E/M.Tech in Electrical Engineering">M.E/M.Tech in Electrical Engineering</option>
                    <option value="M.E/M.Tech in Structural Engineering">M.E/M.Tech in Structural Engineering</option>
                    <option value="M.E/M.Tech in Instrumentation and Control Engineering">M.E/M.Tech in Instrumentation and Control Engineering</option>
                    <option value="M.E/M.Tech in Engineering Design">M.E/M.Tech in Engineering Design</option>
                    <option value="M.E/M.Tech in Information Technology">M.E/M.Tech in Information Technology</option>
                    <option value="M.E/M.Tech in Manufacturing Engineering">M.E/M.Tech in Manufacturing Engineering</option>
                    <option value="M.E/M.Tech in Power System Engineering">M.E/M.Tech in Power System Engineering</option>
                    <option value="M.E/M.Tech in Software Engineering">M.E/M.Tech in Software Engineering</option>
                    <option value="M.E/M.Tech in Aerospace Engineering">M.E/M.Tech in Aerospace Engineering</option>
                    <option value="B.Com (Hons.)">B.Com (Hons.)</option>
                    <option value="B.Com-Bachelor of Commerce">B.Com-Bachelor of Commerce</option>
                    <option value="B.Sc- Applied Geology">B.Sc- Applied Geology</option>
                    <option value="B.Sc- Interior Design">B.Sc- Interior Design</option>
                    <option value="B.Sc- Nursing">B.Sc- Nursing</option>
                    <option value="B.Sc. Nutrition & Dietetics">B.Sc. Nutrition & Dietetics</option>
                    <option value="B.Sc. Chemistry">B.Sc. Chemistry</option>
                    <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
                    <option value="B.Sc. Hospitality and Hotel Administration">B.Sc. Hospitality and Hotel Administration</option>
                    <option value="B.Sc. Information Technology">B.Sc. Information Technology</option>
                    <option value="B.Sc. Mathematics">B.Sc. Mathematics</option>
                    <option value="B.Sc.- Physics">B.Sc.- Physics</option>
                    <option value="BA (Hons.) in Economics">BA (Hons.) in Economics</option>
                    <option value="BA in History">BA in History</option>
                    <option value="BA/B.Sc. Liberal Arts">BA/B.Sc. Liberal Arts</option>
                    <option value="BMS- Bachelor of Management Science">BMS- Bachelor of Management Science</option>
                    <option value="BPharma- Bachelor of Pharmacy">BPharma- Bachelor of Pharmacy</option>
                    <option value="BPT- Bachelor of Physiotherapy">BPT- Bachelor of Physiotherapy</option>
                    <option value="BSW-Bachelor of Social Work">BSW-Bachelor of Social Work</option>
                    <option value="BTTM- Bachelor of Travel and Tourism Management">BTTM- Bachelor of Travel and Tourism Management</option>
                    <option value="CA- Chartered Accountancy">CA- Chartered Accountancy</option>
                    <option value="CS-Company Secretary">CS-Company Secretary</option>
                    <option value="Diploma Courses">Diploma Courses</option>
                    <option value="Integarted Law Program- BBA LL.B">Integrated Law Program- BBA LL.B</option>
                    <option value="Integrated Law Course- BA + LL.B">Integrated Law Course- BA + LL.B</option>
                    <option value="Integrated Law Program- B.Com LL.B.">Integrated Law Program- B.Com LL.B.</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="MCA">MCA</option>
                    <option value="Smart Manufacturing & Automation">Smart Manufacturing & Automation</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.qualification}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAggregatePercentage">
                  <Form.Label className="fw-bold">Aggregate Percentage *</Form.Label>
                  <Form.Control
                    as="select"
                    name="aggregatePercentage"
                    value={values.aggregatePercentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.aggregatePercentage && !!errors.aggregatePercentage}
                  >
                    <option value="">Select Percentage</option>
                    <option value="35-39">35-39</option>
                    <option value="40-44">40-44</option>
                    <option value="45-49">45-49</option>
                    <option value="50-54">50-54</option>
                    <option value="55-59">55-59</option>
                    <option value="60-64">60-64</option>
                    <option value="65-69">65-69</option>
                    <option value="70-74">70-74</option>
                    <option value="75-79">75-79</option>
                    <option value="80-84">80-84</option>
                    <option value="85-89">85-89</option>
                    <option value="90-94">90-94</option>
                    <option value="95-99">95-99</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.aggregatePercentage}
                  </Form.Control.Feedback>
                </Form.Group>

              </Col>
              <Col md={6}>
                <Form.Group controlId="formYearOfPass">
                  <Form.Label className="fw-bold">Year of Passing *</Form.Label>
                  <Form.Control
                    type="date"
                    name="yearOfPass"
                    value={values.yearOfPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.yearOfPass && !!errors.yearOfPass}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.yearOfPass}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formGender">
                  <Form.Label className="fw-bold">Gender *</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.gender && !!errors.gender}
                  >
                    <option value="">Select Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDob">
                  <Form.Label className="fw-bold">Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.dob && !!errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formExperience">
                  <Form.Label className="fw-bold">Experience *</Form.Label>
                  <Form.Control
                    as="select"
                    name="experience"
                    value={values.experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.experience && !!errors.experience}
                  >
                    <option value="">Select Your Experience</option>
                    <option value="0-1 year">0-1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="3-4 years">3-4 years</option>
                    <option value="4-5 years">4-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.experience}
                  </Form.Control.Feedback>
                </Form.Group>

              </Col>
              <Col md={6}>
                <Form.Group controlId="formLocation">
                  <Form.Label className="fw-bold">Location *</Form.Label>
                  <Form.Control
                    as="select"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.location && !!errors.location}
                  >
                    <option value="">Select Location</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Agra">Agra</option>
                    <option value="Alappuzha">Alappuzha</option>
                    <option value="Alwar">Alwar</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Aurangabad">Aurangabad</option>
                    <option value="Bengalore">Bengalore</option>
                    <option value="Bharatpur">Bharatpur</option>
                    <option value="Bhavnagar">Bhavnagar</option>
                    <option value="Bhikaner">Bhikaner</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Bhubaneshwar">Bhubaneshwar</option>
                    <option value="Bodha Gaya">Bodha Gaya</option>
                    <option value="Calangute">Calangute</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Chittaurgarh">Chittaurgarh</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Dalhousie">Dalhousie</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Diu-Island">Diu-Island</option>
                    <option value="Ernakulam">Ernakulam</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Gaya">Gaya</option>
                    <option value="Gangtok">Gangtok</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Guragon">Guragon</option>
                    <option value="Guwahati">Guwahati</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Haridwar">Haridwar</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Amphal">Imphal</option>
                    <option value="Indore">Indore</option>
                    <option value="Jabalpur">Jabalpur</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jaisalmer">Jaisalmer</option>
                    <option value="Jalandhar">Jalandhar</option>
                    <option value="jodhpure">jodhpure</option>
                    <option value="Junagadh">Junagadh</option>
                    <option value="Kanpur">Kanpur</option>
                    <option value="Kanyakumari">Kanyakumari</option>
                    <option value="Khajuraho">Khajuraho</option>
                    <option value="Khandala">Khandala</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Kodaikanal">Kodaikanal</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="kota">kota</option>
                    <option value="Kottayam">Kottayam</option>
                    <option value="Kovalam">Kovalam</option>
                    <option value="Locknow">Locknow</option>
                    <option value="Ludhiana">Ludhiana</option>
                    <option value="Madural">Madural</option>
                    <option value="Manali">Manali</option>
                    <option value="Mangalore">Mangalore</option>
                    <option value="Margao">Margao</option>
                    <option value="Mathura">Mathura</option>
                    <option value="Mountabu">Mountabu</option>
                    <option value="Mossoorie">Mossoorie</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Mysore">Mysore</option>
                    <option value="Nagpure">Nagpure</option>
                    <option value="Nainital">Nainital</option>
                    <option value="Noida">Noida</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Orchha">Orchha</option>
                    <option value="Panaji">Panaji</option>
                    <option value="Patna">Patna</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="Porbandar">Porbandar</option>
                    <option value="Portblair">Portblair</option>
                    <option value="Pune">Pune</option>
                    <option value="Puri">Puri</option>
                    <option value="Pushkar">Pushkar</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Rameswaram">Rameswaram</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Sanchi">Sanchi</option>
                    <option value="Secunderabad">Secunderabad</option>
                    <option value="Shimla">Shimla</option>
                    <option value="Surat">Surat</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Thiruchchirapalli">Thiruchchirapalli</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Nirumala">Nirumala</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Vadodra">Vadodra</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Vasco-Da-Gama">Vasco-Da-Gama</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>

              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTechnology">
                  <Form.Label className="fw-bold">Technology *</Form.Label>
                  <Form.Control
                    as="select"
                    name="technology"
                    value={values.technology}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.technology && !!errors.technology}
                  >
                    <option value="">Select Technology</option>
                    <option value="A/B testing">A/B testing</option>
                    <option value="Advanced Java">Advanced Java</option>
                    <option value="Advanced Python">Advanced Python</option>
                    <option value="Agile testing">Agile testing</option>
                    <option value="Amazon (AWS)">Amazon (AWS)</option>
                    <option value="Analytics and reporting">Analytics and reporting</option>
                    <option value="AngularJS">AngularJS</option>
                    <option value="Automated testing">Automated testing</option>
                    <option value="Black Box testing">Black Box testing</option>
                    <option value="C">C</option>
                    <option value="C and C++">C and C++</option>
                    <option value="C#">C#</option>
                    <option value="C++">C++</option>
                    <option value="Cassandra">Cassandra</option>
                    <option value="Cordova">Cordova</option>
                    <option value="Core Java">Core Java</option>
                    <option value="Core Python">Core Python</option>
                    <option value="Crowdsourced testing">Crowdsourced testing</option>
                    <option value="CSS">CSS</option>
                    <option value="Docker">Docker</option>
                    <option value="Documentation services">Documentation services</option>
                    <option value="Elixir (Phoenix)">Elixir (Phoenix)</option>
                    <option value="End-to-end testing">End-to-end testing</option>
                    <option value="Flutter">Flutter</option>
                    <option value="Go">Go</option>
                    <option value="Google (Google Cloud Platform, Firebase)">Google (Google Cloud Platform, Firebase)</option>
                    <option value="Graph Databases (Emerging)">Graph Databases (Emerging)</option>
                    <option value="HTML">HTML</option>
                    <option value="lonic">lonic</option>
                    <option value="Java (Play Framework)">Java (Play Framework)</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Javascript">Javascript</option>
                    <option value="JavaScript (Express)">JavaScript (Express)</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Kubernetes">Kubernetes</option>
                    <option value="Managed testing services">Managed testing services</option>
                    <option value="Manual testing">Manual testing</option>
                    <option value="Matlab">Matlab</option>
                    <option value="Microsoft (Azure)">Microsoft (Azure)</option>
                    <option value="ML and Al-driven testing automation">ML and Al-driven testing automation</option>
                    <option value="Mongo DB">Mongo DB</option>
                    <option value="MySQL">MySQL</option>
                    <option value="Neo4J">Neo4J</option>
                    <option value="Objective C">Objective C</option>
                    <option value="Perl">Perl</option>
                    <option value="PHP">PHP</option>
                    <option value="PHP (Larvel)">PHP (Larvel)</option>
                    <option value="Postgres">Postgres</option>
                    <option value="Python (Django, Flask)">Python (Django, Flask)</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="QA testing">QA testing</option>
                    <option value="R">R</option>
                    <option value="React Native">React Native</option>
                    <option value="ReactJS">ReactJS</option>
                    <option value="Redis">Redis</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Ruby (Rails, Sinatra)">Ruby (Rails, Sinatra)</option>
                    <option value="Rust">Rust</option>
                    <option value="Scala">Scala</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="SQLite">SQLite</option>
                    <option value="Subject matter expertise in a variety of industries">Subject matter expertise in a variety of industries</option>
                    <option value="Support multiple tech platforms and systems">Support multiple tech platforms and systems</option>
                    <option value="Swift">Swift</option>
                    <option value="Test and screen recording">Test and screen recording</option>
                    <option value="Test consulting">Test consulting</option>
                    <option value="Test planning">Test planning</option>
                    <option value="Typescript">Typescript</option>
                    <option value="VueJS">VueJS</option>
                    <option value="Web Components">Web Components</option>
                    <option value="Others">Others</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.technology}
                  </Form.Control.Feedback>
                </Form.Group>


              </Col>
              <Col md={6}>
                <Form.Group controlId="formMegaDriveSelection">
                  <Form.Label className="fw-bold">Mega Drive Selection *</Form.Label>
                  <Form.Control
                    as="select"
                    name="megaDriveSelection"
                    value={values.megaDriveSelection}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.megaDriveSelection && !!errors.megaDriveSelection}
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.megaDriveSelection}
                  </Form.Control.Feedback>
                </Form.Group>


              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formResume">
                  <Form.Label className="fw-bold">Resume *</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={(event) => setFieldValue('resume', event.currentTarget.files[0])}
                    onBlur={handleBlur}
                    isInvalid={touched.resume && !!errors.resume}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.resume}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ApplyJob;

