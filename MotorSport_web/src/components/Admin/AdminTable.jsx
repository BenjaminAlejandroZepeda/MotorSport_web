import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import vehiclesData from "../../vehicles.json";
import AdminActionModal from "./AdminActionModal";

export default function AdminTable({ type }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const handleUpdate = (updated) => {
    console.log("Actualización recibida:", updated);
   
  };

  const renderRows = () => {
    switch (type) {
      case "vehiculos":
        const superCars = vehiclesData.super;
        return Object.entries(superCars).map(([nombre, data], index) => (
          <tr key={nombre}>
            <td>{index}</td>
            <td>{nombre}</td>
            <td>{data.model}</td>
            <td>${data.price.toLocaleString()}</td>
            <td>{data.seats}</td>
            <td>{data.topSpeed.kmh} km/h</td>
            <td>{data.acceleration}</td>
            <td>{data.braking}</td>
            <td>{data.handling}</td>
            <td>
              <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal({ name: nombre, ...data })}>
                Acciones
              </Button>
            </td>
          </tr>
        ));

      case "usuarios":
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        return users.map((user, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(user)}>
                Acciones
              </Button>
            </td>
          </tr>
        ));

      case "reseñas":
        const reseñas = JSON.parse(localStorage.getItem("reseñas") || "{}");
        return Object.entries(reseñas).map(([userRaw, vehiculos], index) => {
          const user = JSON.parse(userRaw);
          return Object.entries(vehiculos).map(([vehiculoId, estrellas], i) => (
            <tr key={`${index}-${i}`}>
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{vehiculoId}</td>
              <td>{estrellas} ★</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal({ username: user.username, vehiculoId })}>
                  Acciones
                </Button>
              </td>
            </tr>
          ));
        });

      case "pedidos":
        const pedidos = JSON.parse(localStorage.getItem("pedidos") || "{}");
        return Object.entries(pedidos).flatMap(([userRaw, lista], index) => {
          const user = JSON.parse(userRaw);
          return lista.map((pedido, i) => (
            <tr key={`${index}-${i}`}>
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{pedido.id}</td>
              <td>{new Date(pedido.fechaCompra).toLocaleDateString()}</td>
              <td>{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
              <td>-</td>
            </tr>
          ));
        });

      case "compras":
        const compras = JSON.parse(localStorage.getItem("compras") || "{}");
        return Object.entries(compras).flatMap(([userRaw, lista], index) => {
          const user = JSON.parse(userRaw);
          return lista.map((compra, i) => (
            <tr key={`${index}-${i}`}>
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{compra.id}</td>
              <td>{new Date(compra.fechaCompra).toLocaleDateString()}</td>
              <td>{new Date(compra.fechaEntrega).toLocaleDateString()}</td>
              <td>{compra.total?.toLocaleString() || "?"}</td>
              <td>{compra.estado}</td>
              <td>-</td>
            </tr>
          ));
        });

      case "favoritos":
        const favoritos = JSON.parse(localStorage.getItem("favoritos") || "{}");
        return Object.entries(favoritos).flatMap(([userRaw, lista], index) => {
          const user = JSON.parse(userRaw);
          return lista.map((v, i) => (
            <tr key={`${index}-${i}`}>
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{v.name}</td>
              <td>{v.manufacturer}</td>
              <td>${v.price.toLocaleString()}</td>
              <td>{v.seats}</td>
              <td>-</td>
            </tr>
          ));
        });

      default:
        return (
          <tr>
            <td colSpan="10">Selecciona una categoría válida.</td>
          </tr>
        );
    }
  };

  const renderHeaders = () => {
    switch (type) {
      case "vehiculos":
        return (
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Modelo ID</th>
            <th>Precio</th>
            <th>Pasajeros</th>
            <th>Velocidad</th>
            <th>Aceleración</th>
            <th>Frenado</th>
            <th>Manejo</th>
            <th>Acciones</th>
          </tr>
        );
      case "usuarios":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        );
      case "reseñas":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Vehículo</th>
            <th>Estrellas</th>
            <th>Acciones</th>
          </tr>
        );
      case "pedidos":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>ID Pedido</th>
            <th>Compra</th>
            <th>Entrega</th>
            <th>Acciones</th>
          </tr>
        );
      case "compras":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>ID Compra</th>
            <th>Compra</th>
            <th>Entrega</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        );
      case "favoritos":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Vehículo</th>
            <th>Fabricante</th>
            <th>Precio</th>
            <th>Pasajeros</th>
            <th>Acciones</th>
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>{renderHeaders()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      <AdminActionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={type}
        data={selectedData}
        onUpdate={handleUpdate}
      />
    </>
  );
}
