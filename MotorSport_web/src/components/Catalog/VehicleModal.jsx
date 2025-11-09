import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";

export function VehicleModal({ show, onHide, vehicle }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [showToast, setShowToast] = useState(false);

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

  const handleAddToCart = () => {
    addToCart(vehicle);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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

        <h2 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
          {name}
        </h2>

       
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <img
            src={images.front}
            alt={`${name} frente`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
          <img
            src={images.rear}
            alt={`${name} trasera`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
          <img
            src={images.side}
            alt={`${name} lateral`}
            style={{ width: "100%", borderRadius: "var(--border-radius)" }}
          />
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
            <p><strong>Fabricante:</strong> {manufacturer}</p>
            <p><strong>Modelo:</strong> {model}</p>
            <p><strong>Pasajeros:</strong> {seats}</p>
            <p><strong>Precio:</strong> ${price.toLocaleString()}</p>
          </div>
          <div>
            <p><strong>Velocidad Máxima:</strong> {topSpeed.kmh} km/h ({topSpeed.mph} mph)</p>
            <p><strong>Aceleración:</strong> {acceleration}</p>
            <p><strong>Frenado:</strong> {braking}</p>
            <p><strong>Manejo:</strong> {handling}</p>
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
            onClick={onHide}
          >
            Cerrar
          </button>
        </div>

        
        {showToast && (
          <div className="toast-visible">
            ✅ {name} se añadió al carrito
          </div>
        )}
      </div>
    </div>
  );
}
