import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig"; 
import { useCartStore } from "../store/cartStore";
import VehicleStats from "../components/Cart/VehicleStats";
import MainLayout from "../components/layout/MainLayout";
import Factura from "../components/layout/Factura";

export default function Cart() {
  const { cart, clearCart } = useCartStore();
  const [factura, setFactura] = useState(null);
  const [metodoPago, setMetodoPago] = useState("Tarjeta de Crédito");
  const [tipoDocumento, setTipoDocumento] = useState("Factura Electrónica");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const total = cart.reduce((sum, v) => sum + v.price * v.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCheckout = async () => {
    if (!currentUser?.id || !currentUser?.token) {
      setError("Debes iniciar sesión para realizar el pago.");
      return;
    }

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        userId: currentUser.id,
        fechaPedido: new Date().toISOString(),
        estado: "pendiente",
        direccionEnvio: "Dirección de prueba",
        items: cart.map((v) => ({
          vehicle: { id: v.id },
          cantidad: v.quantity,
        })),
      };

      const orderRes = await axios.post("/api/orders", orderPayload);
      const order = orderRes.data;

      const facturaRes = await axios.post(
        `/api/facturas/generar/${order.id}`,
        null,
        {
          params: { metodoPago, tipoDocumento },
        }
      );
      const facturaGenerada = facturaRes.data;

      for (const item of cart) {
        await axios.post("/api/garage/add", {
          userId: currentUser.id,
          vehicleId: item.id,
          cantidad: item.quantity,
        });
      }

      setFactura(facturaGenerada);
      clearCart();
    } catch (err) {
      console.error("Error en el proceso del pago:", err);
      setError(
        err.response?.data?.message ||
          "No se pudo completar la operación. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  if (factura) {
    return (
      <MainLayout>
        <Container className="py-4">
          <Factura factura={factura} />
          <div className="text-center mt-4">
            <Button variant="secondary" onClick={() => setFactura(null)}>
              Volver al carrito
            </Button>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-4">
        <h2 className="mb-4 text-center">Carrito de Compras</h2>

        {error && <p className="text-danger text-center mb-3">{error}</p>}

        <Row>
          <Col md={8}>
            {cart.length === 0 ? (
              <p className="text-muted">Tu carrito está vacío.</p>
            ) : (
              cart.map((vehicle) => (
                <VehicleStats key={vehicle.id} vehicle={vehicle} />
              ))
            )}
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h4 className="total-text">Total: ${total.toLocaleString()}</h4>

              <Form.Group className="mt-3">
                <Form.Label>Método de Pago</Form.Label>
                <Form.Select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option>Tarjeta de Crédito</option>
                  <option>Tarjeta de Débito</option>
                  <option>Transferencia Bancaria</option>
                  <option>PayPal</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Select
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option>Factura Electrónica</option>
                  <option>Boleta Electrónica</option>
                  <option>Nota de Venta</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="success"
                className="mt-3 w-100"
                disabled={cart.length === 0 || loading}
                onClick={handleCheckout}
              >
                {loading ? "Procesando..." : "Pagar"}
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}