import MainLayout from "../components/layout/MainLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import ProfileActionsDropdown from "../components/Profile/ProfileActionsDropdown";

export default function Profile() {

    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/users/${currentUser.id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser?.id]);

  return (
    <MainLayout>
        <Container className="d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: "80vh" }}>
            <h2 className="mb-4 text-center">Perfil de Usuario </h2> <ProfileActionsDropdown />
            {loading ? (
            <div className="text-center">
                <Spinner animation="border" />
            </div>
            ) : userData ? (
            <Row className="justify-content-center w-100">
                <Col md={6}>
                <Card className="card p-4">
                    <Card.Body>
                    <Card.Title className="mb-3 text-center">Información Personal</Card.Title>
                    <p><strong>Nombre de usuario:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Último acceso:</strong> {userData.lastLogin}</p>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            ) : (
            <p>No se pudo cargar la información del perfil.</p>
            )}
        </Container>
        
        </MainLayout>
  );
}