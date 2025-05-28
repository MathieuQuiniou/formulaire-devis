import React, { useState, useEffect } from "react";
import "./CartSummary.css";

const CartSummary = ({
  selectedService,
  studentInfo,
  subjects,
  frequency,
  currentStep,
  address,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showPromoField, setShowPromoField] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const validPromoCodes = {
    "WELCOME10": { discount: 10, type: "percentage", description: "10% de réduction" },
    "FIRST20": { discount: 20, type: "percentage", description: "20% de réduction" },
    "SAVE5": { discount: 5, type: "fixed", description: "5€ de réduction" },
    "STUDENT15": { discount: 15, type: "percentage", description: "15% de réduction étudiant" }
  };

  const services = {
    tutoring: {
      label: "Tutorat",
      prices: {
        CP: "21,5€/h", CE1: "21,5€/h", CE2: "21,5€/h", CM1: "21,5€/h", CM2: "21,5€/h",
        "6e": "22,5€/h", "5e": "22,5€/h", "4e": "22,5€/h", "3e": "22,5€/h",
        Seconde: "24,5€/h", Première: "24,5€/h", Terminale: "24,5€/h",
        "Bac+1": "31,5€/h", "Bac+2": "31,5€/h", "Bac+3": "31,5€/h", "Bac+4": "31,5€/h", "Bac+5": "31,5€/h"
      }
    },
    babysitting: {
      label: "Babysitting éducatif",
      price: "14,9€/h"
    },
    music: {
      label: "Cours de musique",
      price: "25€/h"
    }
  };

  const service = services[selectedService];
  const niveau = studentInfo?.level;
  const basePrice = selectedService === "tutoring"
    ? services.tutoring.prices[niveau]
    : service?.price;
  const beforeTax = basePrice
    ? parseFloat(basePrice.replace("€/h", "").replace(",", ".")) * 2
    : null;

  const isEmpty = !selectedService &&
    (!studentInfo?.firstName || studentInfo.firstName.trim() === "") &&
    (!subjects || subjects.length === 0);

  // 🔍 Fonction pour valider le code promo avec Airtable
  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoStatus("invalid");
      return;
    }

    setPromoStatus("loading");
    console.log("🔍 Envoi du code promo:", promoCode.trim());

    try {
      const response = await fetch("http://localhost:4000/api/verifyPromoCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      const data = await response.json();
      console.log("🔍 Réponse du serveur:", data);

      if (data.valid) {
        setPromoStatus("valid");
        setAppliedPromo({
          code: data.code,
          discount: data.discountPercentage,
          type: "percentage",
          description: data.description,
          longTermDiscount: data.longTermDiscount,
          creditAmount: data.creditAmount,
          services: data.services,
        });
        console.log("✅ Code promo appliqué:", data);
      } else {
        setPromoStatus("invalid");
        setAppliedPromo(null);
        console.log("❌ Code promo invalide:", data.error);
      }
    } catch (error) {
      console.error("❌ Erreur côté client:", error);
      setPromoStatus("invalid");
      setAppliedPromo(null);
    }
  };

  // 🗑️ Fonction pour supprimer le code promo
  const removePromoCode = () => {
    setPromoCode("");
    setPromoStatus(null);
    setAppliedPromo(null);
    setShowPromoField(false);
  };

  // ✅ FONCTION AMÉLIORÉE POUR OBTENIR L'IMAGE SELON LE SERVICE ET L'ÉTAPE
  const getServiceImage = () => {
    if (isEmpty) return null;

    // Logique améliorée selon les étapes et services
    if (currentStep >= 1 && currentStep < 4) {
      return {
        src: "/up-direction-img.svg",
        alt: "Flèche directionnelle",
        className: "service-image direction-arrow floating"
      };
    }

    if (currentStep === 4) {
      // Étape intermédiaire - image de transition
      return {
        src: "/up-direction-img.svg",
        alt: "Transition",
        className: "service-image direction-arrow"
      };
    }

    if (currentStep === 5) {
      return {
        src: "/magic-hand.svg",
        alt: "Main magique - Finalisation",
        className: "service-image magic-hand"
      };
    }

    // Images selon le service sélectionné (étapes avancées)
    switch (selectedService) {
      case "babysitting":
        return {
          src: "/babysitting-illustration.svg", // Remplacez par votre image de babysitting
          alt: "Babysitting éducatif",
          className: "service-image babysitting floating"
        };
      case "tutoring":
        return {
          src: "/tutoring-illustration.svg", // Remplacez par votre image de tutorat
          alt: "Cours de soutien",
          className: "service-image tutoring floating"
        };
      case "music":
        return {
          src: "/music-illustration.svg", // Remplacez par votre image de musique
          alt: "Cours de musique",
          className: "service-image music floating"
        };
      default:
        return {
          src: "/up-direction-img.svg",
          alt: "Service éducatif",
          className: "service-image direction-arrow floating"
        };
    }
  };

  // Effect pour gérer le chargement de l'image
  useEffect(() => {
    const serviceImage = getServiceImage();
    if (serviceImage) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
      img.src = serviceImage.src;
    }
  }, [selectedService, currentStep, isEmpty]);

  if (!isOpen) return null;

  const serviceImage = getServiceImage();

  return (
    <div 
      className="cart-summary-container" 
      data-step={currentStep}
      data-service={selectedService}
    >
      <div className="cart-summary-box">
        
        {/* ✅ IMAGE AMÉLIORÉE QUI DÉBORDE DU PANIER */}
        {serviceImage && (
          <div className="service-image-container">
            <img 
              src={serviceImage.src}
              alt={serviceImage.alt}
              className={`${serviceImage.className} ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                console.warn(`Image non trouvée: ${serviceImage.src}`);
                setImageLoaded(false);
              }}
              style={{
                opacity: imageLoaded ? 1 : 0.7,
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>
        )}

        <div className="text-center">
          <h5 className="cart-summary-title">Mon Panier</h5>
        </div>

        {isEmpty ? (
          <>
            <img src="/emptey-mon-panier.svg" alt="Panier vide" className="cart-summary-img" />
            <p className="cart-summary-placeholder">
              Sélectionnez un service pour découvrir nos intervenants qualifiés et leurs tarifs.
            </p>
          </>
        ) : (
          <>
            {address && (
              <>
                <div className="cart-summary-section">
                  <p className="cart-summary-label">
                    <img src="/location.svg" alt="Adresse" className="icon-img" />
                    <strong>{address}</strong>
                  </p>
                </div>
                <hr className="section-divider" />
              </>
            )}

            {studentInfo?.firstName && (
              <>
                <div className="cart-summary-section">
                  <div className="cart-summary-label badge-inline">
                    <img src="/child-icon.svg" alt="Élève" className="icon-img" />
                    <strong>
                      {studentInfo.firstName?.toUpperCase()}
                      {studentInfo.lastName ? ` ${studentInfo.lastName.toUpperCase()}` : ""}
                    </strong>
                    {subjects?.length > 0 && (
                      <div className="badge-container-inline">
                        {subjects.map((subject, index) => (
                          <span key={index} className="cart-summary-badge">{subject}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <hr className="section-divider" />
              </>
            )}

            {service && (
              <>
                <div className="cart-summary-section">
                  <div className="cart-summary-label badge-inline">
                    <img src="/cart-icon.svg" alt="Service" className="icon-img" />
                    <strong>{service.label}</strong>
                    {basePrice && (
                      <div className="badge-container-inline">
                        <span className="cart-summary-badge">{basePrice}</span>
                      </div>
                    )}
                  </div>

                  {beforeTax && (
                    <div className="cart-summary-pricing">
                      <div className="price-base">ou {beforeTax.toFixed(0)}€/h</div>
                      <div className="discount">avant crédit d'impôt</div>
                    </div>
                  )}
                </div>
                <hr className="section-divider" />
              </>
            )}

            {/* ✅ SECTION CODE PROMO */}
            <div className="cart-summary-promo-section">
              {!showPromoField && !appliedPromo ? (
                <p className="cart-summary-promo">
                  <button 
                    onClick={() => setShowPromoField(true)}
                    className="promo-link-button"
                  >
                    Vous avez un code promo ?
                  </button>
                </p>
              ) : showPromoField && !appliedPromo ? (
                <div className="promo-input-section">
                  <label className="promo-label">Votre code de parrainage</label>
                  <div className="promo-input-container">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Entrez votre code"
                      className={`promo-input ${promoStatus === 'invalid' ? 'promo-input-error' : ''}`}
                      onKeyPress={(e) => e.key === 'Enter' && validatePromoCode()}
                    />
                    <button 
                      onClick={validatePromoCode}
                      disabled={promoStatus === 'loading' || !promoCode.trim()}
                      className="promo-validate-btn"
                    >
                      {promoStatus === 'loading' ? '...' : 'Valider'}
                    </button>
                  </div>
                  
                  {promoStatus === 'invalid' && (
                    <div className="promo-error">
                      Code promo invalide ou expiré
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowPromoField(false)}
                    className="promo-cancel-btn"
                  >
                    Annuler
                  </button>
                </div>
              ) : appliedPromo ? (
                <div className="promo-applied">
                  <div className="promo-success">
                    ✅ Code <strong>{appliedPromo.code}</strong> appliqué !
                  </div>
                  <button 
                    onClick={removePromoCode}
                    className="promo-remove-btn"
                  >
                    Supprimer
                  </button>
                </div>
              ) : null}
            </div>

            <div className="cart-summary-alert">
              Le prix du premier cours est majoré de 10€ pour le cadrage pédagogique de l'élève.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;