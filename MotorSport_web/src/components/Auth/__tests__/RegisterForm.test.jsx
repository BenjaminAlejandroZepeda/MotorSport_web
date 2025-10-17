import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../RegisterForm";

test("registra un nuevo usuario y lo guarda en localStorage", () => {
  localStorage.setItem("users", JSON.stringify([]));

  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Crea un usuario"), {
    target: { value: "nuevo" },
  });

  fireEvent.change(screen.getByPlaceholderText("Crea una contraseña"), {
    target: { value: "clave123" },
  });

  fireEvent.click(screen.getByText("Registrarse"));

  const users = JSON.parse(localStorage.getItem("users"));
  expect(users).toContainEqual({ username: "nuevo", password: "clave123", role: "user" });
  expect(screen.getByText(/Usuario registrado con éxito/i)).toBeInTheDocument();
});

test("muestra error si el nombre de usuario ya existe", () => {
  localStorage.setItem("users", JSON.stringify([
    { username: "admin", password: "admin123", role: "admin" }
  ]));

  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Crea un usuario"), {
    target: { value: "admin" },
  });

  fireEvent.change(screen.getByPlaceholderText("Crea una contraseña"), {
    target: { value: "otraClave" },
  });

  fireEvent.click(screen.getByText("Registrarse"));

  expect(screen.getByText(/El nombre de usuario ya existe/i)).toBeInTheDocument();
});
