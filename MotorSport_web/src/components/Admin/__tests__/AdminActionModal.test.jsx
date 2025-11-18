import { render, screen, fireEvent } from "@testing-library/react";
import AdminActionModal from "../AdminActionModal";
import { mockUsers } from "../../../mockUsers";

test("renderiza el formulario de vehículos", () => {
  render(
    <AdminActionModal
      show={true}
      onHide={() => {}}
      type="vehiculos"
      data={{ name: "D11", price: 135000 }}
      onUpdate={() => {}}
    />
  );

  expect(
  screen.getByText((content, element) =>
    content.includes("Modificar precio de") && element.textContent.includes("D11")
  )
    ).toBeInTheDocument();
});

test("modifica solo el rol de un usuario", () => {
  localStorage.setItem("users", JSON.stringify(mockUsers));

  const mockUpdate = vi.fn();
  const mockHide = vi.fn();

  render(
    <AdminActionModal
      show={true}
      onHide={mockHide}
      type="usuarios"
      data={{ username: "user", password: "user123", role: "user" }}
      onUpdate={mockUpdate}
    />
  );

  // Solo cambiamos el rol
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "admin" },
  });

  fireEvent.click(screen.getByText("Guardar cambios"));

  const updated = JSON.parse(localStorage.getItem("users"));
  const user = updated.find((u) => u.username === "user");

  // La contraseña se mantiene igual
  expect(user.password).toBe("user123");
  expect(user.role).toBe("admin");

  expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({ role: "admin" }));
  expect(mockHide).toHaveBeenCalled();
});


test("elimina un usuario del mock", () => {
  localStorage.setItem("users", JSON.stringify(mockUsers));

  const mockUpdate = vi.fn();
  const mockHide = vi.fn();

  render(
    <AdminActionModal
      show={true}
      onHide={mockHide}
      type="usuarios"
      data={{ username: "user" }}
      onUpdate={mockUpdate}
    />
  );

  fireEvent.click(screen.getByText("Eliminar usuario"));

  const updated = JSON.parse(localStorage.getItem("users"));
  expect(updated).toHaveLength(1);
  expect(updated[0].username).toBe("admin");
  expect(mockUpdate).toHaveBeenCalledWith({ delete: true });
  expect(mockHide).toHaveBeenCalled();
});

test("elimina una reseña desde el modal", () => {
  const reseñas = {
    [JSON.stringify({ username: "user" })]: {
      D11: 5,
      D12: 4,
    },
  };

  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  const mockUpdate = vi.fn();
  const mockHide = vi.fn();

  render(
    <AdminActionModal
      show={true}
      onHide={mockHide}
      type="reseñas"
      data={{ username: "user", vehiculoId: "D11" }}
      onUpdate={mockUpdate}
    />
  );

  fireEvent.click(screen.getByText("Eliminar reseña"));

  const updated = JSON.parse(localStorage.getItem("reseñas"));
  const userKey = JSON.stringify({ username: "user" });

  expect(updated[userKey]).not.toHaveProperty("D11");
  expect(mockUpdate).toHaveBeenCalledWith({ delete: true });
  expect(mockHide).toHaveBeenCalled();
});

