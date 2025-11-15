import { Card, Button } from "react-bootstrap";

export function GarageCard({ vehicle, onViewDetails }) {
  if (!vehicle) return null;

  const name =
    vehicle.model || vehicle.nombre || vehicle.name || "Vehículo";
  const manufacturer =
    vehicle.manufacturer || vehicle.fabricante || "Desconocido";
  const price = vehicle.price ?? vehicle.precio ?? null;
  const seats = vehicle.seats ?? vehicle.pasajeros ?? "—";

  const image =
    vehicle.images?.frontQuarter ||
    vehicle.images?.front ||
    vehicle.images?.main ||
    "/placeholder.png";

  return (
    <Card className="mb-4 shadow-sm garage-card">
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        className="garage-card-img"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body className="garage-card-body">
        <Card.Title className="text-capitalize garage-card-title">
          {name}
        </Card.Title>

        <Card.Text>
          <strong>Fabricante:</strong> {manufacturer} <br />
          <strong>Precio:</strong>{" "}
          {price !== null ? `$${Number(price).toLocaleString()}` : "No disponible"} <br />
          <strong>Pasajeros:</strong> {seats}
        </Card.Text>

        <Button
          variant="warning"
          className="primary"
          onClick={() => onViewDetails(vehicle)}
        >
          Ver detalles
        </Button>

      </Card.Body>
    </Card>
  );
}
