import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { PedidoCard } from "./PedidoCard";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : { id: 1 };

  const username = "benja";
  const password = "1234";
  const basicAuth = "Basic " + btoa(`${username}:${password}`);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resOrders = await fetch(
          `http://localhost:8080/api/orders/user/${currentUser.id}`,
          { headers: { Authorization: basicAuth } }
        );
        const dataOrders = await resOrders.json();
        setOrders(dataOrders);
      } catch (err) {
        console.error("Error al cargar órdenes:", err);
        alert("No se pudieron cargar los pedidos.");
      }
    };
    fetchOrders();
  }, [currentUser.id]);

  return (
    <Container className="py-4">
      {orders.length === 0 ? (
        <p className="text-muted text-center">No tienes pedidos.</p>
      ) : (
        orders.map((order) => (
          <PedidoCard key={order.id} pedido={order} />
        ))
      )}
    </Container>
  );
}
