import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
const InfoCard = ({ label, value }) => (
    <div className="info-card">
      <div className="card-header">
        <span>{label}</span>

        <FontAwesomeIcon icon={faPen} className="edit-icon" />
      
      </div>
      <div className="card-body">{value}</div>
    </div>
  
  );

export default InfoCard;