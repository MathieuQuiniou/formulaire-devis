import React, { useState } from "react";

import StepServiceChoice from "./components/StepServiceChoice";
import StepStudentDescription from "./components/StepStudentDescription";
import StepObjectiveAndDetails from "./components/StepObjectiveAndDetails";
import StepCourseFrequency from "./components/StepCourseFrequency";
import StepAvailability from "./components/StepAvailability";
import StepContactForm from "./components/StepContactForm";
import StepFinalForm from "./components/StepFinalForm";
import CartSummary from "./components/CartSummary";
import ProgressBar from "./components/ProgressBar";

import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [showCartMobile, setShowCartMobile] = useState(false);

  const [selectedService, setSelectedService] = useState("");
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    level: "",
    needs: [],
    specifics: [],
  });

  const [goalsSubjects, setGoalsSubjects] = useState({
    goal: "",
    subjects: [],
  });

  const [courseFrequency, setCourseFrequency] = useState({
    timesPerWeek: null,
    duration: null,
  });

  const [availability, setAvailability] = useState([]);

  const [contactInfo, setContactInfo] = useState({
    gender: "",
    parentName: "",
    email: "",
    phone: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  // ✅ Webhook 1 – Étape 6 : Envoi du dossier principal
  const handleSendMainData = async (contactData) => {
    const objectifsFormatted = goalsSubjects.goal
      ? Array.isArray(goalsSubjects.goal)
        ? goalsSubjects.goal.join(", ")
        : goalsSubjects.goal
      : "Non précisé";

    const disponibilitesFormatted =
      availability.length > 0 ? availability.join(", ") : "Non spécifié";

    const sujetsFormatted =
      goalsSubjects.subjects.length > 0
        ? goalsSubjects.subjects.join(", ")
        : "Non précisé";

    const payload = {
      service: selectedService,
      prenom: studentInfo.firstName,
      classe: studentInfo.level || "Non précisé",
      besoins: studentInfo.needs.join(", "),
      particularites: studentInfo.specifics.join(", "),
      objectifs: objectifsFormatted,
      matieres: sujetsFormatted,
      nombreDeCours: courseFrequency.timesPerWeek || "Non précisé",
      dureeSeances: courseFrequency.duration || "Non précisé",
      disponibilites: disponibilitesFormatted,
      civilite: contactData.gender,
      nomParent: contactData.parentName,
      telephoneParent: contactData.phone,
      email: contactData.email,
    };

    try {
      const res = await fetch("http://localhost:4000/api/sendFullDataToAirtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }

      if (!res.ok) throw new Error(result.error || "Erreur webhook 1");

      console.log("✅ Données envoyées à Airtable (webhook 1)", payload);
      return true;
    } catch (err) {
      console.error("❌ Erreur webhook 1 :", err);
      return false;
    }
  };

  // ✅ Webhook 2 – Étape 7 : Envoi final
  const handleFinalSubmit = async (finalFormData) => {
    const payload = {
      email: contactInfo.email,
      ...finalFormData,
    };

    try {
      const res = await fetch("http://localhost:4000/api/sendToAirtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }

      if (!res.ok) throw new Error(result.error || "Erreur webhook 2");

      console.log("✅ Données envoyées à Airtable (webhook 2)", payload);
      alert("Votre demande complète a bien été envoyée !");
      return true; // ✅ AJOUTÉ - retourner true en cas de succès
    } catch (err) {
      console.error("❌ Erreur webhook 2 :", err);
      alert("Erreur lors de la finalisation. Veuillez réessayer.");
      return false; // ✅ AJOUTÉ - retourner false en cas d'erreur
    }
  };

  return (
    <div className="container py-4">
      <ProgressBar step={step} totalSteps={7} />

      <div className="app-wrapper">
        <div className="main-content">
          {step === 0 && (
            <StepServiceChoice
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              onNext={next}
            />
          )}
          {step === 1 && (
            <StepStudentDescription
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 2 && (
            <StepObjectiveAndDetails
              selectedService={selectedService}
              goalsSubjects={goalsSubjects}
              setGoalsSubjects={setGoalsSubjects}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <StepCourseFrequency
              selectedService={selectedService}
              courseFrequency={courseFrequency}
              setCourseFrequency={setCourseFrequency}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <StepAvailability
              availability={availability}
              setAvailability={setAvailability}
              onNext={next}
              onBack={back}
              maxSelections={courseFrequency.timesPerWeek}
            />
          )}
          {step === 5 && (
            <StepContactForm
              setContactInfo={setContactInfo}
              onBack={back}
              onSubmit={async (contactData) => {
                setContactInfo(contactData);
                const success = await handleSendMainData(contactData);
                if (success) {
                  next();
                  return true; // ✅ CRUCIAL - retourner true pour StepContactForm
                } else {
                  return false; // ✅ CRUCIAL - retourner false en cas d'échec
                }
              }}
            />
          )}
          {step === 6 && (
            <StepFinalForm
              contactInfo={contactInfo}
              onSubmit={handleFinalSubmit}
              onBack={back}
            />
          )}
        </div>

        {step < 6 && (
          <>
            <div className="mobile-cart-toggle d-md-none text-center mb-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowCartMobile(!showCartMobile)}
              >
                {showCartMobile ? "Masquer le panier" : "Afficher le panier"}
              </button>
            </div>

            <div
              className={`cart-summary-wrapper ${showCartMobile ? "show-mobile" : ""}`}
            >
              <CartSummary
                address={""}
                selectedService={selectedService}
                studentInfo={studentInfo}
                goals={goalsSubjects.goal}
                subjects={goalsSubjects.subjects}
                frequency={{
                  count: courseFrequency.timesPerWeek,
                  duration: courseFrequency.duration,
                }}
                currentStep={step}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;