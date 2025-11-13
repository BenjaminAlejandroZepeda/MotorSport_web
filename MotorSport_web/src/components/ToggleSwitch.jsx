import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function ToggleSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) document.documentElement.classList.add("dark");
  }, []);

  const handleToggle = () => {
    window.toggleDarkMode();
    setDarkMode((prev) => !prev);
  };

  return (
    <Form.Check
      type="switch"
      id="dark-mode-switch"
      label={darkMode ? "Modo Claro" : "Modo Oscuro"}
      checked={darkMode}
      onChange={handleToggle}
      className="text-light"
    />
  );
}

