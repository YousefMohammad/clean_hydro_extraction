import React, { useState } from 'react';
import '../styles/form.css';
import '../styles/PasswordRecovery.css';
import Icons from '../components/icons'

export default function PasswordRecovery() {
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


    const handleChange = (e) => {
        setFormData({ ...form, [e.target.name]: e.target.value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

  return (
    <div className="container">
    <div className='overlay'></div>
    <div className="left-side">
        <h1 className="welcome-title">Welcome to <br /> H2Synergy</h1>
    </div>
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2 className='title'>Reset Password</h2>
         <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="* Password" />
         <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="* Confirm Password" />
        <button className='button' type="submit">Change Password</button>
        <Icons/>
      </form>
      </div>
    </div>
  );
}
