import React from "react";
import "./ServiceChoiceCard.css";

function ServiceChoiceCard({ icon, title, price, priceNote, description, highlight, onClick }) {
  return (
    <div
      className={`service-card-wc ${highlight ? "highlight" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick()}
    >
      <div className="service-card-header">
        <div className="service-card-icon">{icon}</div>
        <div className="service-card-info">
          <div className="service-card-title">{title}</div>
          <div className="service-card-price">{price}</div>
          {priceNote && <div className="service-card-price-note">{priceNote}</div>}
        </div>
        {highlight && <div className="badge-populaire">Populaire</div>}
      </div>
      <div className="service-card-description">
        {description.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </div>
    </div>
  );
}

export default ServiceChoiceCard;
