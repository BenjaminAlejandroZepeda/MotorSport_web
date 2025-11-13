import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../layout/img/MotorSport_Logo.png";
import ToggleSwitch from "../ToggleSwitch"; 

export default function UserNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains("dark");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!currentUser || currentUser.role !== "user") return null;

  return (
    <>
      <Navbar expand="lg" className="shadow-sm mb-4 w-100">
        <Container fluid>
          <Navbar.Brand>
            <img
              src={logo}
              alt="MotorSport"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/catalog">Catálogo</NavLink>
              <NavLink className="nav-link" to="/cart">Carrito</NavLink>
              <NavLink className="nav-link" to="/order">Pedidos</NavLink>
              <NavLink className="nav-link" to="/reviews">Reseñas</NavLink>
              <NavLink className="nav-link" to="/map">Mapa</NavLink>
              <NavLink className="nav-link" to="/favorites">Favoritos</NavLink>
              <NavLink className="nav-link" to="/support">Soporte</NavLink>
              <NavLink className="nav-link" to="/garage">Garaje</NavLink>

              <NavDropdown
                title="⚙️"
                id="user-settings-dropdown"
                align="end"
                className="settings-dropdown"
              >
                <NavDropdown.Item as="div">
                  <ToggleSwitch />
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/profile">
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}