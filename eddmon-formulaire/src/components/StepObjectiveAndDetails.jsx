import React, { useState } from "react";
import "./StepGoalsSubjects.css";

const musicGoalsWithIcons = [
  { id: "Solfège", icon: "solfege_icon_og.svg" },
  { id: "Découverte - éveil", icon: "decouverte_icon_og.svg" },
  { id: "Cours d'instrument", icon: "coursdinstrument_og.svg" },
];

const instruments = ["Piano", "Violon", "Guitare", "Batterie", "Saxophone", "Clarinette"];

const babysittingGoalsWithIcons = [
  { id: "Babysitting mariage", icon: "babysittingmariage_og.svg" },
  { id: "Babysitting soirée", icon: "babysittingsoiree_og.svg" },
  { id: "Babysitting week-end", icon: "babysittingweekend_og.svg" },
  { id: "Garde mercredi", icon: "gardemercredi_og.svg" },
  { id: "Garde vacances", icon: "gardevacances_og.svg" },
  { id: "Sortie d'école", icon: "sortiedecole_og.svg" },
  { id: "Garde périscolaire", icon: "gardeperiscolaire_og.svg" },
  { id: "Babysitting journée", icon: "babysittingjournee_og.svg" },
];

const babysittingActivities = [
  "Goûter", "Jeux", "Aide aux devoirs", "Bain", "Préparation repas", "Repas"
];

const tutoringGoalsWithIcons = [
  { id: "Remise à niveau", icon: "remise_icon_og.svg" }, // ✅ CORRIGÉ
  { id: "SOS - échec scolaire", icon: "sos_og.svg" },
  { id: "Performance scolaire", icon: "electric_bolt_icon.svg" },
  { id: "Suivi scolaire", icon: "suivi_scolaire_og.svg" },
  { id: "Nouvel apprentissage", icon: "nouvel_apprenti_og.svg" },
];

// ✅ TOUTES LES MATIÈRES selon votre capture d'écran
const schoolSubjects = [
  "Mathématiques", 
  "Français", 
  "Physique-Chimie", 
  "Anglais", 
  "Histoire - Géographie", 
  "Sciences et Vie de la Terre", 
  "Espagnol", 
  "Sciences Economiques et Sociales (filière ES)", 
  "Informatique", 
  "Allemand", 
  "Philosophie", 
  "HISTOIRE-GÉOGRAPHIE GÉOPOLITIQUE ET SCIENCES POLITIQUES",
  "Économie-Gestion", 
  "Droit", 
  "Mécanique", 
  "Électronique", 
  "Latin", 
  "Comptabilité", 
  "Technologie",
  "Sciences de l'ingénieur", 
  "Biochimie", 
  "Finance", 
  "Chinois", 
  "Marketing", 
  "Gestion financière",
  "Économie monétaire et internationale", 
  "Sciences (filière ES)", 
  "Humanité", 
  "Optique", 
  "SVT",
  "Philo",
  "Maths",
  "Autre"
];

const StepObjectiveAndDetails = ({
  selectedService,
  goalsSubjects,
  setGoalsSubjects,
  onNext,
  onBack,
}) => {
  // ✅ Sélection unique pour le goal
  const [goal, setGoal] = useState(goalsSubjects.goal || "");
  const [subjects, setSubjects] = useState(goalsSubjects.subjects || []);

  const selectGoal = (goalId) => {
    setGoal(goal === goalId ? "" : goalId);
  };

  const toggleSubject = (subject) => {
    setSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleContinue = () => {
    if (goal && subjects.length > 0) {
      setGoalsSubjects({ goal, subjects });
      onNext();
    } else {
      alert("Merci de sélectionner un objectif et au moins une matière/instrument/activité.");
    }
  };

  const renderGoals = (goalsArray) => (
    <div className="goals-grid mb-4">
      {goalsArray.map((g) => (
        <button
          key={g.id}
          className={`goal-button ${goal === g.id ? "active" : ""}`}
          onClick={() => selectGoal(g.id)}
        >
          <img src={`/${g.icon}`} alt={g.id} className="goal-icon" />
          {g.id}
        </button>
      ))}
    </div>
  );

  // ✅ AFFICHAGE AMÉLIORÉ pour les matières scolaires avec scroll
  const renderSubjects = (subjectList) => {
    if (selectedService === "tutoring") {
      return (
        <div className="subjects-grid-container mb-4">
          <div className="subjects-grid">
            {subjectList.map((s) => (
              <button
                key={s}
                className={`subject-button ${subjects.includes(s) ? "selected" : ""}`}
                onClick={() => toggleSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      // Pour musique et babysitting, affichage normal
      return (
        <div className="subjects-grid mb-4">
          {subjectList.map((s) => (
            <button
              key={s}
              className={`subject-button ${subjects.includes(s) ? "selected" : ""}`}
              onClick={() => toggleSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <button className="btn-icon-outside" onClick={onBack}>
        <img src="/left-return-arrow.svg" alt="Retour" className="icon-left" />
      </button>

      <div className="step-goals-subjects container py-5">
        <h3 className="section-title mb-4">Objectifs et détails</h3>

        {selectedService === "tutoring" && (
          <>
            <p className="form-label fw-semibold">
              Quels sont les axes d'amélioration ou objectifs ? <span className="required-star">*</span>
            </p>
            {renderGoals(tutoringGoalsWithIcons)}
            <p className="form-label fw-semibold">
              Choisissez les matières : <span className="required-star">*</span>
            </p>
            {renderSubjects(schoolSubjects)}
          </>
        )}

        {selectedService === "music" && (
          <>
            <p className="form-label fw-semibold">
              Quel est votre axe d'amélioration principal ? <span className="required-star">*</span>
            </p>
            {renderGoals(musicGoalsWithIcons)}
            <p className="form-label fw-semibold">
              Choisissez l'instrument : <span className="required-star">*</span>
            </p>
            {renderSubjects(instruments)}
          </>
        )}

        {selectedService === "babysitting" && (
          <>
            <p className="form-label fw-semibold">
              Quel type de babysitting avez-vous besoin ? <span className="required-star">*</span>
            </p>
            {renderGoals(babysittingGoalsWithIcons)}
            <p className="form-label fw-semibold">
              Choisissez les activités : <span className="required-star">*</span>
            </p>
            {renderSubjects(babysittingActivities)}
          </>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button className="eddmon-btn" onClick={handleContinue}>Continuer</button>
        </div>
      </div>
    </>
  );
};

export default StepObjectiveAndDetails;