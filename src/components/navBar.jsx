// components/NavBar.jsx
import React from 'react';
import '../styles/navBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FontAwesomeIcon icon={faRecycle} />
        <span>H2Synergy</span>
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li className='model'><a href="/model">Try Our Model</a></li>
        <li><a href="/resources">Resources</a></li>
        <li><a href="/countactUs">Contact Us</a></li>
      </ul>

      <button className="navbar-button">Get Started</button>
    </nav>
  );
};

export default NavBar;
