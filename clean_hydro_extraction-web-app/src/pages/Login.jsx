import React, { useState } from 'react';
import '../styles/form.css';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Icons from '../components/icons';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="container">
      <div className='overlay'></div>
      <div className="left-side">
        <h1 className="welcome-title">Welcome to <br /> H2Synergy</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className='title'>Login</h2>
          <input name="email" value={form.email} onChange={handleChange} placeholder="* Email" />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="* Password" />
          <button className='button' type="submit">Login</button>
          <Icons/>
          <a className="forgot-password" href="/password-recovery">Forgot password?</a>
        </form>
      </div>
    </div>
  );
}
