import { useState } from "react";
import { Form, Button, Alert, Container, Card, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const newUser = { username, email, password, role: "user" };

      const response = await axios.post("http://18.233.90.202:8080/api/users/register", newUser);

      if (response.status === 200) {
        setMessage("Usuario registrado con éxito. Redirigiendo al login...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      if (err.response) setError(err.response.data || "Error al registrar usuario");
      else setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-warning fw-bold">Registro</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Crea un usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={loading}>
            {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registrando...</> : "Registrarse"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </Card>
    </Container>
  );
}
