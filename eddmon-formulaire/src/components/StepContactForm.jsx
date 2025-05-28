import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./StepContactForm.css";

function StepContactForm({ onBack, onSubmit, setContactInfo }) {
  const [formData, setFormData] = useState({
    civility: "",
    name: "",
    email: "",
    phone: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ État de chargement

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Veuillez valider le reCAPTCHA.");
      return false;
    }

    setIsSubmitting(true); // ✅ Début du chargement

    try {
      const contactData = {
        gender: formData.civility,
        parentName: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      setContactInfo(contactData);

      // ✅ Attendre la réponse du backend
      const success = await onSubmit(contactData);
      
      console.log("Résultat onSubmit:", success); // ✅ Debug
      
      if (success) {
        // ✅ Succès - ne pas afficher d'erreur
        return true;
      } else {
        // ❌ Échec
        alert("Erreur lors de l'envoi des données. Veuillez réessayer.");
        return false;
      }
    } catch (error) {
      // ✅ Gestion des erreurs réseau/serveur
      console.error("Erreur dans handleSubmit:", error);
      alert("");
      return false;
    } finally {
      setIsSubmitting(false); // ✅ Fin du chargement
    }
  };

  return (
    <>
      <button className="btn-icon-outside" onClick={onBack}>
        <img src="/left-return-arrow.svg" alt="Retour" className="icon-left" />
      </button>

      <div className="contact-form-wrapper">
        <h3 className="form-title">
          Inscrivez-vous pour recevoir votre devis personnalisé.
        </h3>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Civilité + Nom */}
          <div className="form-row">
            <div className="form-group civilite-group">
              <label className="form-label">Civilité</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="civility"
                    value="M."
                    onChange={handleChange}
                    checked={formData.civility === "M."}
                    disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                  />
                  M.
                </label>
                <label>
                  <input
                    type="radio"
                    name="civility"
                    value="Mme."
                    onChange={handleChange}
                    checked={formData.civility === "Mme."}
                    disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                  />
                  Mme.
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="name"
                className={`form-control ${touchedFields.name ? "touched" : ""}`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nom du parent"
                disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                required
              />
            </div>
          </div>

          {/* Email + Téléphone */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${touchedFields.email ? "touched" : ""}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email du parent"
                disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Votre numéro</label>
              <input
                type="tel"
                name="phone"
                className={`form-control ${touchedFields.phone ? "touched" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="06 12 34 56 78"
                disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
                required
              />
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="form-group mt-3">
            <ReCAPTCHA
              sitekey="6LfOnEYrAAAAABU6qCce6nvpbQAWxNlSIEkhqeba"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Bouton */}
          <div className="form-actions mt-4">
            <button 
              type="submit" 
              className="btn-purple"
              disabled={isSubmitting} // ✅ Désactiver pendant l'envoi
            >
              {isSubmitting ? "Envoi en cours..." : "Recevoir mon devis"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default StepContactForm;