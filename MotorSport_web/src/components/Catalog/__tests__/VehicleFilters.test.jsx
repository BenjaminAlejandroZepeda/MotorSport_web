import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleFilters } from "../VehicleFilters";

test("renderiza todos los campos de filtro", () => {
  const vehicles = [
    { manufacturer: "Vapid" },
    { manufacturer: "Bravado" },
  ];

  render(<VehicleFilters vehicles={vehicles} onFilter={() => {}} />);

  expect(screen.getByLabelText("Buscar por nombre")).toBeInTheDocument();
  expect(screen.getByLabelText("Precio mínimo")).toBeInTheDocument();
  expect(screen.getByLabelText("Precio máximo")).toBeInTheDocument();
  expect(screen.getByLabelText("Cantidad de pasajeros")).toBeInTheDocument();
  expect(screen.getByText("Vapid")).toBeInTheDocument();
  expect(screen.getByText("Bravado")).toBeInTheDocument();
});

test("permite seleccionar fabricantes", () => {
  const vehicles = [
    { manufacturer: "Vapid" },
    { manufacturer: "Bravado" },
  ];

  render(<VehicleFilters vehicles={vehicles} onFilter={() => {}} />);

  const vapidCheckbox = screen.getByLabelText("Vapid");
  fireEvent.click(vapidCheckbox);

  expect(vapidCheckbox).toBeChecked();
});

test("ejecuta onFilter con los valores ingresados", () => {
  const vehicles = [{ manufacturer: "Vapid" }];
  const mockFilter = vi.fn();

  render(<VehicleFilters vehicles={vehicles} onFilter={mockFilter} />);

  fireEvent.change(screen.getByLabelText("Buscar por nombre"), {
    target: { value: "dominator" },
  });

  fireEvent.change(screen.getByLabelText("Precio mínimo"), {
    target: { value: "50000" },
  });

  fireEvent.change(screen.getByLabelText("Precio máximo"), {
    target: { value: "100000" },
  });

  fireEvent.change(screen.getByLabelText("Cantidad de pasajeros"), {
    target: { value: "2" },
  });

  fireEvent.click(screen.getByLabelText("Vapid"));
  fireEvent.click(screen.getByText("Aplicar filtros"));

  expect(mockFilter).toHaveBeenCalledWith({
    minPrice: 50000,
    maxPrice: 100000,
    manufacturers: ["Vapid"],
    passengers: 2,
    searchTerm: "dominator",
  });
});
