import MainLayout from "../components/layout/MainLayout";
import MyReviews from "../components/Reviews/MyReviews"; 

export default function ReviewsPage() {
  return (
    <MainLayout>
      <h1 className="text-center mb-4">Mis Reseñas</h1>
      <MyReviews />
    </MainLayout>
  );
}
