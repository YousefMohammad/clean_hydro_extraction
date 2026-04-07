import React from 'react';
import '../styles/form.css';
import '../styles/Portal.css';

export default function Portal() {
  return (
    <div className="container">
    <div className="portal-overlay"></div>
      <div className="portal">
        <section className="client">
          <h1>Client</h1>
          <p>
            Help you environment and manage you hydrogen operations and get money from your waste
          </p>
          <a className='link' href='/register-customer'>Get Access</a>
        </section>
        <section className='company'>
          <h1>Company</h1>
          <p>
            Manage your company's green hydrogen projects view reports or turn your waste to money 
          </p>
          <a className='link' href='/register-company'>Begin Your Busniss</a>
        </section>
      </div>
    </div>
  );
}
