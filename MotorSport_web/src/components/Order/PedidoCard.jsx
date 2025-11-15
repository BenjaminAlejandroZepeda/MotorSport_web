import { Card, Button, Collapse } from "react-bootstrap";
import Factura from "../layout/Factura";
import { useState } from "react";
import axios from "axios";

export function PedidoCard({ pedido }) {
  const [showFactura, setShowFactura] = useState(false);
  const [factura, setFactura] = useState(null);
  const [loadingFactura, setLoadingFactura] = useState(false);

  const total = pedido.items?.reduce((sum, v) => sum + v.precioTotal, 0) || 0;

  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const token = storedUser.token || "";
  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const handleVerFactura = async () => {
    if (!token) {
      alert("Debes iniciar sesión para ver la factura.");
      return;
    }

    if (factura) {
      setShowFactura(!showFactura);
      return;
    }

    setLoadingFactura(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/facturas/orden/${pedido.id}`,
        authConfig
      );
      setFactura(res.data);
      setShowFactura(true);
    } catch (err) {
      console.error("Error al cargar la factura:", err);
      alert(err.response?.data?.message || "No se pudo cargar la factura.");
    } finally {
      setLoadingFactura(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>Pedido #{pedido.id}</Card.Title>
        <Card.Text>
          <strong>Fecha de compra:</strong> {new Date(pedido.fechaPedido).toLocaleString()} <br />
          <strong>Estado:</strong> {pedido.estado || "Pendiente"} <br />
          <strong>Total:</strong> ${total.toLocaleString()}
        </Card.Text>

        <ul>
          {pedido.items?.map((item) => (
            <li key={item.id}>
              {item.vehicle?.model || item.vehicle?.id} ({item.cantidad} x ${item.precioUnitario.toLocaleString()})
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
          <div className="mt-3">{factura && <Factura factura={factura} />}</div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
