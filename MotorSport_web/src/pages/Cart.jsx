import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCartStore } from "../store/cartStore";
import VehicleStats from "../components/Cart/VehicleStats";
import MainLayout from "../components/layout/MainLayout";


export default function Cart() {
  const { cart } = useCartStore();
  const total = cart.reduce((sum, v) => sum + v.price * v.quantity, 0);
  const handleCheckout = () => {
  const currentUser = localStorage.getItem("currentUser") || "anonimo";

  const nuevaCompra = {
    fecha: new Date().toISOString(),
    total,
    vehiculos: cart.map((v) => ({
      id: v.id,
      nombre: v.name,
      modelo: v.model,
      fabricante: v.manufacturer,
      cantidad: v.quantity,
      precio: v.price,
      precioTotal: v.price * v.quantity,
    })),
  };

  const comprasData = JSON.parse(localStorage.getItem("compras") || "{}");

  const comprasActualizadas = {
    ...comprasData,
    [currentUser]: [
      ...(comprasData[currentUser] || []),
      nuevaCompra
    ]
  };

  localStorage.setItem("compras", JSON.stringify(comprasActualizadas));

  alert("✅ Compra registrada correctamente.");
};




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
            <Button
              variant="success"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Pagar
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
        </MainLayout>
  );
}