import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = currentUser?.token || "";

  const authConfig = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  useEffect(() => {
    if (!currentUser?.id || !token) {
      setError("Debes iniciar sesión para ver tus reseñas");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/reviews/usuario/${currentUser.id}`,
          authConfig
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Error al cargar las reseñas:", err);
        setError(
          err.response?.data?.message || "No se pudieron cargar las reseñas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentUser?.id, token]);

  const handleUpdate = async (id, updatedData) => {
    if (!token) return;

    try {
      const res = await axios.put(
        `http://localhost:8080/api/reviews/${id}`,
        updatedData,
        authConfig
      );
      setReviews((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    } catch (err) {
      console.error("Error al actualizar la reseña:", err);
      alert(
        err.response?.data?.message || "No se pudo actualizar la reseña"
      );
    }
  };

  if (loading) return <p className="text-center">Cargando reseñas...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onUpdate={handleUpdate} />
      ))}
    </div>
  );
}
