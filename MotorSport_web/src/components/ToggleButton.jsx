import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function ToggleButton() {
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
    <Button variant="warning" onClick={handleToggle}>
      {darkMode ? "Modo Claro" : "Modo Oscuro"}
    </Button>
  );
}
