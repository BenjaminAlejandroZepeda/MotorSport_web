import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
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

  const total = cart.reduce((sum, v) => sum + v.price * v.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      
      const authConfig = {
        auth: {
          username: "benja",
          password: "1234",
        },
      };

      
      const orderPayload = {
        userId: 1, 
        fechaPedido: new Date().toISOString(),
        estado: "pendiente",
        direccionEnvio: "Dirección de prueba",
        items: cart.map((v) => ({
          vehicle: { id: v.id },
          cantidad: v.quantity,
        })),
      };

      
      const orderRes = await axios.post(
        "http://localhost:8080/api/orders",
        orderPayload,
        authConfig
      );
      const order = orderRes.data;

     
      const facturaRes = await axios.post(
        `http://localhost:8080/api/facturas/generar/${order.id}`,
        null,
        {
          ...authConfig,
          params: { metodoPago, tipoDocumento },
        }
      );

      setFactura(facturaRes.data);


      clearCart();
    } catch (err) {
      console.error("Error al generar la factura:", err);
      setError("No se pudo generar la factura. Intenta nuevamente.");
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
              <h4>Total: ${total.toLocaleString()}</h4>

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
