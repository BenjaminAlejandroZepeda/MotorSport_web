import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";

export function VehicleCard({ vehicle, isFavorite, onToggleFavorite, onViewDetails }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setFavorite(isFavorite);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/vehiculo/${vehicle.id}`);
        const reviews = response.data; 
        if (reviews && reviews.length > 0) {
          const sum = reviews.reduce((acc, r) => acc + r.puntuacion, 0);
          setAverageRating(Number((sum / reviews.length).toFixed(1))); 
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
        setAverageRating(0);
      }
    };

    fetchReviews();
  }, [isFavorite, vehicle]);

  const toggle = () => {
    setFavorite((prev) => !prev);
    onToggleFavorite(vehicle.id);
  };

  const renderStars = (rating) => {
    const fullStars = "★".repeat(Math.floor(rating));
    const halfStar = rating % 1 >= 0.5 ? "½" : "";
    const emptyStars = "☆".repeat(5 - Math.ceil(rating));
    return fullStars + halfStar + emptyStars;
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
        <h3 className="vehicle-title">
          {vehicle.name}
        </h3>

        <p style={{ marginBottom: "1rem" }}>
          <strong>Fabricante:</strong> {vehicle.manufacturer} <br />
          <strong>Precio:</strong> ${vehicle.price.toLocaleString()} <br />
          <strong>Pasajeros:</strong> {vehicle.seats} <br />
          <strong>Calificación:</strong> {averageRating} {renderStars(averageRating)}
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
