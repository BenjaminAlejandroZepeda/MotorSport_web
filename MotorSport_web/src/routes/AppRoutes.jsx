import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Catalog from "../pages/Catalog";
import AdminPanel from "../pages/AdminPanel";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/catalog"
        element={
          <ProtectedRoute role="user">
            <Catalog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Cualquier ruta no definida redirige a Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
