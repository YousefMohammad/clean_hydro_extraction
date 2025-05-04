// src/pages/clientacc1.jsx
import React, { useState} from 'react';
import '../styles/clientacc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import CompanyInfo from '../components/companyAccountComponents/CompanyInfo';
import PasswordAndSecurity from '../components/companyAccountComponents/PasswordAndSecurity';
import BusinessManagment from './../components/companyAccountComponents/BusinessManagment';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';



const ClientAccount = () => {
  const { id } = useParams();

  console.log(id)
  
  const [activePage, setActivePage] = useState('company-info')
  

  const renderPage = (activePage) =>{
    switch (activePage) {
      case 'company-info':
        return <CompanyInfo/>
      case 'password-and-security':
        return <PasswordAndSecurity/>
      case 'business-management':
        return <BusinessManagment/>
      default:
        return <CompanyInfo/>
    }
  }
  const tabs = [
    { id: 'company-info', label: 'Company Information' },
    { id: 'password-and-security', label: 'Password & Security' },
    { id: 'business-management', label: 'Business Management' },
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
          <FontAwesomeIcon icon={faBuilding} />
          <div className='edit-photo'><FontAwesomeIcon icon={faCamera}/></div>
          </div>
          

          <ul className="nav-links">
            {
              tabs.map((tab) =>(
                <li 
                  key={tab.id} 
                  className={activePage === tab.id ? 'active' : ''}
                  onClick={() => {setActivePage(tab.id)}}>
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
