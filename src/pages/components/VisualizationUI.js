import React from "react";
import "./VisualizationUI.css"; 

const HowTo = () => {
  return (
    <div className="container1">
      {/* Left section for steps */}
      <div className="steps-section">
        <h1>
          Steps to Displaying Your <span className="highlight">Data</span>
        </h1>
        <p>
        </p>
        <div className="step">
          <div className="step-number">1</div>
          <div>
            <h2>Upload Your CSV File</h2>
            <p>Upoad a CSV File that has been cleaned.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div>
            <h2>Select Display Type</h2>
            <p>Click a button to decide which type of visualization you would like.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div>
            <h2>Select Parameters</h2>
            <p>Select parameters and see your data!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;