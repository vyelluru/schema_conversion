import React, { useState } from "react";
import "./App.css";
import UploadSchema from "./components/UploadSchema";
import ConvertSchema from "./components/steps/ConvertSchema";

function App() {
  const [mappingData, setMappingData] = useState([]);
  const [convertedData, setConvertedData] = useState([]);

  return (
    <div className="App">
      <h1>Schema Mapping App</h1>

      {/* UploadSchema Component: Upload and set the mapping data */}
      <UploadSchema setMappingData={setMappingData} />

      {/* ConvertSchema Component: Convert schema based on uploaded mappings */}
      {mappingData.length > 0 && (
        <ConvertSchema mappingData={mappingData} setConvertedData={setConvertedData} />
      )}

      {/* View Converted Data: Display the converted data in a table */}
      {convertedData.length > 0 && (
        <div>
          <h2>Converted Data:</h2>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {convertedData.map((mapping, index) => (
                <tr key={index}>
                  <td>{mapping.source}</td>
                  <td>{mapping.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
