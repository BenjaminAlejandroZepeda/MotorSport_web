import React, { useState, useEffect } from "react";

export function GarageModal({ show, onHide, vehicle }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
  if (vehicle?.id) {
    const currentUser = localStorage.getItem("currentUser") || "anonimo";
    const reseñasData = JSON.parse(localStorage.getItem("reseñas") || "{}");
    const savedRating = reseñasData[currentUser]?.[vehicle.id];
    if (savedRating) setRating(savedRating);
  }
}, [vehicle]);

  const handleRate = () => {
  const currentUser = localStorage.getItem("currentUser") || "anonimo";
  const reseñasData = JSON.parse(localStorage.getItem("reseñas") || "{}");

  const yaReseñado = reseñasData[currentUser]?.[vehicle.id];

  if (yaReseñado) {
    alert("Ya has reseñado este vehículo.");
    return;
  }

  const nuevasReseñas = {
    ...reseñasData,
    [currentUser]: {
      ...(reseñasData[currentUser] || {}),
      [vehicle.id]: rating
    }
  };

  localStorage.setItem("reseñas", JSON.stringify(nuevasReseñas));
  alert(`✅ Reseña guardada: ${rating} estrellas`);
};


  if (!show || !vehicle) return null;

  const {
    name,
    manufacturer,
    model,
    seats,
    price,
    topSpeed,
    acceleration,
    braking,
    handling,
    images,
  } = vehicle;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onHide}
    >
      <div
        className="card"
        style={{
          width: "90%",
          maxWidth: "800px",
          padding: "1.5rem",
          position: "relative",
          animation: "fadeIn 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onHide}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Título */}
        <h2 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
          {name}
        </h2>

        {/* Galería */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <img
            src={images.front || "/placeholder.png"}
            alt={`${name} frente`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
          <img
            src={images.rear || "/placeholder.png"}
            alt={`${name} trasera`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
          <img
            src={images.side || "/placeholder.png"}
            alt={`${name} lateral`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
        </div>

        {/* Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <p><strong>Fabricante:</strong> {manufacturer}</p>
            <p><strong>Modelo:</strong> {model}</p>
            <p><strong>Pasajeros:</strong> {seats}</p>
            <p><strong>Precio:</strong> ${price?.toLocaleString() || "No disponible"}</p>
          </div>
          <div>
            <p><strong>Velocidad Máxima:</strong> {topSpeed?.kmh} km/h ({topSpeed?.mph} mph)</p>
            <p><strong>Aceleración:</strong> {acceleration}</p>
            <p><strong>Frenado:</strong> {braking}</p>
            <p><strong>Manejo:</strong> {handling}</p>
          </div>
        </div>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            className="primary"
            style={{
              fontSize: "1.05rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--border-radius)",
            }}
            onClick={handleRate}
          >
            Reseñar vehículo
          </button>
          <button
            className="secondary"
            style={{
              fontSize: "1.05rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--border-radius)",
            }}
            onClick={onHide}
          >
            Cerrar
          </button>
        </div>

        {/* Estrellas */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                color: star <= rating ? "#FFD60A" : "#ccc",
                marginRight: "0.25rem",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}