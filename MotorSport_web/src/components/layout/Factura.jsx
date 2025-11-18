import React from "react";

const DetalleFactura = ({ detalle }) => (
  <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID Vehículo</th>
          <th>Modelo</th>
          <th>Precio Unitario</th>
          <th>Cantidad</th>
          <th>Precio Total</th>
        </tr>
      </thead>
      <tbody>
        {detalle.map((item, index) => (
          <tr key={index}>
            <td>{item.vehicleId}</td>
            <td>{item.modelo || "Sin modelo"}</td>
            <td>${item.precioUnitario?.toLocaleString()}</td>
            <td>{item.cantidad}</td>
            <td>${item.precioTotal?.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Factura = ({ factura }) => {
  const {
    id,
    fechaEmision,
    montoTotal,
    metodoPago,
    tipoDocumento,
    detalle,
  } = factura;

 
  let nombreUsuario = "Usuario sin nombre";
  try {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      nombreUsuario =
        storedUser.username ||
        storedUser.email ||
        storedUser.name ||
        "Usuario sin nombre";
    }
  } catch (e) {
    console.warn("No se pudo leer el usuario del localStorage:", e);
  }

  return (
    <div
      className="card"
      style={{ padding: "2rem", margin: "2rem auto", maxWidth: "800px" }}
    >
      <h2>Factura #{id}</h2>
      <p>
        <strong>Nombre:</strong> {nombreUsuario}
      </p>
      <p>
        <strong>Fecha de Emisión:</strong>{" "}
        {new Date(fechaEmision).toLocaleString()}
      </p>
      <p>
        <strong>Método de Pago:</strong> {metodoPago}
      </p>
      <p>
        <strong>Tipo de Documento:</strong> {tipoDocumento}
      </p>

      <h3>Detalles</h3>
      <DetalleFactura detalle={detalle || []} />

      <h3 style={{ marginTop: "1rem" }}>
        Total: ${montoTotal?.toLocaleString() || 0}
      </h3>
    </div>
  );
};

export default Factura;
