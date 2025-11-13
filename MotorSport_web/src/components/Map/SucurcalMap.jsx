import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const branches = [
  {
    name: "Premium Deluxe Motorsport",
    address: "Power St & Adam's Apple Blvd, Pillbox Hill",
    hours: "10:00 AM - 07:00 PM",
    openDays: "Lun a Dom",
    region: "Pillbox Hill",
    images: [
      "https://i.imgur.com/gjdchyi.png",
      "https://i.imgur.com/nADxrR7.png",
      "https://i.imgur.com/JrHLTda.png",
      "https://i.imgur.com/JStw8EV.png", 
      "https://i.imgur.com/NCGYlfL.png"
    ],
    description:
      "Ubicado en Power Street y Adam's Apple Boulevard en Pillbox Hill, Los Santos, entre Mile High Club y Ammu-Nation, el concesionario vende una variedad de vehículos, desde sedanes europeos de lujo y SUV japoneses hasta motocicletas modificadas.",
  },
  {
    name: "Luxury Autos",
    address: "Rockford Dr & Eastbourne Way, Rockford Hills",
    hours: "11:00 AM - 08:00 PM",
    openDays: "Lun a Dom",
    region: "Rockford Hills",
    images: [
      "https://i.imgur.com/5blEYv4.png",
      "https://i.imgur.com/vfIPWpp.png",
      "https://i.imgur.com/K44wlXS.png",
      "https://i.imgur.com/7IJ8GG2.png",
      "https://i.imgur.com/o9bxfSM.png"
    ],
    description:
      "Está ubicado en la planta baja del edificio de estacionamiento con valet de varios niveles de Rockford Hills, en la intersección de Mad Wayne Thunder Drive y Eastbourne Way en Rockford Hills, Los Santos. Una oficina de Concierge Pegasus también está en la planta baja.",
  },
];

export default function SucursalMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!selectedBranch) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedBranch.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedBranch]);

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Nuestras Sucursales</h2>
      <Row className="mb-4">
        <Col md={6}>
          <div className="mt-4 d-flex flex-column gap-3">
            {branches.map((branch, index) => (
              <Card key={index} className="card p-3">
                <Card.Body>
                  <Card.Title>{branch.name}</Card.Title>
                  <Card.Text>
                    <strong>Dirección:</strong> {branch.address}<br />
                    <strong>Horario:</strong> {branch.hours}<br />
                    <strong>Días:</strong> {branch.openDays}<br />
                    <strong>Región:</strong> {branch.region}
                  </Card.Text>
                  <Button
                    className="primary"
                    onClick={() => {
                      setSelectedBranch(branch);
                      setCurrentImageIndex(0);
                    }}
                  >
                    Ver Más
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        <Col md={6}>
          {selectedBranch && (
            <div
              style={{
                height: "100%",
                minHeight: "500px",
                backgroundColor: "var(--background-alt)",
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={selectedBranch.images[currentImageIndex]}
                alt="Sucursal"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "var(--border-radius)",
                  marginBottom: "1rem",
                }}
              />
              <h3>{selectedBranch.name}</h3>
              <p>{selectedBranch.description}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
