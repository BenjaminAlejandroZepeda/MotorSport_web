import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCartStore } from "../store/cartStore";
import VehicleStats from "../components/Cart/VehicleStats";
import MainLayout from "../components/layout/MainLayout";

export default function Cart() {
  const { cart, clearCart } = useCartStore();
  const total = cart.reduce((sum, v) => sum + v.price * v.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const currentUser = localStorage.getItem("currentUser") || "anonimo";

    const nuevaCompra = {
      id: Date.now(),
      fechaCompra: new Date().toISOString(),
      fechaEntrega: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      estado: "Por entregar",
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
      [currentUser]: [...(comprasData[currentUser] || []), nuevaCompra],
    };
    localStorage.setItem("compras", JSON.stringify(comprasActualizadas));


    const pedidosData = JSON.parse(localStorage.getItem("pedidos") || "{}");
    const pedidosActualizados = {
      ...pedidosData,
      [currentUser]: [...(pedidosData[currentUser] || []), nuevaCompra],
    };
    localStorage.setItem("pedidos", JSON.stringify(pedidosActualizados));

    clearCart();
    alert("✅ Pedido registrado correctamente.");
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
