import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm";

test("inicia sesión correctamente y guarda usuario en localStorage", () => {
  localStorage.setItem("users", JSON.stringify([
    { username: "admin", password: "admin123", role: "admin" }
  ]));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), {
    target: { value: "admin" },
  });

  fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
    target: { value: "admin123" },
  });

  fireEvent.click(screen.getByText("Ingresar"));

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  expect(currentUser).toEqual({ username: "admin", password: "admin123", role: "admin" });
});

test("muestra error si las credenciales son incorrectas", () => {
  localStorage.setItem("users", JSON.stringify([
    { username: "admin", password: "admin123", role: "admin" }
  ]));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Ingrese su usuario"), {
    target: { value: "admin" },
  });

  fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
    target: { value: "wrongpass" },
  });

  fireEvent.click(screen.getByText("Ingresar"));

  expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument();
});

