import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/users/me/email", { email: newEmail });

      // Si el backend devuelve usuario + token
      if (response.data?.user && response.data?.token) {
        localStorage.setItem("currentUser", JSON.stringify({
          ...response.data.user,
          token: response.data.token
        }));
      } else {
        // Si solo devuelve el usuario actualizado
        localStorage.setItem("currentUser", JSON.stringify({
          ...currentUser,
          email: newEmail
        }));
      }

      setFeedback("Correo actualizado correctamente.");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el correo:", error);
      setFeedback("Hubo un error al actualizar el correo.");
    }
  };



  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Title className="mb-4 text-center">Cambiar Correo Electrónico</Card.Title>
        {feedback && <Alert variant="info">{feedback}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Nuevo Correo</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
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
