import { useEffect, useState } from "react";
import axios from "axios";

export function GarageModal({ show, onHide, vehicle, user }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle && user) {
      setRating(0);
      setComment("");
    }
  }, [vehicle, user]);

  const handleSave = async () => {
    if (!user?.id || !vehicle?.id) return;

    setLoading(true);
    try {

      const payload = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        vehicle: {
          id: vehicle.id,
          model: vehicle.model || vehicle.name,
          manufacturer: vehicle.manufacturer || vehicle.fabricante,
          price: vehicle.price ?? vehicle.precio,
          seats: vehicle.seats ?? vehicle.pasajeros,
        },
        puntuacion: rating,
        comentario: comment || "",
      };

      await axios.post(
        "http://localhost:8080/api/reviews",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setRating(0);
      setComment("");
      onHide();
    } catch (err) {
      console.error("Error al guardar la reseña:", err);
      alert(
        err.response?.data?.message || "No se pudo guardar la reseña"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show || !vehicle) return null;

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
          maxWidth: "500px",
          padding: "1.5rem",
          position: "relative",
        }}
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

        <h2 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
          {vehicle.model || vehicle.name}
        </h2>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                color: star <= rating ? "#FFD60A" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribe un comentario (opcional)"
          className="review-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <button
          className="primary"
          style={{ width: "100%", padding: "0.75rem", marginBottom: "0.5rem" }}
          onClick={handleSave}
          disabled={loading || rating === 0}
        >
          {loading ? "Guardando..." : "Guardar Reseña"}
        </button>

        <button
          className="secondary"
          style={{ width: "100%", padding: "0.75rem" }}
          onClick={onHide}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
