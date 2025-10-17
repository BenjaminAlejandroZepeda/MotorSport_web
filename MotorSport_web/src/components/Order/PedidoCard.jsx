
import { Card, Button } from "react-bootstrap";

export function PedidoCard({ pedido, onFinalizar }) {
  if (!pedido) return null;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>Pedido #{pedido.id}</Card.Title>
        <Card.Text>
          <strong>Fecha de compra:</strong> {new Date(pedido.fechaCompra).toLocaleDateString()} <br />
          <strong>Fecha estimada de entrega:</strong> {new Date(pedido.fechaEntrega).toLocaleDateString()} <br />
          <strong>Estado:</strong> {pedido.estado} <br />
          <strong>Total:</strong> ${pedido.total.toLocaleString()}
        </Card.Text>
        <ul>
          {pedido.vehiculos.map((v) => (
            <li key={v.id}>{v.nombre} ({v.cantidad} x ${v.precio.toLocaleString()})</li>
          ))}
        </ul>
        <Button variant="success" onClick={() => onFinalizar(pedido.id)}>
          Marcar como recibido
        </Button>
      </Card.Body>
    </Card>
  );
}
