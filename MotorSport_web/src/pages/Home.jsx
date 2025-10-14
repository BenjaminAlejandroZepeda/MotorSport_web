
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
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
          Bienvenido a <span className="text-warning">MotorSport Web</span>
        </h1>
        <p className="lead text-secondary mb-5">
          Tu plataforma para explorar y gestionar autos de alto rendimiento.
        </p>

      </main>

<section
  className="news-section"
  style={{ padding: '3rem 1rem' }} // espacio arriba y abajo
>
  <h1 className="text-center">News Legendary MotorSport</h1>
  <div className="news-list">
    <NewsCard
      title="Nueva filtración de GTA 6"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Descubren webs registradas por Rockstar que parodiarían WhatsApp, Uber y OnlyFans."
    />
    <NewsCard
      title="Rockstar lo da por hecho"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="GTA 6 será 'el mayor lanzamiento de la historia de los videojuegos' Rockstar."
    />
    <NewsCard
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
    />
  </div>
</section>

<section
  className="news-section"
  style={{ padding: '3rem 1rem' }} // espacio arriba y abajo
>
  <h1 className="text-center">News Legendary MotorSport</h1>
  <div className="news-list">
    <NewsCard
      title="Nueva filtración de GTA 6"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Descubren webs registradas por Rockstar que parodiarían WhatsApp, Uber y OnlyFans."
    />
    <NewsCard
      title="Rockstar lo da por hecho"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="GTA 6 será 'el mayor lanzamiento de la historia de los videojuegos' Rockstar."
    />
    <NewsCard
      title="GTA 6 podría no llegar a tiempo"
      imageUrl="https://media.vandalimg.com/common/140x79/20231259454.jpg"
      body="Temen que Rockstar retrase el lanzamiento otra vez y no saldría en mayo de egar a tiempo."
    />
  </div>
</section>





      <Footer />
    </div>
  );
}
