import React from "react";

export function VehicleCard({ vehicle, onViewDetails }) {
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

        <button className="primary" style={{
            padding: "0.50rem 1rem",
            fontSize: "1rem",
          }}
          onClick={onViewDetails}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
