import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";

export default function AdminPanel() {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.username}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center mt-4">
        <Button variant="warning" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </Container>
  );
}
