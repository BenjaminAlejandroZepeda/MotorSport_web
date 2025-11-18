import { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "../../axiosConfig";

export default function AdminActionModal({ show, onHide, type, data, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
  if (data) {
    const { password, ...rest } = data;
    setFormData(rest);
  }
}, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (type === "usuarios") {
        await axios.put(`/api/users/${data.id}`, {
          ...data,
          role: formData.role || data.role,
          password: formData.password?.trim() || undefined, 
        });
      }

      if (type === "vehiculos") {
        await axios.put(`/api/vehicles/${data.id}`, {
          ...data,
          price: parseInt(formData.price),
        });
      }


      onUpdate(formData);
      onHide();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (type === "usuarios") {
        await axios.delete(`/api/users/${data.id}`);
      }

      if (type === "reseñas") {
        await axios.delete(`/api/reviews/${data.id}`);
      }

      if (type === "vehiculos") {
        await axios.delete(`/api/vehicles/${data.id}`);
      }

      if (type === "favoritos") {
        await axios.delete(`/api/favorites/usuario/${data.userId}/vehiculo/${data.vehicleId}`);
      }

      if (type === "pedidos") {
        await axios.delete(`/api/pedidos/${data.id}`);
      }

      if (type === "compras") {
        await axios.delete(`/api/facturas/${data.id}`);
      }



      onUpdate({ delete: true });
      onHide();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const renderContent = () => {
    if (!data) return <p>Cargando datos...</p>;

    switch (type) {
      case "usuarios":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña nueva para <strong>{data.username}</strong></Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="role" value={formData.role || "user"} onChange={handleChange}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar usuario
            </Button>
          </>
        );

      case "vehiculos":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Modificar precio de <strong>{data.model}</strong></Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar vehículo
            </Button>
          </>
        );
      
      case "reseñas":
        return (
          <>
            <p>
              ¿Deseas eliminar la reseña de <strong>{data.usuario?.username}</strong> sobre el vehículo <strong>{data.vehiculo?.id}</strong>?
            </p>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar reseña
            </Button>
          </>
        );


      case "favoritos":
        return (
          <>
            <p>
              ¿Deseas eliminar <strong>{data.vehicleModel}</strong> de los favoritos de <strong>{data.username}</strong>?
            </p>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar favorito
            </Button>
          </>
        );

      case "pedidos":
        return (
          <>
            <p>
              ¿Deseas eliminar el pedido de <strong>{data.username}</strong> para el vehículo <strong>{data.vehicleModel}</strong>?
            </p>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar pedido
            </Button>
          </>
        );

      case "compras":
        return (
          <>
            <p>
              ¿Deseas eliminar la factura <strong>#{data?.id}</strong> emitida por el usuario <strong>{data?.userId}</strong>?
            </p>

            {Array.isArray(data.detalle) && data.detalle.length > 0 && (
              <Table striped bordered size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.detalle.map((item, i) => (
                    <tr key={i}>
                      <td>{item.modelo}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precioTotal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Eliminar factura
            </Button>
          </>
        );



      default:
        return <p>Sin acciones disponibles para este tipo.</p>;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Acciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderContent()}</Modal.Body>
      {["vehiculos", "usuarios"].includes(type) && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
