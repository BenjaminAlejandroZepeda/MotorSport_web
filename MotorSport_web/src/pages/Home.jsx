
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
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
        <NewsCard
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
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
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Vcz44LZMfcjJBTigJd6NrBOCAgdzA1jmsQ&s"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
      link="https://www.youtube.com/c/Hern%C3%A1nSaavedra"
    />
  </div>
</section>
      <footer className="footer mt-auto">
      <Container className="d-flex justify-content-between align-items-center flex-wrap">
        <span>© 2025 Legendary MotorSport</span>
      </Container>

      </footer>
    </div>
  );
}
