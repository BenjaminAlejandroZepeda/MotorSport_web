
import React, { useEffect, useState } from "react";
import axios from "axios";

export function ReviewModal({ show, onHide, vehicleId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = currentUser?.token;
  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    if (show && vehicleId && token) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/reviews/vehiculo/${vehicleId}`, authConfig)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error al obtener reseñas:", err))
        .finally(() => setLoading(false));
    }
  }, [show, vehicleId, token]);

  if (!show) return null;

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
        style={{ width: "90%", maxWidth: "500px", padding: "1.5rem", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onHide}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2>Comentarios</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : reviews.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          <ul style={{ maxHeight: "400px", overflowY: "auto", padding: 0 }}>
            {reviews.map((r) => (
              <li key={r.id} style={{ marginBottom: "1rem", listStyle: "none" }}>
                <strong>{r.user.username}:</strong> {r.comentario} <br />
                <span>⭐ {r.puntuacion}</span> — {new Date(r.fecha).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
