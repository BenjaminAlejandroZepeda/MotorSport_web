import { Card, Button, Collapse } from "react-bootstrap";
import Factura from "../layout/Factura";
import { useState } from "react";
import axios from "axios";

export function PedidoCard({ pedido }) {
  const [showFactura, setShowFactura] = useState(false);
  const [factura, setFactura] = useState(null);
  const [loadingFactura, setLoadingFactura] = useState(false);

  const total = pedido.items
    ? pedido.items.reduce((sum, v) => sum + v.precioTotal, 0)
    : 0;

  const username = "benja";
  const password = "1234";
  const basicAuth = "Basic " + btoa(`${username}:${password}`);

  const handleVerFactura = async () => {
    if (factura) {
      setShowFactura(!showFactura);
      return;
    }

    setLoadingFactura(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/facturas/orden/${pedido.id}`,
        { headers: { Authorization: basicAuth } }
      );
      setFactura(res.data);
      setShowFactura(true);
    } catch (err) {
      console.error("Error al cargar la factura:", err);
      alert("No se pudo cargar la factura.");
    } finally {
      setLoadingFactura(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>Pedido #{pedido.id}</Card.Title>
        <Card.Text>
          <strong>Fecha de compra:</strong>{" "}
          {new Date(pedido.fechaPedido).toLocaleString()} <br />
          <strong>Estado:</strong> {pedido.estado || "Pendiente"} <br />
          <strong>Total:</strong> ${total.toLocaleString()}
        </Card.Text>

        <ul>
          {pedido.items?.map((v) => (
            <li key={v.vehicleId}>
              {v.modelo || v.vehicleId} ({v.cantidad} x ${v.precioUnitario.toLocaleString()})
            </li>
          ))}
        </ul>

        <Button variant="info" onClick={handleVerFactura}>
          {loadingFactura
            ? "Cargando..."
            : showFactura
            ? "Ocultar Factura"
            : "Ver Factura"}
        </Button>

        <Collapse in={showFactura}>
          <div className="mt-3">
            {factura && <Factura factura={factura} />}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
