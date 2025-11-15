import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer mt-auto">
      <Container>
        <div className="row text-center text-md-start">
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-warning mb-3">Legendary MotorSport</h5>
            <p className="small">
              Legendary MotorSport es una empresa con una vasta experiencia en autos de lujo. <br />
              Contamos con las mejores marcas del mercado.<br />
              Somos la casa de los nuevos vehículos de lujo.
            </p>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-warning mb-3">Contacto</h5>
            <p className="small mb-1">📍 Avenida Padre Hurtado Norte 1541, Vitacura, Santiago, Chile</p>
            <p className="small mb-1">📞 +56 2 3297 9829</p>
            <p className="small mb-1">📱 +56 9 7476 7968</p>
            <p className="small mb-1">📱 +56 9 9820 2319</p>
            <p className="small mb-0">✉️ LegendaryMS@Sport.com</p>
          </div>

          
          <div className="col-md-4">
            <h5 className="text-warning mb-3">Síguenos</h5>
              <div>
                <a href="/support" className="me-3">Soporte y Contacto</a>
                <a href="/about">Acerca de</a>
              </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />
        <div className="text-center small">
          <span>© 2025 Legendary MotorSport — Todos los derechos reservados.</span>
        </div>
      </Container>
    </footer>
  );
}
