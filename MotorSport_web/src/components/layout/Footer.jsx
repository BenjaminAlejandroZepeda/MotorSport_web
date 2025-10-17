import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer mt-auto">
      <Container className="d-flex justify-content-between align-items-center flex-wrap">
        <span>© 2025 MotorSport</span>
        <div>
          <a href="/support" className="me-3">Soporte y Contacto</a>
          <a href="/about">Acerca de</a>
        </div>
      </Container>
    </footer>
  );
}
