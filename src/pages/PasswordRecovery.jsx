import React, { useState } from 'react';
import '../styles/form.css';
import '../styles/PasswordRecovery.css';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="container">
    <div className='overlay'></div>
    <div className="left-side">
        <h1 className="welcome-title">Welcome to <br /> H2Synergy</h1>
      </div>
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2 className='title'>Recover Password</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        <button className='button' type="submit">Send Reset Link</button>
      </form>
      </div>
    </div>
  );
}
