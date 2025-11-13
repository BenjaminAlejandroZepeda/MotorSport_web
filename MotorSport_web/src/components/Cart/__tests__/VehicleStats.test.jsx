import { render, screen, fireEvent } from "@testing-library/react";
import VehicleStats from "../VehicleStats";


test("renderiza correctamente los datos del vehículo", () => {
  const vehicle = {
    id: "v1",
    name: "Dominator",
    manufacturer: "Vapid",
    model: "GTX",
    seats: 4,
    price: 85000,
    quantity: 2,
    images: { frontQuarter: "/dominator.png" },
  };

  render(<VehicleStats vehicle={vehicle} />);

  expect(screen.getByText("Dominator")).toBeInTheDocument();
  expect(screen.getByText("Fabricante:").parentElement).toHaveTextContent("Vapid");
  expect(screen.getByText("Modelo:").parentElement).toHaveTextContent("GTX");
  expect(screen.getByText("Pasajeros:").parentElement).toHaveTextContent("4");
  expect(screen.getByText("Precio:").parentElement).toHaveTextContent("$85.000");
  expect(screen.getByRole("spinbutton")).toHaveValue(2);
  expect(screen.getByRole("img")).toHaveAttribute("src", "/dominator.png");
  expect(screen.getByText("$170.000")).toBeInTheDocument();
});
