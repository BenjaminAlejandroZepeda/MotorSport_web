import { useState, useEffect } from "react";
import axios from "axios";

export function useFavoritos() {
  const [favorites, setFavorites] = useState([]);
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const authConfig = currentUser
    ? { headers: { Authorization: `Bearer ${currentUser.token}` } }
    : {};

  const cargarFavoritos = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/favorites/usuario/${currentUser.id}`,
        authConfig
      );
      const vehiculos = res.data.map(f => f.vehicle);
      setFavorites(vehiculos);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
    }
  };

  const toggleFavorite = async (vehicleId) => {
    if (!currentUser) return;

    const isFav = favorites.some(v => v.id === vehicleId);

    try {
      if (isFav) {
        // Eliminar favorito
        await axios.delete(
          `http://localhost:8080/api/favorites/usuario/${currentUser.id}/vehiculo/${vehicleId}`,
          authConfig
        );
      } else {
        // Añadir favorito
        await axios.post(
          `http://localhost:8080/api/favorites`,
          {
            user: { id: currentUser.id },
            vehicle: { id: vehicleId }
          },
          authConfig
        );
      }
      // Refrescar lista
      cargarFavoritos();
    } catch (err) {
      console.error("Error al actualizar favorito:", err);
    }
  };

  const isFavorite = (vehicleId) => favorites.some(v => v.id === vehicleId);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  return { favorites, isFavorite, toggleFavorite, cargarFavoritos };
}
