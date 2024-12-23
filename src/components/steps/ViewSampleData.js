import React from "react";
import "./ViewSampleData.css";

const ViewSampleData = ({ data }) => {
  return (
    <div className="view-sample-data">
      <h3>Converted Schema Data</h3>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mapping, index) => (
            <tr key={index}>
              <td>{mapping.source}</td>
              <td>{mapping.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSampleData;
