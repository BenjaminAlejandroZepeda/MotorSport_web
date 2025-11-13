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
import Garage from "../pages/Garage";
import Reviews from "../pages/Reviews";
import Favoritos from "../pages/Favorites";
import AboutPage from "../pages/About";
import Order from "../pages/Order"
import Profile from "../pages/Profile";
import ChangePassword from "../components//Profile/ChangePassword";
import ChangeEmail from "../components//Profile/ChangeEmail";

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
        path="/about"
        element={
          <ProtectedRoute role="user">
            <AboutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order"
        element={
          <ProtectedRoute role="user">
            <Order />
          </ProtectedRoute>
        }
      />
       <Route
        path="/garage"
        element={
          <ProtectedRoute role="user">
            <Garage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
          <ProtectedRoute role="user">
            <Reviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute role="user">
            <Favoritos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute role="user">
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-email"
        element={
          <ProtectedRoute role="user">
            <ChangeEmail />
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

