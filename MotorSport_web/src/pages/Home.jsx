
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../components/layout/img/MotorSport_Logo.png";
import ToggleButton from "../components/ToggleButton";
import NavDropdown from 'react-bootstrap/NavDropdown';
import NewsCard from "../components/layout/NewsCard";
export default function Home() {
  return (
    <div className="page-container">
     
      <header className="home-header d-flex justify-content-between align-items-center px-4 py-3 shadow-sm position-relative mb-4">

        <img
          src={logo}
          alt="MotorSport"
          height="70"
          className="d-inline-block align-top"
        />

        <div className="d-flex flex-column flex-md-row gap-2">
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


      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
        <h1 className="display-4 fw-bold mb-4">
          Bienvenido a <span className="text-warning"> Legendary MotorSport</span>
        </h1>
        <p className="lead text-secondary mb-5">
          Tu plataforma para explorar y gestionar autos de alto rendimiento.
        </p>

      </main>

<section
  className="news-section"
  style={{ padding: '3rem 1rem' }} 
>
  <h1 className="text-center">News Legendary MotorSport</h1>
  <div className="news-list">
    <NewsCard
      title="LLega el x80 proto"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cxeyHcqVEl5tqICcUdChUKhNGOT6nMYZfQ&s"
      body="Descubren webs registradas por Rockstar que parodiarían WhatsApp, Uber y OnlyFans."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
    <NewsCard
      title="Próximamente nuevo catálogo"
      imageUrl="https://img.freepik.com/vector-gratis/proximamente-plantilla-fondo-diseno-estilo-semitono_1017-27274.jpg?semt=ais_hybrid&w=740&q=80"
      body="GTA 6 será 'el mayor lanzamiento de la historia de los videojuegos' Rockstar."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
    <NewsCard
      title="Continúa la polémica"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Tras los despidos en el equipo de GTA 6, Rockstar se enfrenta a una reclamación legal"
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
        <NewsCard
      title="Seis veces más potente que Steam Deck"
      imageUrl="https://media.vandal.net/i/150x100/11-2025/12/2025111220301328_1.jpg"
      body="Valve confirma las especificaciones técnicas de su nueva Steam Machine"
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
    
  </div>
  
</section>

<section
  className="news-section"
  style={{ padding: '3rem 1rem' }} 
>
  <h1 className="text-center">Lo Ultimo en Legendary MotorSport</h1>
  <div className="news-list">
    <NewsCard
      title="Nueva filtración de GTA 6"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdItble5fXIxc_riuGfMTTUGMPk5y02uEwBg&s"
      body="Descubren webs registradas por Rockstar que parodiarían WhatsApp, Uber y OnlyFans."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
    <NewsCard
      title="Rockstar lo da por hecho"
      imageUrl="https://yt3.googleusercontent.com/qEoab5niOODApvXsknPU2GjZQ584CPEgVi7RFXf7ZDt7qY31f82PHG85RZS0QmosA40qpn7B-MI=s900-c-k-c0x00ffffff-no-rj"
      body="GTA 6 será 'el mayor lanzamiento de la historia de los videojuegos' Rockstar."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
    <NewsCard
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Vcz44LZMfcjJBTigJd6NrBOCAgdzA1jmsQ&s"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
        <NewsCard
      title="Steam está regalando 2 videojuegos para PC"
      imageUrl="https://media.vandal.net/i/135x90/11-2025/11/202511118255072_1.jpg"
      body="te los quedas gratis para siempre si los reclamas a tiempo"
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
  </div>
</section>
<footer className="footer bg-dark text-light mt-auto py-5">
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
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
          <a href="https://www.youtube.com/c/Hern%C3%A1nSaavedra" className="text-light fs-4">Youtube<i className="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>

    <hr className="border-secondary my-4" />
    <div className="text-center small">
      <span>© 2025 Legendary MotorSport — Todos los derechos reservados.</span>
    </div>
  </Container>
</footer>

    </div>
  );
}
