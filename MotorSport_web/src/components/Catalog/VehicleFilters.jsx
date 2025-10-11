import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export function VehicleFilters({ vehicles, onFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [passengers, setPassengers] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const manufacturers = Array.from(
    new Set(vehicles.map((v) => v.manufacturer))
  );

  const handleManufacturerChange = (manufacturer) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturer)
        ? prev.filter((m) => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  const applyFilters = () => {
    onFilter({
      minPrice: parseInt(minPrice) || 0,
      maxPrice: parseInt(maxPrice) || Infinity,
      manufacturers: selectedManufacturers,
      passengers: parseInt(passengers) || null,
      searchTerm: searchTerm.toLowerCase(),
    });
  };

  return (
    <Form className="p-3 border rounded filter-panel">
      <h5>Filtros</h5>

      <Form.Group className="mb-3">
        <Form.Label>Buscar por nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Zentorno"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio mínimo</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ej: 300000"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio máximo</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ej: 1000000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fabricantes</Form.Label>
        {manufacturers.map((m) => (
            <div key={m} className="d-flex align-items-center mb-2">
            <Form.Check
                type="checkbox"
                id={`manufacturer-${m}`}
                checked={selectedManufacturers.includes(m)}
                onChange={() => handleManufacturerChange(m)}
                className="me-2"
            />
            <Form.Label htmlFor={`manufacturer-${m}`} className="mb-0">
                {m}
            </Form.Label>
            </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cantidad de pasajeros</Form.Label>
        <Form.Control
          type="number"
          value={passengers}
          placeholder="Ej: 2"
          onChange={(e) => setPassengers(e.target.value)}
          className="custom-input"
        />
      </Form.Group>

      <Button variant="primary" onClick={applyFilters}>
        Aplicar filtros
      </Button>
    </Form>
  );
}
