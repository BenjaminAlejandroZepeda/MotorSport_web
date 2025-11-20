import { useState } from "react";
import { Form, Button, Alert, Container, Card, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://18.233.90.202:8080/api/users/login",
        { email, password }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (!user) throw new Error("El backend no devolvió un usuario.");
        if (!token) throw new Error("Token no recibido del backend.");

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            username: user.username ?? "Usuario",
            email: user.email,
            role: user.role ?? "user",
            token: token,
          })
        );

        navigate(user.role?.toLowerCase() === "admin" ? "/admin" : "/Catalog");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status === 401) setError("Contraseña incorrecta.");
        else if (err.response.status === 404) setError("Usuario no encontrado.");
        else setError("Error al iniciar sesión.");
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-warning fw-bold">Iniciar Sesión</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-decoration-none text-warning fw-semibold">
            Regístrate aquí
          </Link>
        </p>
      </Card>
    </Container>
  );
}
