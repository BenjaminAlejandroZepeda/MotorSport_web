
import MainLayout from "../components/layout/MainLayout";
import ReseñasList from "../components/Reviews/ReviewsList";

export default function ReviewsPage() {
  return (
    <MainLayout>
      <h1 className="text-center">Reseñas de Usuarios</h1>
      <ReseñasList />
    </MainLayout>
  );
}