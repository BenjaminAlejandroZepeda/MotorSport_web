import React, { useEffect, useState, useCallback } from "react";

export function VehicleCard({ vehicle, onViewDetails, onFavoriteChange }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = localStorage.getItem("currentUser") || "anonimo";

  const checkFavorite = useCallback(() => {
    try {
      const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
      const favoritosDelUsuario = favoritosData[currentUser] || [];
      return favoritosDelUsuario.some((fav) => fav.id === vehicle.id);
    } catch {
      console.error("Error leyendo favoritos del localStorage");
      return false;
    }
  }, [vehicle.id, currentUser]);

  useEffect(() => {
    setIsFavorite(checkFavorite());
  }, [checkFavorite]);

  const toggleFavorite = () => {
    try {
      const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
      const favoritosDelUsuario = favoritosData[currentUser] || [];

      let nuevosFavoritos;
      if (isFavorite) {
        nuevosFavoritos = favoritosDelUsuario.filter((fav) => fav.id !== vehicle.id);
      } else {
        const yaExiste = favoritosDelUsuario.some((fav) => fav.id === vehicle.id);
        nuevosFavoritos = yaExiste
          ? favoritosDelUsuario
          : [...favoritosDelUsuario, vehicle];
      }

      const actualizados = { ...favoritosData, [currentUser]: nuevosFavoritos };
      localStorage.setItem("favoritos", JSON.stringify(actualizados));

      setIsFavorite(!isFavorite);

  
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch {
      console.error("Error al actualizar favoritos");
    }
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
            onClick={toggleFavorite}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.8rem",
              color: isFavorite ? "#FFD60A" : "#bbb",
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