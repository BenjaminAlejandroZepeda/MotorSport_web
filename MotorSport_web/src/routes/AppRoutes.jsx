import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import Catalog from "../pages/Catalog";
import AdminPanel from "../pages/AdminPanel";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Home from "../pages/Home"; 
import Cart from "../pages/Cart"
import Map from "../pages/Map"
import SupportContact from "../pages/SupportContact";

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
        path="/cart"
        element={
          <ProtectedRoute role="user">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/map"
        element={
          <ProtectedRoute role="user">
            <Map />
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute role="user">
            <SupportContact />
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
