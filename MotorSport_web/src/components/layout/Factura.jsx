import React from 'react';

const DetalleFactura = ({ detalle }) => {
  return (
    <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              <td>{item.modelo}</td>
              <td>${item.precioUnitario}</td>
              <td>{item.cantidad}</td>
              <td>${item.precioTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Factura = ({ factura }) => {
  const {
    id,
    userId,
    fechaEmision,
    montoTotal,
    metodoPago,
    tipoDocumento,
    detalle,
  } = factura;

  return (
    <div className="card" style={{ padding: '2rem', margin: '2rem auto', maxWidth: '800px' }}>
      <h2>Factura #{id}</h2>
      <p><strong>Usuario ID:</strong> {userId}</p>
      <p><strong>Fecha de Emisión:</strong> {new Date(fechaEmision).toLocaleString()}</p>
      <p><strong>Método de Pago:</strong> {metodoPago}</p>
      <p><strong>Tipo de Documento:</strong> {tipoDocumento}</p>
      <h3>Detalles</h3>
      <DetalleFactura detalle={detalle} />
      <h3 style={{ marginTop: '1rem' }}>Total: ${montoTotal}</h3>
    </div>
  );
};

export default Factura;