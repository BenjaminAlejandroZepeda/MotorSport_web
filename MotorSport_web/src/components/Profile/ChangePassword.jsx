import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setFeedback("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.put("/api/users/me/password", {
        currentPassword,
        newPassword,
      });

      setFeedback(response.data);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 401) {
        setFeedback("La contraseña actual es incorrecta.");
      } else if(error.response?.status === 400){
        setFeedback("La contraseña debe tener al menos 4 caracteres, intente nuevamente.");
      } else {
        setFeedback("Hubo un error al actualizar la contraseña, contacta con soporte.");
      }

    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Title className="mb-4 text-center">Cambiar Contraseña</Card.Title>
        {feedback && <Alert variant="info">{feedback}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Guardar Cambios
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
