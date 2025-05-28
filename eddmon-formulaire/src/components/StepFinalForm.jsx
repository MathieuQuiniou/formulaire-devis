import React, { useState } from "react";
import "./StepFinalForm.css";

const tutorProfiles = [
  "Pédagogue",
  "Empathique",
  "Motivant",
  "Dynamique",
  "Calme",
];

function StepFinalForm({ onSubmit, contactInfo, onBack }) {
  const [formData, setFormData] = useState({
    comment: "",
    profile: [],
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProfile = (trait) => {
    setFormData((prev) => {
      const alreadySelected = prev.profile.includes(trait);
      return {
        ...prev,
        profile: alreadySelected
          ? prev.profile.filter((t) => t !== trait)
          : [...prev.profile, trait],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{5}$/.test(formData.postalCode)) {
      alert("Le code postal doit contenir exactement 5 chiffres.");
      return;
    }

    const payload = {
      email: contactInfo.email || "",
      comment: formData.comment,
      postalCode: formData.postalCode,
      tutorProfile: formData.profile,
    };

    // ✅ On transmet les données au parent (App.js)
    await onSubmit(payload);
  };

  return (
    <div className="final-form-container">
      <h2 className="form-title">Finalisez votre demande :</h2>

      <form onSubmit={handleSubmit} className="final-form">
        <div className="form-group">
          <label className="form-label">Souhaitez-vous ajouter quelque chose ?</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Commentaire"
            className="form-control"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Quel est le profil du tuteur recherché ?</label>
          <div className="profile-button-group">
            {tutorProfiles.map((trait) => (
              <button
                key={trait}
                type="button"
                onClick={() => toggleProfile(trait)}
                className={`trait-button ${
                  formData.profile.includes(trait) ? "selected" : ""
                }`}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Code postal</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="form-control"
            placeholder="75001"
            pattern="\d{5}"
            maxLength={5}
            required
          />
        </div>

        <div className="form-actions mt-4 d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
            Retour
          </button>
          <button type="submit" className="btn-purple">
            Finaliser la demande
          </button>
        </div>
      </form>
    </div>
  );
}

export default StepFinalForm;
