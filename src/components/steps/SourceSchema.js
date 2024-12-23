import React from "react";

const SourceSchema = ({ onFileChange }) => {
  return (
    <div className="upload-section">
      <button className="upload-icon-button" onClick={() => document.getElementById("sourceFileInput").click()}>
        <i className="fa fa-cloud-upload" aria-hidden="true"></i>
        <p>Upload Source Schema</p>
      </button>
      <input
        type="file"
        id="sourceFileInput"
        onChange={(e) => onFileChange(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default SourceSchema;
