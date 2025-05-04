// src/pages/clientacc1.jsx
import React, { useState} from 'react';
import '../styles/clientacc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import GeneralInfo from '../components/clientAccountComponents/GeneralInfo';
import PasswordAndSecurity from '../components/clientAccountComponents/PasswordAndSecurity';
import ProductManagement from '../components/clientAccountComponents/ProductManagment';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const ClientAccount = () => {
  const { id } = useParams();

  console.log(id)
  
  const [activePage, setActivePage] = useState('general-info')
  

  const renderPage = (activePage) =>{
    switch (activePage) {
      case 'general-info':
        return <GeneralInfo/>
      case 'password-and-security':
        return <PasswordAndSecurity/>
      case 'product-management':
        return <ProductManagement/>
      default:
        return <GeneralInfo/>
    }
  }
  const tabs = [
    { id: 'general-info', label: 'Personal Information' },
    { id: 'password-and-security', label: 'Password & Security' },
    { id: 'product-management', label: 'Product Management' },
  ];

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

          <div className="profile-icon">
          <FontAwesomeIcon icon={faUser} />
          <div className='edit-photo'><FontAwesomeIcon icon={faCamera}/></div>
          </div>
          

          <ul className="nav-links">
            {
              tabs.map((tab) =>(
                <li 
                  key={tab.id} 
                  className={activePage === tab.id ? 'active' : ''}
                  onClick={() => {setActivePage(tab.id);}}>
                {tab.label}
                </li>
              ))
            }
          </ul>
        </aside>

        <main className="info-content">
          {renderPage(activePage)}
        </main>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ClientAccount;
