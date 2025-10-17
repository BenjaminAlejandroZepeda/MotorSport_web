import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminActionModal({ show, onHide, type, data, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (type === "vehiculos") {
      const vehicles = JSON.parse(localStorage.getItem("vehicles") || "{}");
      if (vehicles.super && vehicles.super[data.name]) {
        vehicles.super[data.name].price = parseInt(formData.price);
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
      }
    }

    if (type === "usuarios") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updated = users.map((u) =>
        u.username === data.username
          ? {
              ...u,
              password: formData.password || u.password,
              role: formData.role || u.role,
            }
          : u
      );
      localStorage.setItem("users", JSON.stringify(updated));
    }

    onUpdate(formData);
    onHide();
  };

  const handleDelete = () => {
    if (type === "usuarios") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updated = users.filter((u) => u.username !== data.username);
      localStorage.setItem("users", JSON.stringify(updated));
    }

    if (type === "reseñas") {
      const reseñas = JSON.parse(localStorage.getItem("reseñas") || "{}");
      const userKey = Object.keys(reseñas).find((key) => {
        try {
          const parsed = JSON.parse(key);
          return parsed.username === data.username;
        } catch {
          return false;
        }
      });

      if (userKey && reseñas[userKey]) {
        delete reseñas[userKey][data.vehiculoId];
        localStorage.setItem("reseñas", JSON.stringify(reseñas));
      }
    }

    onUpdate({ delete: true });
    onHide();
  };

  const renderContent = () => {
    if (!data) return <p>Cargando datos...</p>;

    switch (type) {
      case "vehiculos":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Modificar precio de <strong>{data.name}</strong></Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );

      case "usuarios":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña nueva para <strong>{data.username}</strong></Form.Label>
              <Form.Control
                type="text"
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

      case "reseñas":
        return (
          <>
            <p>
              ¿Deseas eliminar la reseña de <strong>{data.username}</strong> sobre el vehículo <strong>{data.vehiculoId}</strong>?
            </p>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar reseña
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
