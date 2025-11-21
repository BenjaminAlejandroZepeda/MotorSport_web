import { useState } from "react";

export function VehicleFilters({ vehicles, onFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [passengers, setPassengers] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const manufacturers = Array.from(
    new Set(
      (vehicles || [])
        .filter((v) => v && v.manufacturer) 
        .map((v) => v.manufacturer)
    )
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
    <div className="card filter-panel">
      <h2 className="title-md mb-2">Filtros</h2>

   
      <div className="input-group mb-2">
        <label htmlFor="searchTerm" className="label">
          Buscar por nombre
        </label>
        <input
          id="searchTerm"
          type="text"
          placeholder="Ej: Zentorno"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="custom-input"
        />
      </div>

      <div className="input-group mb-2">
        <label htmlFor="minPrice" className="label">
          Precio mínimo
        </label>
        <input
          id="minPrice"
          type="number"
          placeholder="Ej: 300000"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="custom-input"
        />
      </div>

      <div className="input-group mb-2">
        <label htmlFor="maxPrice" className="label">
          Precio máximo
        </label>
        <input
          id="maxPrice"
          type="number"
          placeholder="Ej: 1000000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="custom-input"
        />
      </div>


      <div className="input-group mb-2">
        <label className="label">Fabricantes</label>
        <div className="checkbox-group">
          {manufacturers.map((m) => (
            <label key={m} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedManufacturers.includes(m)}
                onChange={() => handleManufacturerChange(m)}
              />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </div>

    
      <div className="input-group mb-3">
        <label htmlFor="passengers" className="label">
          Cantidad de pasajeros
        </label>
        <input
          id="passengers"
          type="number"
          placeholder="Ej: 2"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="custom-input"
        />
      </div>

      <button className="primary large full-width" onClick={applyFilters}>
        Aplicar filtros
      </button>
    </div>
  );
}