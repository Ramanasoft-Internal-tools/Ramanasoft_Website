import React from 'react';
import { TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HRRegistration = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      contactNo: formData.get('contactNo'),
      dob: formData.get('dob'),
      address: formData.get('address'),
      workEmail: formData.get('workEmail'),
      workMobile: formData.get('workMobile'),
      emergencyContactName: formData.get('emergencyContactName'),
      emergencyContactAddress: formData.get('emergencyContactAddress'),
      emergencyContactMobile: formData.get('emergencyContactMobile'),
      gender: formData.get('gender'),
      branch: formData.get('branch')
    };

    try {
      const response = await axios.post('http://localhost:5000/register/hr', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      toast.success('Registered successfully!', { autoClose: 5000 });
      navigate('/about');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="intern_reg_container">
      <h4 className="intern_reg_subtitle">HR Registration Form</h4>
      <form className="intern_reg_section" onSubmit={handleSubmit} autoComplete='off'>
        <div className="intern_reg_section">
          <h3 className='intern_reg_section_title'>Personal Information</h3>
          <div className="intern_reg_form_group">
            <TextField
              label="Full Name"
              variant="outlined"
              className="intern_reg_input"
              name="fullName"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Email"
              variant="outlined"
              className="intern_reg_input"
              name="email"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Contact No"
              variant="outlined"
              className="intern_reg_input"
              name="contactNo"
              required
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
                className: 'fw-bold'
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              className="intern_reg_input"
              name="dob"
              required
              InputLabelProps={{ shrink: true, className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Address"
              variant="outlined"
              className="intern_reg_input"
              name="address"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <FormControl variant="outlined" className="intern_reg_input" required>
              <InputLabel className='fw-bold text-secondary'>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                inputProps={{ className: 'fw-bold' }}
                labelId="gender-label"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Branch"
              variant="outlined"
              className="intern_reg_input"
              name="branch"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
        </div>
        <div className="intern_reg_section">
          <h3 className='intern_reg_section_title'>Professional Information</h3>
          <div className="intern_reg_form_group">
            <TextField
              label="Work Email"
              variant="outlined"
              className="intern_reg_input"
              name="workEmail"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Work Mobile"
              required
              variant="outlined"
              className="intern_reg_input"
              name="workMobile"
              
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
                className: 'fw-bold'
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
        </div>
        <div className="intern_reg_section">
          <h3 className='intern_reg_section_title'>Emergency Contact Information</h3>
          <div className="intern_reg_form_group">
            <TextField
              label="Emergency Contact Name"
              variant="outlined"
              className="intern_reg_input"
              name="emergencyContactName"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Emergency Contact Address"
              variant="outlined"
              className="intern_reg_input"
              name="emergencyContactAddress"
              required
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Emergency Contact Mobile"
              variant="outlined"
              className="intern_reg_input"
              name="emergencyContactMobile"
              required
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
                className: 'fw-bold'
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
        </div>
        <button type="submit" className="intern_reg_button">Register</button>
      </form>
    </div>
  );
};

export default HRRegistration;
