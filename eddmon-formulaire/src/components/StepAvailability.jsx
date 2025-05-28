import React, { useState } from "react";
import "./StepAvailability.css";
import AvailabilityModal from "./AvailabilityModal";

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const TIMES = ["Matin", "Après-midi", "Soir"];

function StepAvailability({ availability, setAvailability, onNext, onBack, maxSelections }) {
  const [selected, setSelected] = useState({});
  const [modalInfo, setModalInfo] = useState(null);

  const handleClick = (day, time) => {
    const key = `${day}-${time}`;

    // ✅ DÉSÉLECTION - Si le créneau est déjà sélectionné
    if (selected[key]) {
      // Retirer de la sélection
      setSelected((prev) => {
        const newSelected = { ...prev };
        delete newSelected[key];
        return newSelected;
      });
      return;
    }

    // ✅ SÉLECTION - Vérifier la limite
    const totalSelected = Object.keys(selected).length;
    if (maxSelections && totalSelected >= maxSelections) {
      alert(`Vous avez déjà sélectionné ${maxSelections} créneaux. Désélectionnez-en un pour en ajouter un autre.`);
      return;
    }

    // Ouvrir la modal pour choisir le type
    setModalInfo({ day, time });
  };

  const handleSelect = (choice) => {
    const key = `${modalInfo.day}-${modalInfo.time}`;
    setSelected((prev) => ({ ...prev, [key]: choice }));
    setModalInfo(null);
  };

  const handleNext = () => {
    const formatted = Object.entries(selected).map(([key, val]) => {
      const [day, time] = key.split("-");
      const label = val === "required" ? "Obligatoire" : "Optionnelle";
      return `${day} ${time} (${label})`;
    });
    setAvailability(formatted);
    onNext();
  };

  return (
    <>
      <button className="btn-icon-outside" onClick={onBack}>
        <img src="/left-return-arrow.svg" alt="Retour" className="icon-left" />
      </button>

      <div className="availability-wrapper">
        {/* ✅ HEADER COMPACT - Moins d'espacement */}
        <div className="header-top">
          <div>
            <h3 className="title d-flex align-items-center">
              <img src="/calender-icon.svg" alt="Calendrier" className="calendar-icon me-2" />
              Vos disponibilités préférées
            </h3>
            <p className="subtext">
              Cliquez sur les créneaux pour indiquer vos disponibilités :
              <br /> Une fenêtre vous permettra de choisir le type.
            </p>
          </div>
        </div>

        {/* ✅ TIP BOX COMPACT */}
        <div className="availability-tip-box">
          <p className="availability-tip-text">
            😎 Plus vous indiquez de disponibilités, plus nous aurons de candidats.
            Par exemple, si votre enfant est disponible tous les jours et que vous souhaitez lui donner 2 cours par semaine dont un le lundi obligatoirement, indiquez la disponibilité du lundi comme <strong>"Obligatoire"</strong> et les autres comme <strong>"Optionnelle"</strong>.
          </p>
          {/* ✅ NOUVEAU - Info sur la désélection */}
          <p className="deselect-info">
            💡 <strong>Astuce :</strong> Cliquez à nouveau sur un créneau sélectionné pour le désélectionner.
          </p>
        </div>

        {/* ✅ TABLEAU COMPACT */}
        <div className="availability-table">
          <div className="header-row">
            <div className="cell label-cell"></div>
            {TIMES.map((time) => (
              <div key={time} className="cell header-cell">{time}</div>
            ))}
          </div>

          {DAYS.map((day) => (
            <div key={day} className="row">
              <div className="cell label-cell">{day}</div>
              {TIMES.map((time) => {
                const key = `${day}-${time}`;
                const state = selected[key];
                return (
                  <div
                    key={time}
                    className={`cell selectable ${state || ""}`}
                    onClick={() => handleClick(day, time)}
                    title={state ? "Cliquer pour désélectionner" : "Cliquer pour sélectionner"}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* ✅ LÉGENDE COMPACT */}
        <div className="legend">
          <span className="legend-box required"></span> Obligatoire
          <span className="legend-box optional ms-4"></span> Optionnelle
        </div>

        {/* ✅ BOUTON COMPACT À DROITE */}
        <div className="text-end">
          <p className="text-muted">
            Créneaux sélectionnés : <strong>{Object.keys(selected).length}</strong> / {maxSelections}
          </p>

          <button
            className="btn-purple"
            onClick={handleNext}
            disabled={Object.keys(selected).length === 0}
          >
            Continuer
          </button>
        </div>

        {modalInfo && (
          <AvailabilityModal
            day={modalInfo.day}
            time={modalInfo.time}
            onSelect={handleSelect}
            onClose={() => setModalInfo(null)}
          />
        )}
      </div>
    </>
  );
}

export default StepAvailability;