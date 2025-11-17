import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import axios from "axios";
import { ReviewModal } from "../Reviews/ReviewModal";

export function VehicleDetail({ vehicleId, onClose }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = currentUser?.token;
  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/vehicles/${vehicleId}`,
          authConfig
        );

        if (response.data) {
          setVehicle(response.data);
          setError(null);
        } else {
          setVehicle(null);
          setError("Vehículo no encontrado");
        }
      } catch {
        setVehicle(null);
        setError("Error al cargar el vehículo");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId, token]);

  const handleAddToCart = () => {
    if (vehicle) {
      addToCart(vehicle);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) return <p>Cargando vehículo...</p>;
  if (error) return <p>{error}</p>;
  if (!vehicle) return null;

  const { manufacturer, model, seats, price, topSpeed, images } = vehicle;

  return (
    <>
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
        onClick={onClose}
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
          <button
            onClick={onClose}
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

          <h2 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
            {manufacturer} {model}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            {images?.front && (
              <img
                src={images.front}
                alt="Frontal"
                style={{ width: "100%", borderRadius: "var(--border-radius)" }}
              />
            )}
            {images?.rear && (
              <img
                src={images.rear}
                alt="Trasera"
                style={{ width: "100%", borderRadius: "var(--border-radius)" }}
              />
            )}
            {images?.side && (
              <img
                src={images.side}
                alt="Lateral"
                style={{ width: "100%", borderRadius: "var(--border-radius)" }}
              />
            )}
            {images?.frontQuarter && (
              <img
                src={images.frontQuarter}
                alt="Frontal 3/4"
                style={{ width: "100%", borderRadius: "var(--border-radius)" }}
              />
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <p>
                <strong>Fabricante:</strong> {manufacturer}
              </p>
              <p>
                <strong>Modelo:</strong> {model}
              </p>
              <p>
                <strong>Asientos:</strong> {seats}
              </p>
              <p>
                <strong>Precio:</strong> ${price.toLocaleString()}
              </p>
            </div>

            <div>
              {topSpeed && (
                <p>
                  <strong>Velocidad Máxima:</strong> {topSpeed.kmh} km/h (
                  {topSpeed.mph} mph)
                </p>
              )}
            </div>
          </div>

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
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>

            <button
              className="secondary"
              style={{
                fontSize: "1.05rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--border-radius)",
              }}
              onClick={() => setShowReviews(true)}
            >
              Ver comentarios
            </button>

            <button
              className="secondary"
              style={{
                fontSize: "1.05rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--border-radius)",
              }}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>

          {showToast && (
            <div className="toast-visible">
              ✅ {manufacturer} {model} se añadió al carrito
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        show={showReviews}
        onHide={() => setShowReviews(false)}
        vehicleId={vehicleId}
      />
    </>
  );
}
