// src/pages/clientacc1.jsx
import React from 'react';
import '../styles/clientacc1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';


const ClientAcc1 = () => {
  return (
    <>
    <NavBar/>
    <div className="client-acc-wrapper">
      <header className="client-header">
        <div className="logo"> <FontAwesomeIcon icon={faRecycle} /> H2Synergy Account</div>
        
        <button className="sign-out-btn">Sign Out</button>
      </header>

      <div className="client-body">
        <aside className="sidebar">

          <div className="profile-icon"><FontAwesomeIcon icon={faUser} /></div>
          <ul className="nav-links">
            <li className="active">Personal Information</li>
            <li>Password & Security</li>
            <li>Product Management</li>
          </ul>
        </aside>

        <main className="info-content">
          <h2>Personal Information</h2>
          <p>Manage your Personal Information with all flexibility you need</p>
          <div className="info-grid">
            <InfoCard label="Name" value="Waleed Omar" />
            <InfoCard label="Phone Number" value="+20 14 1115547" />
            <InfoCard label="Address" value="Maharam Bk" />
            <InfoCard label="Email" value="WaleedOmar@gmail.com" />
            <InfoCard label="Wish List" value="Your selected Products is up here" />
          </div>
        </main>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

const InfoCard = ({ label, value }) => (
  <div className="info-card">
    <div className="card-header">
      <span>{label}</span>
      <FontAwesomeIcon icon={faPen} className="edit-icon" />
    </div>
    <div className="card-body">{value}</div>
  </div>

);

export default ClientAcc1;
