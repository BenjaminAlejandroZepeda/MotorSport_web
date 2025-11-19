import { Card, Button, Row, Col, Image, Form } from "react-bootstrap";
import { useCartStore } from "../../store/cartStore";


export default function VehicleStats({ vehicle }) {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col xs={4} md={3}>
            <Image src={vehicle.images.frontQuarter} fluid rounded />
          </Col>
          <Col xs={8} md={6}>
            <Card.Title>{vehicle.name}</Card.Title>
            <Card.Text>
              <strong>Fabricante:</strong> {vehicle.manufacturer} <br />
              <strong>Modelo:</strong> {vehicle.model} <br />
              <strong>Pasajeros:</strong> {vehicle.seats} <br />
              <strong>Precio:</strong> ${vehicle.price.toLocaleString()} <br />
            </Card.Text>

            <Form.Group controlId={`quantity-${vehicle.id}`} className="mb-2">
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control
                type="number"
                value={vehicle.quantity}
                min={1}
                max={10}
                onChange={(e) => updateQuantity(vehicle.id, Number(e.target.value))}
                style={{ width: "80px" }}
              />
            </Form.Group>

            <Button variant="danger" onClick={() => removeFromCart(vehicle.id)}>
              Eliminar
            </Button>
          </Col>
          <Col xs={12} md={3} className="d-flex align-items-center justify-content-end">
            <h5 className="vehicle-total">
              ${ (vehicle.price * vehicle.quantity).toLocaleString() }
            </h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
