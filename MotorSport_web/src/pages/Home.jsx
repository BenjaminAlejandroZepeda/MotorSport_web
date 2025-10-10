import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="mb-4">🏎️ Bienvenido a MotorSport Web</h1>
      <p className="mb-5">Tu plataforma para explorar y gestionar autos de alto rendimiento.</p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-secondary">Registrarse</Link>
      </div>
    </div>
  );
}
