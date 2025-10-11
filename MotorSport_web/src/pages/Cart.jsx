import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCartStore } from "../store/cartStore";
import VehicleStats from "../components/Cart/VehicleStats";
import MainLayout from "../components/layout/MainLayout";

export default function Cart() {
  const { cart } = useCartStore();
  const total = cart.reduce((sum, v) => sum + v.price * v.quantity, 0);

  return (
        <MainLayout>
                <Container className="py-4">
      <h2>Carrito de Compras</h2>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            cart.map((vehicle) => <VehicleStats key={vehicle.id} vehicle={vehicle} />)
          )}
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4>Total: ${total.toLocaleString()}</h4>
            <Button variant="success" disabled={cart.length === 0}>
              Pagar
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
        </MainLayout>
  );
}
