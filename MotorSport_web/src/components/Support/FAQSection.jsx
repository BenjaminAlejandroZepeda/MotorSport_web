import React, { useState } from "react";

const faqs = [
  { q: "¿Cómo restablezco mi contraseña?", a: "Ve a Configuración > Cuenta y selecciona 'Restablecer contraseña'." },
  { q: "¿Dónde puedo ver mis compras?", a: "Puedes verlas en tu garaje, dentro del apartado 'Garaje'." },
  { q: "¿Qué hago si la app no carga?", a: "Prueba recargar la página o borrar la caché del navegador." },
];

export default function FAQSection() {
  const [active, setActive] = useState(null);

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2>Preguntas Frecuentes (FAQ)</h2>
      {faqs.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <button
            className="secondary"
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.75rem",
              fontWeight: "600",
              border: "none",
            }}
            onClick={() => setActive(active === index ? null : index)}
          >
            {item.q}
          </button>
          {active === index && (
            <p style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
