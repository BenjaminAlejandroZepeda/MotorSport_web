import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProfileActionsDropdown() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <DropdownButton
      id="profile-actions-dropdown"
      title="Opciones de Cuenta"
      variant="secondary"
      className="mb-4"
    >
      <Dropdown.Item onClick={() => navigate("/change-password")}>
        Cambiar Contraseña
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate("/change-email")}>
        Cambiar Correo
      </Dropdown.Item>
    </DropdownButton>
  );
}

