import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function Catalog() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <MainLayout>
      <Container className="text-center">
        <h1>Catálogo de Vehículos</h1>
        <p className="text-muted">Bienvenido al catálogo principal de autos.</p>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Container>
    </MainLayout>
  );
}
