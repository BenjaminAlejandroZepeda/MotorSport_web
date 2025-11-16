import React, { useState, useEffect } from "react";

export function VehicleCard({ vehicle, isFavorite, onToggleFavorite, onViewDetails }) {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const toggle = () => {
    setFavorite((prev) => !prev);
    onToggleFavorite(vehicle.id);
  };

  return (
    <div className="card" style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
      <img
        src={vehicle.images.frontQuarter}
        alt={vehicle.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "var(--border-radius)",
          borderTopRightRadius: "var(--border-radius)",
        }}
      />

      <div style={{ padding: "1rem" }}>
        <h3 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
          {vehicle.name}
        </h3>

        <p style={{ marginBottom: "1rem" }}>
          <strong>Fabricante:</strong> {vehicle.manufacturer} <br />
          <strong>Precio:</strong> ${vehicle.price.toLocaleString()} <br />
          <strong>Pasajeros:</strong> {vehicle.seats}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="primary"
            style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
            onClick={() => onViewDetails(vehicle)}
          >
            Ver detalles
          </button>

          <button
            onClick={toggle}
            title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.8rem",
              color: favorite ? "#FFD60A" : "#bbb",
              transition: "color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
}
