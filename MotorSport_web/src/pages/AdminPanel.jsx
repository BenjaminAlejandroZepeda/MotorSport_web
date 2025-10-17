import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminTable from "../components/Admin/AdminTable";
import { useState } from "react";


export default function AdminPanel() {
  const [tipo, setTipo] = useState("vehiculos");
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
     
      <div className="d-flex gap-2 mb-4">
        <AdminHeader onLogout={handleLogout} setTipo={setTipo} />
      </div>

 
      <AdminTable type={tipo} />
    </>
  );
}