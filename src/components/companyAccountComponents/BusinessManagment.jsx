import React from "react";
import InfoCard from "../InfoCard";

const BusinessManagment = () => {
  return (
    <>
      <h2>Business Management</h2>
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

export default BusinessManagment;
