
import { useState, useEffect } from "react";
import vehiclesData from "../../vehicles.json";

export function useFavoritos() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const cargarFavoritos = () => {
    const currentUser = localStorage.getItem("currentUser") || "anonimo";
    const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDelUsuario = favoritosData[currentUser] || [];

    const catalogo = vehiclesData.super;

    const favoritosEnriquecidos = favoritosDelUsuario.map((v) => {
      const datosCatalogo = Object.entries(catalogo).find(
        ([key]) => key.toLowerCase() === v.name.toLowerCase()
      )?.[1] || {};

      return {
        ...v,
        id: v.id,
        manufacturer: v.manufacturer ?? datosCatalogo.manufacturer ?? "Desconocido",
        price: v.price ?? datosCatalogo.price ?? 0,
        seats: datosCatalogo.seats ?? "?",
        topSpeed: datosCatalogo.topSpeed ?? { kmh: "?", mph: "?" },
        acceleration: datosCatalogo.acceleration ?? "?",
        braking: datosCatalogo.braking ?? "?",
        handling: datosCatalogo.handling ?? "?",
        images: datosCatalogo.images || {
          frontQuarter: "/placeholder.png",
          front: "/placeholder.png",
          rear: "/placeholder.png",
          side: "/placeholder.png",
        },
      };
    });

    setVehicles(favoritosEnriquecidos);
    setFilteredVehicles(favoritosEnriquecidos);
  };

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const handleFilter = (filters) => {
    const result = vehicles.filter((v) => {
      const matchesPrice = v.price >= filters.minPrice && v.price <= filters.maxPrice;
      const matchesManufacturer =
        filters.manufacturers.length === 0 || filters.manufacturers.includes(v.manufacturer);
      const matchesPassengers = filters.passengers === null || v.seats === filters.passengers;
      const matchesSearch = v.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesPrice && matchesManufacturer && matchesPassengers && matchesSearch;
    });

    setFilteredVehicles(result);
  };

  return {
    vehicles,
    filteredVehicles,
    handleFilter,
    cargarFavoritos,
  };
}
