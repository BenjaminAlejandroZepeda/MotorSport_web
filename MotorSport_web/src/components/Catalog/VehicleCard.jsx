import { Card, Button } from "react-bootstrap";


export function VehicleCard({ vehicle, onViewDetails}) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={vehicle.images.frontQuarter}
        alt={vehicle.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="text-capitalize">{vehicle.name}</Card.Title>
        <Card.Text>
          <strong>Fabricante:</strong> {vehicle.manufacturer} <br />
          <strong>Precio:</strong> ${vehicle.price.toLocaleString()} <br />
          <strong>Pasajeros:</strong> {vehicle.seats}
        </Card.Text>
        <Button variant="primary" onClick={onViewDetails}>
            Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}
