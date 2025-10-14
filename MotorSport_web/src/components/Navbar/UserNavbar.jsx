import { Navbar, Nav, Container, Button} from "react-bootstrap";
import { NavLink} from "react-router-dom";
import logo from '../layout/img/MotorSport_Logo.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ToggleButton from "../ToggleButton"
import { useNavigate } from "react-router-dom";


export default function UserNavbar() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

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
            <NavLink className="nav-link" to="/order">Pedidos</NavLink>
            <NavLink className="nav-link" to="/reviews">Reseñas</NavLink>
            <NavLink className="nav-link" to="/map">Mapa</NavLink>
            <NavLink className="nav-link" to="/favorites">Favoritos</NavLink>
            <NavLink className="nav-link" to="/support">Soporte</NavLink>
            <NavLink className="nav-link" to="/garage">Garaje</NavLink>
            
         
            <NavDropdown title="⚙️" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <ToggleButton />
              </NavDropdown.Item>

              <NavDropdown.Item>
                      <div className="text-center mt-4">
                        <Button variant="outline-danger" onClick={handleLogout}>
                          Cerrar sesión
                        </Button>
                      </div>
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
