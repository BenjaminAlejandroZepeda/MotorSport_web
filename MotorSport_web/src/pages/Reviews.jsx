import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

export default function Reviews() {
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("reseñas") || "{}");

    const lista = Object.entries(raw).flatMap(([usuarioRaw, vehiculos]) => {
        let usuario = usuarioRaw;

        try {
            const parsed = JSON.parse(usuarioRaw);
            usuario = parsed.username || usuarioRaw;
        } catch {
             console.error("Error al parsear las reseñas guardadas.");
        }

        return Object.entries(vehiculos).map(([vehiculoId, estrellas]) => ({
            usuario,
            vehiculoId,
            estrellas,
        }));
    });

    setReseñas(lista);
  }, []);

  return (
    <MainLayout>
      <h1 className="text-center">Reseñas de Usuarios</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {reseñas.map((r, index) => (
          <div key={`${r.usuario}-${r.vehiculoId}-${index}`} className="card" style={{ padding: "1rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{r.vehiculoId}</h3>
            <p><strong>Usuario:</strong> {r.usuario}</p>
            <p><strong>Calificación:</strong></p>
            <div style={{ fontSize: "1.5rem", color: "#FFD60A" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: star <= r.estrellas ? "#FFD60A" : "#ccc" }}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}