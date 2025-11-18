import { useState, useEffect } from "react";
import axios from "../../axiosConfig";

export function useFavoritos() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/api/favorites/me"); // devuelve Favorite[]
        console.log("Respuesta completa:", res.data);
        const favs = res.data.map((f) => {
          console.log("Favorito bruto:", f);
          const v = f.vehicle;
          return {
            id: v.id,
            name: v.model || v.id,
            manufacturer: v.manufacturer,
            price: v.price,
            seats: v.seats,
            topSpeed: v.topSpeed || {},
            images: v.images || {},
            fechaGuardado: f.fechaGuardado,
          };
        });
        setFavorites(favs);
        setFilteredFavorites(favs);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      }
    };
    fetchFavorites();
  }, []);

  const isFavorite = (vehicleId) => favorites.some((f) => f.id === vehicleId);

  const toggleFavorite = async (vehicleId) => {
    const isFav = isFavorite(vehicleId);
    try {
      if (isFav) {
        await axios.delete(`/api/favorites/vehiculo/${vehicleId}`);
        setFavorites((prev) => prev.filter((f) => f.id !== vehicleId));
        setFilteredFavorites((prev) => prev.filter((f) => f.id !== vehicleId));
      } else {
        await axios.post("/api/favorites", { vehicleId });
        // opcional: recargar lista completa
        setFavorites((prev) => [...prev, { id: vehicleId }]);
        setFilteredFavorites((prev) => [...prev, { id: vehicleId }]);
      }
    } catch (err) {
      console.error("Error al actualizar favorito:", err);
    }
  };

  const handleFilter = (filters) => {
    const result = favorites.filter((v) => {
      const matchesPrice = v.price >= filters.minPrice && v.price <= filters.maxPrice;
      const matchesManufacturer =
        filters.manufacturers.length === 0 || filters.manufacturers.includes(v.manufacturer);
      const matchesPassengers = filters.passengers === null || v.seats === filters.passengers;
      const matchesSearch = v.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesPrice && matchesManufacturer && matchesPassengers && matchesSearch;
    });
    setFilteredFavorites(result);
  };

  return { favorites: filteredFavorites, isFavorite, toggleFavorite, handleFilter };
}