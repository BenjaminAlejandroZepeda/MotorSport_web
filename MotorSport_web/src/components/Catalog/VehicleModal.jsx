import { Modal, Button, Row, Col, Image } from "react-bootstrap";

export function VehicleModal({ show, onHide, vehicle, onAddToCart }) {
  if (!vehicle) return null;

  const {
    name,
    manufacturer,
    model,
    seats,
    price,
    topSpeed,
    speed,
    acceleration,
    braking,
    handling,
    images
  } = vehicle;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col xs={6} md={4}>
            <Image src={images.front} fluid rounded />
          </Col>
          <Col xs={6} md={4}>
            <Image src={images.rear} fluid rounded />
          </Col>
          <Col xs={12} md={4}>
            <Image src={images.side} fluid rounded />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <p><strong>Fabricante:</strong> {manufacturer}</p>
            <p><strong>Modelo:</strong> {model}</p>
            <p><strong>Pasajeros:</strong> {seats}</p>
            <p><strong>Precio:</strong> ${price.toLocaleString()}</p>
          </Col>
          <Col md={6}>
            <p><strong>Velocidad Máxima:</strong> {topSpeed.kmh} km/h ({topSpeed.mph} mph)</p>
            <p><strong>Aceleración:</strong> {acceleration}</p>
            <p><strong>Frenado:</strong> {braking}</p>
            <p><strong>Manejo:</strong> {handling}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={() => onAddToCart(vehicle)}>
          Añadir al carrito
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
