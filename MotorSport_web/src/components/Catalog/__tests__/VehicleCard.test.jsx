import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleCard } from "../VehicleCard";
import { vi } from "vitest";

test("renderiza correctamente los datos del vehículo", () => {
  const vehicle = {
    id: "v1",
    name: "Dominator",
    manufacturer: "Vapid",
    price: 85000,
    seats: 4,
    images: { frontQuarter: "/dominator.png" },
  };

  render(<VehicleCard vehicle={vehicle} />);

  expect(screen.getByText("Dominator")).toBeInTheDocument();
  expect(screen.getByText("Fabricante:").parentElement).toHaveTextContent("Vapid");
  expect(screen.getByText("Precio:").parentElement).toHaveTextContent("$85.000");
  expect(screen.getByText("Pasajeros:").parentElement).toHaveTextContent("4");
  expect(screen.getByRole("img")).toHaveAttribute("src", "/dominator.png");
});

test("marca como favorito si ya está en localStorage", () => {
  localStorage.setItem("currentUser", "admin");
  localStorage.setItem("favoritos", JSON.stringify({
    admin: [{ id: "v1", name: "Dominator" }],
  }));

  const vehicle = {
    id: "v1",
    name: "Dominator",
    manufacturer: "Vapid",
    price: 85000,
    seats: 4,
    images: { frontQuarter: "/dominator.png" },
  };

  render(<VehicleCard vehicle={vehicle} />);
  const starButton = screen.getByTitle("Quitar de favoritos");

  expect(starButton).toHaveStyle("color: #FFD60A");
});

test("agrega a favoritos al hacer clic", () => {
  localStorage.setItem("currentUser", "admin");
  localStorage.setItem("favoritos", JSON.stringify({ admin: [] }));

  const vehicle = {
    id: "v1",
    name: "Dominator",
    manufacturer: "Vapid",
    price: 85000,
    seats: 4,
    images: { frontQuarter: "/dominator.png" },
  };

  render(<VehicleCard vehicle={vehicle} />);
  const starButton = screen.getByTitle("Agregar a favoritos");

  fireEvent.click(starButton);

  const favoritos = JSON.parse(localStorage.getItem("favoritos"));
  expect(favoritos.admin).toContainEqual(vehicle);
});

test("elimina de favoritos al hacer clic si ya estaba", () => {
  const vehicle = {
    id: "v1",
    name: "Dominator",
    manufacturer: "Vapid",
    price: 85000,
    seats: 4,
    images: { frontQuarter: "/dominator.png" },
  };

  localStorage.setItem("currentUser", "admin");
  localStorage.setItem("favoritos", JSON.stringify({ admin: [vehicle] }));

  render(<VehicleCard vehicle={vehicle} />);
  const starButton = screen.getByTitle("Quitar de favoritos");

  fireEvent.click(starButton);

  const favoritos = JSON.parse(localStorage.getItem("favoritos"));
  expect(favoritos.admin).not.toContainEqual(vehicle);
});
