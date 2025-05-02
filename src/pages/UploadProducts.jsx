// components/UploadWaste.jsx
import React, { useState } from 'react';
import '../styles/uploadProduct.css';

const UploadProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading: ${selectedFile.name}`);
      // Logic to actually upload file goes here!
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <div className="upload-waste-container">
      <h2>Upload Waste Record</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadProduct;
