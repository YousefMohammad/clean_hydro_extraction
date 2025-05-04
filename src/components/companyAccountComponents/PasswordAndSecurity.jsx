import React from "react";
import InfoCard from "../InfoCard";

const PasswordAndSecurity = () => {
  return (
    <>
      <h2>Password And Security</h2>
      <p>Manage your Personal Information with all flexibility you need</p>
      <div className="info-grid">
        <InfoCard
          label="Product preferences"
          value="Customize product features, themes, or layout settings."
        />
        <InfoCard
          label="Usage Reports"
          value="See insights or statistics related to your usage."
        />
      </div>
    </>
  );
};

export default PasswordAndSecurity;
