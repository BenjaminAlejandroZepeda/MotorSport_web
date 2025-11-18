import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { PedidoCard } from "./PedidoCard";
import axios from "axios";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = currentUser?.token || "";

  useEffect(() => {
    if (!currentUser?.id || !token) return;

    const fetchOrders = async () => {
      try {
 
        const res = await axios.get(
          `http://localhost:8080/api/orders/user/${currentUser.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error al cargar órdenes:", err);
        alert(err.response?.data?.message || "No se pudieron cargar los pedidos.");
      }
    };

    fetchOrders();
  }, [currentUser?.id, token]);

  if (!currentUser) {
    return <Container className="py-4">Debes iniciar sesión para ver tus pedidos.</Container>;
  }

  return (
    <Container className="py-4">
      {orders.length === 0 ? (
        <p className="text-muted text-center">No tienes pedidos.</p>
      ) : (
        orders.map((order) => <PedidoCard key={order.id} pedido={order} />)
      )}
    </Container>
  );
}
