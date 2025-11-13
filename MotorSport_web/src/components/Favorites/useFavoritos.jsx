import { useState, useEffect } from "react";
import axios from "axios";

export function useFavoritos() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  
  const currentUser = { id: 1, username: "benja", password: "1234" };

  const authConfig = { auth: { username: currentUser.username, password: currentUser.password } };

  const cargarFavoritos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/favorites/usuario/${currentUser.id}`,
        authConfig
      );
      const favoritos = response.data.map(f => f.vehicle);
      setVehicles(favoritos);
      setFilteredVehicles(favoritos);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
    }
  };

  const eliminarFavorito = async (vehicleId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/favorites/usuario/${currentUser.id}/vehiculo/${vehicleId}`,
        authConfig
      );
      cargarFavoritos();
    } catch (err) {
      console.error("Error eliminando favorito:", err);
    }
  };

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

  useEffect(() => {
    cargarFavoritos();
  }, []);

  return { vehicles, filteredVehicles, handleFilter, cargarFavoritos, eliminarFavorito };
}
