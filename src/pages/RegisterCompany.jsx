import React, { useState } from 'react';
import '../styles/RegisterCompany.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setFormData] = useState({
    company: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    operationalType: '',
    domain: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login')  // Handle form submission logic
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="left-side">
        <h1 className="welcome-title">Welcome to <br /> H2Synergy</h1>
      </div>
      <div className="form-container">
        <h2 className="title">Register</h2>
        <form onSubmit={handleSubmit}>
          <input className="input" name="company" value={form.company} placeholder="* Company Name" onChange={handleChange} required />
          <input className="input" name="address" value={form.address} placeholder="* Address" onChange={handleChange} required />
          <div className='passwords'>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="* Password" />
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="* Confirm Password" />
          </div>
          <select name="operationalType" value={form.operationalType} onChange={handleChange}>
            <option value="" disabled selected>* Operational Type</option>
            <option value="Sailing">Sailing</option>
            <option value="Buying">Buying</option>
          </select>
          <input className="input" name="domain" value={form.domain} placeholder="* Domain" onChange={handleChange} required />
          <input className="input" name="email" value={form.email} type="email" placeholder="* Email" onChange={handleChange} required />
          <div className="policy">
          <div className='checkbox-container'>
            <input type="checkbox" required />
            <span className="policy-text">
               I accept the terms of use & Privacy policy
            </span>
          </div>
        </div>  
          <button className="button" type="submit">Register Now</button>
          <div className='icons'>
            <FontAwesomeIcon className='brand fa-facebook'  icon={faFacebook} />
            <FontAwesomeIcon className='brand fa-google' icon={faGoogle} />
            <FontAwesomeIcon className='brand fa-twitter' icon={faTwitter} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
