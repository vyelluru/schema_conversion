import React, { useState } from "react";
import "./GenerateMapping.css";

const GenerateMapping = ({ sourceFields, targetFields, onMappingChange }) => {
  const [mappings, setMappings] = useState([]);

  const handleDrop = (targetField, sourceField) => {
    const newMapping = { source: sourceField, target: targetField };
    setMappings((prev) => [...prev, newMapping]);
    onMappingChange([...mappings, newMapping]);
  };

  return (
    <div className="mapping-container">
      <div className="fields-list source-fields">
        <h3>Source Fields</h3>
        {sourceFields.map((field) => (
          <div
            key={field}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", field)}
            className="field-item"
          >
            {field}
          </div>
        ))}
      </div>

      <div className="fields-list target-fields">
        <h3>Target Fields</h3>
        {targetFields.map((field) => (
          <div
            key={field}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const sourceField = e.dataTransfer.getData("text/plain");
              handleDrop(field, sourceField);
            }}
            className="field-item target-item"
          >
            {field}
          </div>
        ))}
      </div>

      <div className="mapping-results">
        <h3>Mappings</h3>
        <ul>
          {mappings.map((mapping, index) => (
            <li key={index}>
              {mapping.source} → {mapping.target}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenerateMapping;
