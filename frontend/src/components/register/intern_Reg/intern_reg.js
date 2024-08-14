import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './intern_reg.css';
import Home from '../../Home/components/Home';

const InternRegistration = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      mobileno: event.target.mobileno.value,
      altmobileno: event.target.altmobileno.value,
      address: event.target.address.value,
      batchno: event.target.batchno.value,
      modeOfInternship: event.target.modeOfInternship.value,
      belongedToVasaviFoundation: event.target.belongedToVasaviFoundation.value,
      domain: event.target.domain.value,
    };
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/register/intern', formData);
      console.log(response);
      toast.success('Registered successfully!', { autoClose: 5000 });
      navigate('/about');

    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <>
    <div className="intern_reg_container" >
      <form className="w-100 intern_reg_section" onSubmit={handleSubmit} autoComplete='off' encType="multipart/form-data">
        <div className="intern_reg_section">
          <h3 className='intern_reg_section_title'>Intern Registration Form <i className="fa-solid fa-fingerprint"></i></h3>
          <div className="intern_reg_form_group">
            <TextField
              label="Full Name"
              variant="outlined"
              className="intern_reg_input"
              name="fullName"
              required
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Email"
              variant="outlined"
              className="intern_reg_input"
              name="email"
              required
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Mobile No"
              variant="outlined"
              className="intern_reg_input"
              name="mobileno"
              required
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Alternative Mobile No"
              variant="outlined"
              className="intern_reg_input"
              name="altmobileno"
              required
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Address"
              variant="outlined"
              className="intern_reg_input"
              name="address"
              required
            />
          </div>
          <div className="intern_reg_form_group">
            <TextField
              label="Batch No"
              variant="outlined"
              className="intern_reg_input"
              name="batchno"
              required
            />
          </div>
          <div className="intern_reg_form_group">
            <FormControl fullWidth>
              <InputLabel required>Mode of Internship</InputLabel>
              <Select
                label="Mode of Internship"
                className="intern_reg_input"
                name="modeOfInternship"
                required
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="intern_reg_form_group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Belonged to Vasavi Foundation?</FormLabel>
              <RadioGroup
                name="belongedToVasaviFoundation"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="intern_reg_form_group">
            <FormControl fullWidth>
              <InputLabel required>Domain</InputLabel>
              <Select
                label="Domain"
                className="intern_reg_input"
                name="domain"
                required
              >
                <MenuItem value="web development">Web Development</MenuItem>
                <MenuItem value="data science">Data Science</MenuItem>
                <MenuItem value="ai/ml">AI/ML</MenuItem>
                <MenuItem value="cloud computing">Cloud Computing</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <button type="submit" className="intern_reg_button">Register</button>
      </form>
    </div>
    </>
  );
};

export default InternRegistration;
