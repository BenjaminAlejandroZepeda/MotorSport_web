export function GarageCard({ vehicle, onViewDetails }) {
  return (
    <div className="card" style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
      <img
        src={vehicle.images?.frontQuarter || "/placeholder.png"}
        alt={vehicle.nombre}
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
          {vehicle.nombre}
        </h3>
        <p style={{ marginBottom: "1rem" }}>
          <strong>Fabricante:</strong> {vehicle.fabricante} <br />
          <strong>Precio:</strong> ${vehicle.precio?.toLocaleString() || "No disponible"} <br />
          <strong>Pasajeros:</strong> {vehicle.seats}
        </p>

        <button className="primary" style={{ padding: "0.5rem 1rem" }} onClick={onViewDetails}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}