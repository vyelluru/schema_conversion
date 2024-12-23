import React from "react";
import "./ConfirmMapping.css";

const ConfirmMapping = ({ mappingData, setMappingData }) => {
  // Function to delete a mapping
  const handleDeleteMapping = (index) => {
    const updatedMappings = [...mappingData];
    updatedMappings.splice(index, 1); // Remove the selected mapping
    setMappingData(updatedMappings);
  };

  // Function to handle saving the generated mappings
  const handleSaveMappings = () => {
    // Save the mapping data (can be sent to a backend or stored locally)
    console.log("Saving mappings:", mappingData);

    // Example: Save to local storage (for demonstration purposes)
    localStorage.setItem("generatedMappings", JSON.stringify(mappingData));

    alert("Mappings have been saved successfully!");
  };

  // Function to handle downloading the mappings as a JSON file
  const handleDownloadMappings = () => {
    const fileName = "generatedMappings.json";
    const fileData = JSON.stringify(mappingData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="confirm-mapping">
      <h2>Confirm Mappings</h2>
      {mappingData.length > 0 ? (
        <div className="mapping-list">
          <ul>
            {mappingData.map((mapping, index) => (
              <li key={index} className="mapping-item">
                <span>
                  {mapping.source} → {mapping.target}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMapping(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No mappings available. Please go back and generate mappings.</p>
      )}

      <div className="actions">
        <p>
          <strong>Note:</strong> Please ensure the mappings are correct before
          proceeding.
        </p>
        <button onClick={handleSaveMappings} className="save-button">
          Save Mappings
        </button>
        <button onClick={handleDownloadMappings} className="download-button">
          Download Mappings
        </button>
      </div>
    </div>
  );
};

export default ConfirmMapping;
