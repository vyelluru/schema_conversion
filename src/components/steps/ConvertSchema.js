import React, { useState } from "react";
import "./ConvertSchema.css";
import ViewSampleData from "./ViewSampleData";

const ConvertSchema = ({ setConvertedData }) => {
  const [mappingFile, setMappingFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file upload and parsing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const mappings = JSON.parse(reader.result);
          setMappingFile(mappings);
          setError(null);
        } catch (err) {
          setError("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file.");
    }
  };

  // Convert schema data (just an example of what it could look like)
  const handleConvertSchema = () => {
    if (!mappingFile) {
      setError("No mapping file uploaded.");
      return;
    }

    // Example: Just for demonstration purposes, here we would process the mapping
    const convertedData = mappingFile.map((mapping) => ({
      source: mapping.source,
      target: mapping.target,
    }));

    setConvertedData(convertedData);
  };

  return (
    <div className="convert-schema">
      <h2>Convert Schema</h2>

      {/* File Upload */}
      <div className="upload-container">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="upload-button"
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <button className="convert-button" onClick={handleConvertSchema}>
        Convert
      </button>

      {/* View Converted Data */}
      {mappingFile && <ViewSampleData data={mappingFile} />}
    </div>
  );
};

export default ConvertSchema;
