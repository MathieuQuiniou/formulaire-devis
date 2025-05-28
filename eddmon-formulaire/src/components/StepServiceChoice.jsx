import React, { useState } from "react";
import "./StepServiceChoice.css";

const StepServiceChoice = ({ selectedService, setSelectedService, onNext }) => {
  const [openedCard, setOpenedCard] = useState(null);

  const services = [
    {
      id: "tutoring",
      title: "Soutien Scolaire",
      subtitleBold: "Un cadre et de la méthode,",
      subtitle: "aider votre enfant à progresser",
      price: "21,5€ à 31,5€/h",
      bgClass: "bg-blue",
    },
    {
      id: "babysitting",
      title: "Babysitting Éducatif",
      subtitleBold: "Un accompagnement pédagogique et créatif.",
      subtitle: "",
      price: "14,9€/h",
      bgClass: "bg-orange",
    },
    {
      id: "music",
      title: "Cours de musique",
      subtitleBold: "Apprendre la musique en s’amusant.",
      subtitle: "",
      price: "25€/h",
      bgClass: "bg-pink",
    },
  ];

  const toggleCard = (id) => {
    setOpenedCard((prev) => (prev === id ? null : id));
  };

  const handleServiceSelect = (id) => {
    setSelectedService(id);
    onNext();
  };

  return (
    <div className="service-choice-container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="step-title">
          Choisissez un service <span role="img" aria-label="target"></span>
        </h2>
      </div>

      <div className="service-cards-wrapper">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-box ${service.bgClass} ${openedCard === service.id ? "selected" : ""}`}
            onClick={() => toggleCard(service.id)}
          >
            <div className="service-header">
              <div className="service-title">{service.title}</div>
              <div className="service-price">{service.price} ›</div>
            </div>
            <div className="service-subtitle">
              <strong>{service.subtitleBold}</strong> {service.subtitle}
            </div>

            {openedCard === service.id && service.id === "tutoring" && (
              <div className="details mt-3">
                <div className="tarif-list">
                  <div>• Primaire — 21,5€/h</div>
                  <div>• Collège — 22,5€/h</div>
                  <div>• Lycée — 24,5€/h</div>
                  <div>• Supérieur — 31,5€/h</div>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  Choisir ce service
                </button>
              </div>
            )}

            {openedCard === service.id && service.id === "babysitting" && (
              <div className="details mt-2">
                <p>
                  Ce service vous permet de confier vos enfants à un tuteur qui les stimule par le jeu, la lecture et des activités éducatives adaptées à leur âge.
                </p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  Choisir ce service
                </button>
              </div>
            )}

            {openedCard === service.id && service.id === "music" && (
              <div className="details mt-2">
                <p>
                  Cours personnalisés pour découvrir un instrument ou se perfectionner à son rythme, tous niveaux confondus.
                </p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  Choisir ce service
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepServiceChoice;
