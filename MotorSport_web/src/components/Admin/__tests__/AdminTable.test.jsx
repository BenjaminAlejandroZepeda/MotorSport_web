import { render, screen, fireEvent } from "@testing-library/react";
import AdminTable from "../AdminTable";

vi.mock("../../vehicles.json", () => ({
  default: {
    super: {
      D11: {
        model: "ghostD11",
        price: 135000,
        seats: 2,
        topSpeed: { kmh: 220 },
        acceleration: 89,
        braking: 37.3,
        handling: 67.5,
      },
    },
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

test("abre el modal al hacer clic en Acciones", async () => {
  render(<AdminTable type="vehiculos" />); // ← esto es esencial

  const botones = screen.getAllByRole("button", { name: "Acciones" });
  fireEvent.click(botones[0]);

  const modal = await screen.findByRole("dialog");
  expect(modal).toBeInTheDocument();
});

