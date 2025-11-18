import { render, screen } from "@testing-library/react";
import { VehicleCard } from "../VehicleCart";
import { fireEvent } from "@testing-library/react"

test("renderiza correctamente los datos del vehículo", () => {
  const vehicle = {
    name: "Dominator",
    manufacturer: "Vapid",
    price: 85000,
    seats: 4,
    images: { frontQuarter: "/dominator.png" },
  };

  render(<VehicleCard vehicle={vehicle} onViewDetails={() => {}} />);

  expect(screen.getByText("Dominator")).toBeInTheDocument();
  expect(screen.getByText("Fabricante:").parentElement).toHaveTextContent("Vapid");
  expect(screen.getByText("Precio:").parentElement).toHaveTextContent("$85.000"); 
  expect(screen.getByText("Pasajeros:").parentElement).toHaveTextContent("4");
  expect(screen.getByRole("img")).toHaveAttribute("src", "/dominator.png");
});

test("ejecuta onViewDetails al hacer clic en el botón", () => {
  const vehicle = {
    name: "Buffalo",
    manufacturer: "Bravado",
    price: 90000,
    seats: 4,
    images: { frontQuarter: "/buffalo.png" },
  };

  const mockViewDetails = vi.fn();

  render(<VehicleCard vehicle={vehicle} onViewDetails={mockViewDetails} />);
  fireEvent.click(screen.getByText("Ver detalles"));

  expect(mockViewDetails).toHaveBeenCalled();
});
