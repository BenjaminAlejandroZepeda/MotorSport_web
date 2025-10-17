import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return <Navigate to="/" />;
  if (role && currentUser.role !== role) return <Navigate to="/" />;

  return children;
}
