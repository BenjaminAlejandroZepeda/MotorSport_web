import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import logo from "../layout/img/MotorSport_Logo.png";
import ToggleButton from "../ToggleButton"; // 👈 importa el componente

export default function AdminHeader({ onLogout, setTipo }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "admin") return null;

  return (
    <Navbar expand="lg" className="shadow-sm mb-4 w-100" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <img
            src={logo}
            alt="MotorSport"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-offcanvas" />
        <Navbar.Offcanvas
          id="admin-offcanvas"
          aria-labelledby="admin-offcanvas-label"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="admin-offcanvas-label">
              Panel de Administración
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="d-flex flex-wrap gap-3 justify-content-center">
              <Button variant="outline-light" onClick={() => setTipo("vehiculos")}>
                Ver vehículos
              </Button>
              <Button variant="outline-light" onClick={() => setTipo("usuarios")}>
                Ver usuarios
              </Button>
              <Button variant="outline-light" onClick={() => setTipo("reseñas")}>
                Ver reseñas
              </Button>
              <Button variant="outline-light" onClick={() => setTipo("compras")}>
                Ver compras
              </Button>
              <Button variant="outline-light" onClick={() => setTipo("pedidos")}>
                Ver pedidos
              </Button>
              <Button variant="outline-light" onClick={() => setTipo("favoritos")}>
                Ver favoritos
              </Button>

              <hr className="border-light" />

              <ToggleButton />
              <Button variant="warning" onClick={onLogout}>
                Cerrar sesión
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
