import React from "react";

const TargetSchema = ({ onFileChange }) => {
  return (
    <div className="upload-section">
      <button className="upload-icon-button" onClick={() => document.getElementById("targetFileInput").click()}>
        <i className="fa fa-cloud-upload" aria-hidden="true"></i>
        <p>Upload Target Schema</p>
      </button>
      <input
        type="file"
        id="targetFileInput"
        onChange={(e) => onFileChange(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default TargetSchema;
