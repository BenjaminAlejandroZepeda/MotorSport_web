
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import logo from "../components/layout/img/MotorSport_Logo.png";
import ToggleButton from "../components/ToggleButton";
import NavDropdown from 'react-bootstrap/NavDropdown';
export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="home-header d-flex justify-content-between align-items-center px-4 py-3 shadow-sm position-relative">
        {/* Logo */}
        <img
          src={logo}
          alt="MotorSport"
          height="70"
          className="d-inline-block align-top"
        />

        {/* Botones */}
        <div className="d-none d-md-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary px-3">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-primary px-3">
            Registrarse
          </Link>
            <NavDropdown title="⚙️" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <ToggleButton />
              </NavDropdown.Item>
            </NavDropdown>
        </div>

      </header>

      {/* Contenido principal */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
        <h1 className="display-4 fw-bold mb-4">
          Bienvenido a <span className="text-warning">MotorSport Web</span>
        </h1>
        <p className="lead text-secondary mb-5">
          Tu plataforma para explorar y gestionar autos de alto rendimiento.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
