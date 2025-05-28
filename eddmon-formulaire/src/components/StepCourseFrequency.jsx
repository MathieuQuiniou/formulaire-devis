import React, { useState } from "react";
import "./StepCourseFrequency.css";

const StepCourseFrequency = ({
  selectedService,
  courseFrequency = {},
  setCourseFrequency,
  onNext,
  onBack,
}) => {
  const [timesPerWeek, setTimesPerWeek] = useState(courseFrequency.timesPerWeek || null);
  const [duration, setDuration] = useState(courseFrequency.duration || null);

  const recommendedDuration = "1h30";
  const durations = ["1h", "1h15", "1h30", "1h45", "2h", "2h30", "3h", "3h30", "4h"];

  const handleContinue = () => {
    if (timesPerWeek && duration) {
      setCourseFrequency({ timesPerWeek, duration });
      onNext();
    } else {
      alert("Merci de sélectionner la fréquence et la durée des cours.");
    }
  };

  // ✅ Titre dynamique selon le service
  const getTitleByService = () => {
    switch (selectedService) {
      case "music":
        return "Fréquence des cours de musique";
      case "babysitting":
        return "Fréquence des gardes";
      default:
        return "Fréquence des cours";
    }
  };

  return (
    <>
      {/* 🔙 Bouton retour externe */}
      <button className="btn-icon-outside" onClick={onBack}>
        <img src="/left-return-arrow.svg" alt="Retour" className="icon-left" />
      </button>

      <div className="container py-5">
        <h2 className="fw-bold mb-4">
          <em>{getTitleByService()}</em>
        </h2>

        {/* Cours par semaine */}
        <div className="mb-4">
          <label className="form-label fw-bold">Combien de cours souhaitez-vous par semaine ?</label>
          <div className="d-flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                className={`course-btn ${timesPerWeek === num ? "active" : ""}`}
                onClick={() => setTimesPerWeek(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Durée des cours */}
        <div className="mb-4">
          <label className="form-label fw-bold">Durée des séances :</label>
          <div className="d-flex flex-wrap gap-2">
            {durations.map((time) => (
              <button
                key={time}
                className={`course-btn ${duration === time ? "active" : ""}`}
                onClick={() => setDuration(time)}
              >
                {time}
                {time === recommendedDuration && (
                  <img
                    src="/star.svg"
                    alt="recommandé"
                    className="ms-2 star-icon"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info recommandation */}
        <div className="text-muted mt-2 mb-3 d-flex align-items-center">
          <img src="/star.svg" alt="star" width="16" className="me-2" />
          Durée recommandée par nos clients
        </div>

        {/* Info réduction */}
        <div className="text-info mb-4 d-flex align-items-center">
          <span role="img" aria-label="ampoule" className="me-2">💡</span>
          Réduction de 10% à partir de 5 cours / semaine
        </div>

        {/* Navigation */}
        <div className="d-flex justify-content-end">
          <button className="eddmon-btn" onClick={handleContinue}>Continuer</button>
        </div>
      </div>
    </>
  );
};

export default StepCourseFrequency;
