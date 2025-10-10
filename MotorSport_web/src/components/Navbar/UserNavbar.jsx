import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink} from "react-router-dom";
import logo from '../layout/img/MotorSport_Logo.png';

export default function UserNavbar() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  if (!currentUser || currentUser.role !== "user") return null;

  return (
    <Navbar expand="lg" className="shadow-sm mb-4 w-100">
      <Container fluid>
        <Navbar.Brand>
          <img
            src={logo}
            alt="MotorSport"
            height="60"          // ajusta la altura que quieras
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/catalog">Catálogo</NavLink>
            <NavLink className="nav-link" to="/cart">Carrito</NavLink>
            <NavLink className="nav-link" to="/orders">Pedidos</NavLink>
            <NavLink className="nav-link" to="/reviews">Reseñas</NavLink>
            <NavLink className="nav-link" to="/map">Mapa</NavLink>
            <NavLink className="nav-link" to="/search">Búsqueda</NavLink>
            <NavLink className="nav-link" to="/favorites">Favoritos</NavLink>
            <NavLink className="nav-link" to="/support">Soporte</NavLink>
            <NavLink className="nav-link" to="/garage">Garaje</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
