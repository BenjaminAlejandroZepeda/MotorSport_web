import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow text-center" style={{ maxWidth: "400px" }}>
        <h3>Bienvenido, {user?.username} 👋</h3>
        <p className="text-muted">Rol: {user?.role}</p>
        <Button variant="warning" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Card>
    </Container>
  );
}
