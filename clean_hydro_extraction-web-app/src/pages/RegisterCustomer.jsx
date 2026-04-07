import React, { useState } from 'react';
import '../styles/RegisterCustomer.css';
import Icons from '../components/icons';
import { useNavigate } from 'react-router-dom';

export default function RegisterCustomer() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', phone: '', address: '' });

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="container">
    <div className="overlay"></div>
    <div className="left-side">
        <h1 className="welcome-title">Welcome to <br /> H2Synergy</h1>
      </div>
    <div className="form-container">
      <h2 className="title">Register</h2>
        <p className='desc'>Create your account. it's free & only takes a minute</p>
        <form onSubmit={handleSubmit}>
          <div className='names'>
          <input name="First Name" value={form.firstName} onChange={handleChange} placeholder="* First Name" />         
          <input name="Last Name" value={form.lastName} onChange={handleChange} placeholder="* Last Name" />
          </div>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="* Phone" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="* Address" />
          <div className='passwords'>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="* Password" />
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="* Confirm Password" />
          </div>
          <select name="customer Type" value={form.customerType} onChange={handleChange}>
            <option value="" disabled selected>* Customer type</option>
            <option value="Sailer">Sailer</option>
            <option value="Buyer">Buyer</option>
          </select>
          <input name="email" value={form.email} onChange={handleChange} placeholder="* Email" />
          <div className="policy">
          <div className='checkbox-container'>
            <input type="checkbox" required="True" />
            <span className="policy-text">
               I accept the terms of use & Privacy policy
            </span>
          </div>
          </div>
          <button className="button" type="submit">Register Now</button>
          <Icons/>
        </form>
        
      </div>
    </div>
  );
}
