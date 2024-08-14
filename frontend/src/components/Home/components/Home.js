import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import ramana from '../images/p3.jpeg';
import slider1 from '../images/slider1.jpeg';
import slider2 from '../images/slider2.jpeg';
import slider3 from '../images/slider3.jpeg';
import jobsearch from '../images/jobsearch.jpeg';
import avatar1 from '../images/avatar1.jpg';
import avatar2 from '../images/avatar2.avif';
import avatar3 from '../images/avatar3.jpg';
import Footer from './Footer';
import About from './About';
import StaffHire from './StaffHire';
import Contact from './Contact';
// import HRLogin from './HRLogin';
import SuperAdminLogin from './SALogin';
import InternLogin from './InternLogin';
import InternRegistration from '../../register/intern_Reg/intern_reg';
import HRRegistration from '../../register/hr_Reg/hr_register';
import { TextField } from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


const Home = ({ defaultTab }) => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(defaultTab || 'Create');
  const [showMenu, setShowMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { id: 'About', name: 'About RamanaSoft' },
    { id: 'ITStaff', name: 'About IT Staffing' },
    { id: 'Contact', name: 'Contact Us' },
  ];

  useEffect(() => {
    if (defaultTab) {
      setSelectedView(defaultTab);
    }
  }, [defaultTab]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    const HRid = Cookies.get('HRid');
    const verified = Cookies.get('verified');
    if (HRid && verified === 'true') {
      navigate('/hr-dashboard');
    }
    const SAid = Cookies.get("SAid");
    if(SAid && verified==='true'){
      navigate('/SA_dash')
    }
    const internID = Cookies.get("internID")
    if(internID && verified==='true'){
      navigate('/intern_dash')
    }
  }, [navigate]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email' && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setErrors({ ...errors, email: 'Invalid email address' });
    } else if (name === 'password' && !value) {
      setErrors({ ...errors, password: 'Password is required' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async () => {
    if (formData.email && formData.password) {
      console.log(formData);
      await axios.post('http://localhost:5000/hr-login', {
        email: formData.email,
        password: formData.password
      })
        .then((response) => {
          console.log(response);
          toast.success('Logged in successfully!', { autoClose: 5000 });
          document.cookie.split(';').forEach(cookie => {
            const cookieName = cookie.split('=')[0].trim();
            Cookies.remove(cookieName);
          });

          Cookies.set('verified', true, { expires: 30 });
          Cookies.set('HRid', response.data.HRid, { expires: 30 });
          Cookies.set("role", 'HR', {expires : 30});
          navigate('/hr-dashboard');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Invalid credentials', { autoClose: 5000 });
        });
    } else {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : ''
      });
    }
  };

  const handleMenuItemClick = (id) => {
    setSelectedView(id);
    navigate(`?${id.toLowerCase()}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJobSearchClick = () => {
    setSelectedView('InternReg');
  };
  const handleCandidateSearchClick = () => {
    setSelectedView('HrReg');
  };
  const handleLoginMenuItemClick = (loginType) => {
    setSelectedView(`${loginType}Login`);
    handleClose();
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'About':
        return <About />;
      case 'ITStaff':
        return <StaffHire />;
      case 'Contact':
        return <Contact />;
      case 'HRLogin':
        return (
          <div className='login'>
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '85vh' }}>
              <img alt='logo' className='rounded mb-3' src={ramana} style={{ width: '200px', height: 'auto' }} />
              <div className="border rounded shadow p-3 d-flex flex-column align-items-center bg-white" style={{ width: '100%', maxWidth: '500px' }}>
                <h4 className='fw-bold mb-4 mt-2 text-nowrap' style={{ fontFamily: 'monospace' }}>
                  HR Login <i className="fa-solid fa-right-to-bracket"></i>
                </h4>

                <TextField
                  label="Email"
                  variant="outlined"
                  className="w-100 mb-3"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  InputLabelProps={{ className: 'fw-bold text-secondary' }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  className="w-100 mb-3"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputLabelProps={{ className: 'fw-bold text-secondary' }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className='w-50'
                >
                  Login
                </Button>
              <div className="d-flex justify-content-center align-items-center w-100">
                <Link
                  className='fw-bold text-center text-decoration-none text-primary p-2'
                  onClick={() => setSelectedView('HrReg')}
                >
                  Register as HR ?
                </Link>
              </div>
              </div>
            </div>
          </div>
        );
      case 'SuperAdminLogin':
        return <SuperAdminLogin />;
      case 'InternLogin':
        return <InternLogin />;
      case 'InternReg':
        return <InternRegistration />;
      case 'HrReg':
        return <HRRegistration />
      default:
        return (
          <div>
            <section className='logo-bar'>
              <div className='d-flex justify-content-between align-items-center m-3'>
                <Link to='/'>
                  <img src={ramana} alt="ramanaSoft" className='rounded ramana' width={'250px'} />
                </Link>
                {/* Hamburger icon for small screens */}
                <div className='d-md-none'>
                  <button className='btn border text-nowrap' onClick={() => setShowMenu(!showMenu)}>
                    <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
                  </button>
                </div>
                {/* Buttons */}
                <div className={`d-none d-md-flex ${showMenu ? 'd-none' : 'd-flex'}`}>
                  <button className='btn border text-nowrap  btn-info  fw-bold' onClick={handleJobSearchClick} style={{ color: '#013356' }}>I am Looking For A Job</button>
                  <Link >
                    <button className='btn border text-nowrap  ms-2 btn-outline-info fw-bold' onClick={handleCandidateSearchClick} style={{ color: '#013356' }}>I am Looking For Candidates</button>
                  </Link>
                </div>
              </div>
              {/* Buttons for small screens */}
              <div className={`d-md-none ${showMenu ? 'd-block' : 'd-none'} bg-secondary-subtle rounded mb-2 p-1`}>
                <button className='btn border-dark text-nowrap btn-info  fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For A Job</button>
                <Link to='/hire'>
                  <button className='btn border-dark text-nowrap btn-outline-info fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For Candidates</button>
                </Link>
              </div>
            </section>
            <section className='carousel'>
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={slider1} className="d-block w-100" alt="Slider 1" />
                  </div>
                  <div className="carousel-item">
                    <img src={slider2} className="d-block w-100" alt="Slider 2" />
                  </div>
                  <div className="carousel-item">
                    <img src={slider3} className="d-block w-100" alt="Slider 3" />
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </a>
              </div>
            </section>
            <section className='info'>
              <div className='d-lg-flex align-items-center justify-content-center'>
                <div>
                  <img src={jobsearch} alt='seeking for jobs?' className='w-100' />
                </div>
                <div>
                  <div>
                    <h1 className='text-center fw-semibold' style={{ fontFamily: 'sans-serif', color: '#013356' }}>Looking for a Job?</h1>
                    <h4 className='text-center mt-3'>We empower people to realize their potential and build rewarding careers. As India’s Largest IT Staffing & Solutions Company, we can help turn your ambition to reality.</h4>
                    <h3 className='text-center text-secondary mt-4' style={{ fontFamily: 'monospace' }}>Your dream IT career. We’ll help you live it.</h3>
                    <p className='text-center fw-bold text-secondary'>Register here, to View Job Vacancies.</p>
                    <div className='d-flex justify-content-center mt-4'>
                      <div className='d-flex justify-content-center mt-4'>
                        <button
                          className='btn btn-info px-5 rounded shadow fw-bold text-white vacancy'
                          onClick={() => setSelectedView('InternReg')}
                        >
                          Continue to Register.
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='testimonial p-lg-4 mt-4 mt-lg-2' style={{ backgroundColor: '#f8f9fa' }}>
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Testimonial 1"></button>
                  <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1" aria-label="Testimonial 2"></button>
                  <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="2" aria-label="Testimonial 3"></button>
                </div>
                <div className="carousel-inner testmonial">
                  <div className="carousel-item active">
                    <div className="d-lg-flex align-items-center p-lg-4">
                      <img src={avatar2} className="rounded-circle me-lg-4 mx-5 mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 1" />
                      <div>
                        <p className='fw-bold text-secondary'>"RamanaSoft has transformed my career. The support and opportunities provided are unmatched. Highly recommend!"</p>
                        <h5 className='text-info client'>- Kumar Yadav |</h5>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="d-lg-flex align-items-center p-lg-4">
                      <img src={avatar3} className="rounded-circle me-lg-4 mx-5 mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 2" />
                      <div>
                        <p className='fw-bold text-secondary'>"The team at RamanaSoft is very professional and helpful. They guided me through every step of the job search process."</p>
                        <h5 className='text-info client'>- Sree Harsha |</h5>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="d-lg-flex align-items-center p-lg-4">
                      <img src={avatar1} className="rounded-circle me-lg-4 mx-5 mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 3" />
                      <div>
                        <p className='fw-bold text-secondary'>"I am grateful for the opportunities RamanaSoft has provided. Their dedication to their clients is evident."</p>
                        <h5 className='text-info client'>- Hari Manas |</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container-fluid'>
      <section className='header'>
        <div style={{ background: '#013356', width: "1900px", height: "57px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}>
          <ul
            className='d-flex justify-content-end text-nowrap align-items-center header w-100 text-white p-2 fw-bold'
            style={{ listStyle: 'none' }}
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                style={{
                  cursor: 'pointer',
                  margin: '0px 15px',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  color: selectedView === item.id ? '#fff' : '#fff',
                  transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                }}
              >
                {item.name}
              </li>
            ))}
            <li>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={{ marginLeft: '20px' }}
              >
                Login
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleLoginMenuItemClick('HR')}>
                  HR Login
                </MenuItem>
                <MenuItem onClick={() => handleLoginMenuItemClick('SuperAdmin')}>
                  SuperAdmin Login
                </MenuItem>
                <MenuItem onClick={() => handleLoginMenuItemClick('Intern')}>
                  Intern Login
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </section>
      <div className='content'>
        {renderContent()}
      </div>
      <section className='footer'>
        <Footer />
      </section>
      {showBackToTop && (
        <div
          className='back-to-top'
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}
          onClick={scrollToTop}
        >
          <button className='p-2 rounded btn btn-outline-dark' title='back to top'>
            <i className='fas fa-arrow-up text-warning fs-5'></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
