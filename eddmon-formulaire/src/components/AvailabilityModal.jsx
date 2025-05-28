import React from "react";
import "./AvailabilityModal.css"; // fichier CSS à créer ou compléter

function AvailabilityModal({ day, time, onSelect, onClose }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>
          Choisissez la disponibilité pour <strong>{day} {time}</strong>
        </p>
        <div className="popup-buttons">
          <button className="btn-obligatoire" onClick={() => onSelect("obligatoire")}>
            Obligatoire
          </button>
          <button className="btn-optionnelle" onClick={() => onSelect("optionnelle")}>
            Optionnelle
          </button>
        </div>
        <button className="btn-annuler" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}

export default AvailabilityModal;
