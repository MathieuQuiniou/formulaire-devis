import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ step, totalSteps }) => {
  const currentStep = step + 1; // step 0 = étape 1
  const progressPercent = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-info">
        <small>Étape {currentStep} sur {totalSteps}</small>
        <small>{Math.round(progressPercent)}%</small>
      </div>
      <div className="custom-progress-bar">
        <div
          className="custom-progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
