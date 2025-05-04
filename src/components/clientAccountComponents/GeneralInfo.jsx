import React from "react";
import InfoCard from '../InfoCard';

const GeneralInfo = () => {
  return (
    <>
      <h2>Personal Information</h2>
      <p>Manage your Personal Information with all flexibility you need</p>
      <div className="info-grid">
        <InfoCard label="Name" value="Waleed Omar" />
        <InfoCard label="Phone Number" value="+20 14 1115547" />
        <InfoCard label="Address" value="Maharam Bk" />
        <InfoCard label="Email" value="WaleedOmar@gmail.com" />
        <InfoCard label="Wish List" value="Your selected Products is up here" />
      </div>
    </>
  );
};

export default GeneralInfo;
