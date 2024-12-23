import React, { useState } from "react";
import "./UploadSchema.css";

import SourceSchema from "./steps/SourceSchema";
import TargetSchema from "./steps/TargetSchema";
import GenerateMapping from "./steps/GenerateMapping";
import ConfirmMapping from "./steps/ConfirmMapping";
import ConvertSchema from "./steps/ConvertSchema";
import ViewSampleData from "./steps/ViewSampleData";

const UploadSchema = () => {
  const [sourceFields, setSourceFields] = useState([]);
  const [targetFields, setTargetFields] = useState([]);
  const [step, setStep] = useState(0);
  const [mappingData, setMappingData] = useState([]);
  const [convertedData, setConvertedData] = useState([]); // New state for converted data

  const extractFields = (jsonSchema, parent = "") => {
    let fields = [];
    for (const key in jsonSchema.properties) {
      const fullPath = parent ? `${parent}.${key}` : key;
      const property = jsonSchema.properties[key];
      if (property.type === "object") {
        fields = fields.concat(extractFields(property, fullPath));
      } else {
        fields.push(fullPath);
      }
    }
    return fields;
  };

  const handleFileChange = (file, setFields) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      const fields = extractFields(json);
      setFields(fields);
    };
    reader.readAsText(file);
  };

  const handleMappingChange = (newMappings) => {
    setMappingData(newMappings);
  };

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, stepLabels.length - 1));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const stepLabels = [
    "Source Schema",
    "Target Schema",
    "Generate Mapping",
    "Confirm Mapping",
    "Convert Schema",
    "View Sample Data",
  ];

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <SourceSchema
            onFileChange={(file) => handleFileChange(file, setSourceFields)}
          />
        );
      case 1:
        return (
          <TargetSchema
            onFileChange={(file) => handleFileChange(file, setTargetFields)}
          />
        );
      case 2:
        return (
          <GenerateMapping
            sourceFields={sourceFields}
            targetFields={targetFields}
            onMappingChange={handleMappingChange}
          />
        );
      case 3:
        return (
          <ConfirmMapping
            mappingData={mappingData}
            setMappingData={setMappingData}
          />
        );
      case 4:
        return (
          <ConvertSchema
            mappingData={mappingData}
            setConvertedData={setConvertedData} // Pass function to update converted data
          />
        );
      case 5:
        return <ViewSampleData data={convertedData} />; // Use convertedData to view sample
      default:
        return null;
    }
  };

  return (
    <div className="upload-schema-container">
      <h1>Upload {stepLabels[step]}</h1>

      <div className="progress-bar">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`step ${index === step ? "active" : ""}`}
            onClick={() => setStep(index)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="step-content">{renderStepContent()}</div>

      <div className="navigation-buttons">
        {step > 0 && (
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        )}
        {step < stepLabels.length - 1 && (
          <button className="next-button" onClick={handleNext}>
            {step === 3 ? "Confirm" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadSchema;
