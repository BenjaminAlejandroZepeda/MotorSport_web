
import { Container } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { PedidoCard } from "../components/Order/PedidoCard";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const currentUser = localStorage.getItem("currentUser") || "anonimo";

  useEffect(() => {
    const pedidosData = JSON.parse(localStorage.getItem("pedidos") || "{}");
    setPedidos(pedidosData[currentUser] || []);
  }, [currentUser]);

  const handleFinalizar = (idPedido) => {
    const pedidosData = JSON.parse(localStorage.getItem("pedidos") || "{}");
    const nuevosPedidos = (pedidosData[currentUser] || []).filter(p => p.id !== idPedido);
    pedidosData[currentUser] = nuevosPedidos;
    localStorage.setItem("pedidos", JSON.stringify(pedidosData));
    setPedidos(nuevosPedidos);
  };

  return (
    <MainLayout>
      <Container className="py-4">
        <h2>Mis Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>No tienes pedidos pendientes.</p>
        ) : (
          pedidos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} onFinalizar={handleFinalizar} />
          ))
        )}
      </Container>
    </MainLayout>
  );
}
