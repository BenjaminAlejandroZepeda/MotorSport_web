
import { useEffect, useState } from "react";
import { PedidoCard } from "./PedidoCard";

interface Order {
  id: string;
  [key: string]: any; 
}

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const currentUser = localStorage.getItem("currentUser") || "anonimo";

  useEffect(() => {
    const ordersData = JSON.parse(localStorage.getItem("pedidos") || "{}");
    setOrders(ordersData[currentUser] || []);
  }, [currentUser]);

  const handleComplete = (orderId: string) => {
    const ordersData = JSON.parse(localStorage.getItem("pedidos") || "{}");
    const updatedOrders = (ordersData[currentUser] || []).filter(
      (order: Order) => order.id !== orderId
    );
    ordersData[currentUser] = updatedOrders;
    localStorage.setItem("pedidos", JSON.stringify(ordersData));
    setOrders(updatedOrders);
  };

  if (orders.length === 0) {
    return <p>No tienes pedidos.</p>;
  }

  return (
    <>
      {orders.map((order) => (
        <PedidoCard key={order.id} pedido={order} onFinalizar={handleComplete} />
      ))}
    </>
  );
}