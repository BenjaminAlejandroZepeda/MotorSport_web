import React, { useEffect, useState } from "react";

export function VehicleCard({ vehicle, onViewDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = localStorage.getItem("currentUser") || "anonimo";

  const checkFavorite = () => {
    const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDelUsuario = favoritosData[currentUser] || [];
    return favoritosDelUsuario.some((fav) => fav.id === vehicle.id);
  };

  useEffect(() => {
    setIsFavorite(checkFavorite());
  }, [vehicle]);

  const toggleFavorite = () => {
    const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDelUsuario = favoritosData[currentUser] || [];

    let nuevosFavoritos;

    if (isFavorite) {
      // Eliminar
      nuevosFavoritos = favoritosDelUsuario.filter((fav) => fav.id !== vehicle.id);
    } else {
      // Agregar solo si no existe
      const yaExiste = favoritosDelUsuario.some((fav) => fav.id === vehicle.id);
      nuevosFavoritos = yaExiste ? favoritosDelUsuario : [...favoritosDelUsuario, vehicle];
    }

    const actualizados = {
      ...favoritosData,
      [currentUser]: nuevosFavoritos,
    };

    localStorage.setItem("favoritos", JSON.stringify(actualizados));
    setIsFavorite(!isFavorite);
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
            onClick={onViewDetails}
          >
            Ver detalles
          </button>

          <button
            className="secondary"
            style={{
              padding: "0.5rem",
              fontSize: "1.25rem",
              borderRadius: "50%",
              lineHeight: "1",
              color: isFavorite ? "#FFD60A" : "#ccc",
            }}
            onClick={toggleFavorite}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
}
