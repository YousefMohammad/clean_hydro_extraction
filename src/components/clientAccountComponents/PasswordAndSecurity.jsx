import React from "react";
import InfoCard from "../InfoCard";

const PasswordAndSecurity = () => {
  return (
    <>
      <h2>Password And Security</h2>
      <p>Manage your Personal Information with all flexibility you need</p>
      <div className="info-grid">
        <InfoCard label="Password" value="**************" />
        <InfoCard label="Security Questions" value=" " />
      </div>
    </>
  );
};

export default PasswordAndSecurity;
