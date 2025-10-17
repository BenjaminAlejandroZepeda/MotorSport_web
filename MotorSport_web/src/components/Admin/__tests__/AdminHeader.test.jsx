import { render, screen } from "@testing-library/react";
import AdminHeader from "../AdminHeader"; // ← ajusta el path según tu estructura

test("no renderiza si el usuario no es admin", () => {
  localStorage.setItem("currentUser", JSON.stringify({ role: "user" }));
  render(<AdminHeader onLogout={() => {}} />);
  expect(screen.queryByText(/Panel de Administración/i)).not.toBeInTheDocument();
});

test("renderiza el header si el usuario es admin", () => {
  localStorage.setItem("currentUser", JSON.stringify({ role: "admin" }));
  render(<AdminHeader onLogout={() => {}} />);
  expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();
});

test("ejecuta onLogout al hacer clic en cerrar sesión", () => {
  localStorage.setItem("currentUser", JSON.stringify({ role: "admin" }));
  const mockLogout = vi.fn();
  render(<AdminHeader onLogout={mockLogout} />);
  screen.getByText(/Cerrar sesión/i).click();
  expect(mockLogout).toHaveBeenCalled();
});

test("muestra botones de navegación en el offcanvas", () => {
  localStorage.setItem("currentUser", JSON.stringify({ role: "admin" }));
  render(<AdminHeader onLogout={() => {}} />);
  expect(screen.getByText(/Ver vehículos/i)).toBeInTheDocument();
  expect(screen.getByText(/Ver usuarios/i)).toBeInTheDocument();
});
