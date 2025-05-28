import React from 'react';
import './StepStudentDescription.css';

function StepStudentDescription({ onNext, onBack, studentInfo, setStudentInfo }) {
  const handleContinue = () => {
    const { firstName, level, needs } = studentInfo;
    if (firstName && level && needs.length > 0) {
      onNext();
    } else {
      alert("Merci de remplir tous les champs obligatoires");
    }
  };

  const toggleNeed = (need) => {
    const needs = studentInfo.needs.includes(need)
      ? studentInfo.needs.filter((n) => n !== need)
      : [...studentInfo.needs, need];
    setStudentInfo({ ...studentInfo, needs });
  };

  const toggleSpecific = (specific) => {
    const specifics = studentInfo.specifics.includes(specific)
      ? studentInfo.specifics.filter((s) => s !== specific)
      : [...studentInfo.specifics, specific];
    setStudentInfo({ ...studentInfo, specifics });
  };

  return (
    <>
      {/* 🔙 Bouton retour externe */}
      <button className="btn-icon-outside" onClick={onBack}>
        <img src="/left-return-arrow.svg" alt="Retour" className="icon-left" />
      </button>

      <div className="step-student-wrapper">
        <div className="step-student-header">
        </div>

        <div className="step-student-description container">
          <h2 className="step-title">
            <em>Décrivez-nous l'élève :</em>{' '}
            <img src="/multi-star.svg" alt="✨" className="emoji-icon" />
          </h2>

          <div className="mb-4">
            <label className="form-label">
              Quel est le prénom de l'élève ? <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="form-control eddmon-input"
              placeholder="Prénom"
              value={studentInfo.firstName}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, firstName: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Sélectionnez sa classe : <span className="required-star">*</span>
            </label>
            <select
              className="form-select eddmon-input"
              value={studentInfo.level}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, level: e.target.value })
              }
            >
              <option value="">Veuillez sélectionner</option>
              {[
                "CP", "CE1", "CE2", "CM1", "CM2",
                "6e", "5e", "4e", "3e",
                "Seconde", "Première", "Terminale",
                "Bac+1", "Bac+2", "Bac+3", "Bac+4", "Bac+5"
              ].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">
              De quoi votre enfant a-t-il besoin ? <span className="required-star">*</span>
            </label>
            <div className="tag-list">
              {[
                "Autres", "Motivation", "Confiance en soi",
                "Méthode", "Autonomie", "Exceller"
              ].map((need) => (
                <button
                  key={need}
                  type="button"
                  className={`tag-btn ${studentInfo.needs.includes(need) ? 'active' : ''}`}
                  onClick={() => toggleNeed(need)}
                >
                  {need}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">
              A-t-il des particularités ? <span className="optional-text">(optionnelle)</span>
            </label>
            <div className="tag-list">
              {[
                "Aucune", "Autre", "HPI", "Dyslexie", "Dysphasie", "Dyscalculie", "Dyspraxie",
                "TSA", "Hyperactivité", "TDA"
              ].map((spec) => (
                <button
                  key={spec}
                  type="button"
                  className={`tag-btn ${studentInfo.specifics.includes(spec) ? 'active' : ''}`}
                  onClick={() => toggleSpecific(spec)}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="eddmon-btn" onClick={handleContinue}>
              Continuer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepStudentDescription;