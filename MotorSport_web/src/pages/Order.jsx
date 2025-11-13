
import MainLayout from "../components/layout/MainLayout";
import { Container } from "react-bootstrap";
import { OrderList } from "../components/Order/OrderList";

export default function OrdersPage() {
  return (
    <MainLayout>
      <Container className="py-4">
        <h2>Mis Pedidos</h2>
        <OrderList />
      </Container>
    </MainLayout>
  );
}