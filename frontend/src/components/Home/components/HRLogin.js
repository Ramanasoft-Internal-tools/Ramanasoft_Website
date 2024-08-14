import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import ramana from '../images/p3.jpeg';

import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const HRLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    const HRid = Cookies.get('HRid');
    const verified = Cookies.get('verified');
    if (HRid && verified === 'true') {
      navigate('/hr-dashboard');
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
        Cookies.set('HRid', response.data.HRid, { expires: 30});
        Cookies.set('role', 'HR', { expires: 30 });
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
  

  return (
    <div className='login'>

      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '85vh' }}>
      <img  alt='logo' className='rounded mb-3' src={ramana} style={{ width: '200px', height: 'auto' }} />
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
        </div>
        <div className="d-flex justify-content-center align-items-center w-100">
            <Link to='/hr_reg' className='fw-bold text-center text-decoration-none text-primary p-2' style={{ fontFamily: 'sans-serif' }}>
              Register as HR ?
            </Link>
          </div>
      </div>
    </div>
  );
};

export default HRLogin;
