import { Container, Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { VehicleCard } from "../components/Catalog/VehicleCard";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import vehiclesData from "../vehicles.json";

export default function Favoritos() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser") || "anonimo";
    const favoritosData = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDelUsuario = favoritosData[currentUser] || [];

    const catalogo = vehiclesData.super;

    const favoritosEnriquecidos = favoritosDelUsuario.map((v, index) => {
      const datosCatalogo = Object.entries(catalogo).find(
        ([key]) => key.toLowerCase() === v.name.toLowerCase()
      )?.[1] || {};

      return {
        ...v,
        id: `${v.id}-fav-${index}`,
        name: v.name,
        model: v.model,
        manufacturer: v.manufacturer ?? datosCatalogo.manufacturer ?? "Desconocido",
        price: v.price ?? datosCatalogo.price ?? 0,
        seats: datosCatalogo.seats ?? "?",
        topSpeed: datosCatalogo.topSpeed ?? { kmh: "?", mph: "?" },
        acceleration: datosCatalogo.acceleration ?? "?",
        braking: datosCatalogo.braking ?? "?",
        handling: datosCatalogo.handling ?? "?",
        images: datosCatalogo.images || {
          frontQuarter: "/placeholder.png",
          front: "/placeholder.png",
          rear: "/placeholder.png",
          side: "/placeholder.png",
        },
      };
    });

    setVehicles(favoritosEnriquecidos);
    setFilteredVehicles(favoritosEnriquecidos);
  }, []);

  const handleFilter = (filters) => {
    const result = vehicles.filter((v) => {
      const matchesPrice =
        v.price >= filters.minPrice && v.price <= filters.maxPrice;
      const matchesManufacturer =
        filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(v.manufacturer);
      const matchesPassengers =
        filters.passengers === null || v.seats === filters.passengers;
      const matchesSearch =
        v.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return (
        matchesPrice &&
        matchesManufacturer &&
        matchesPassengers &&
        matchesSearch
      );
    });

    setFilteredVehicles(result);
  };

  return (
    <MainLayout>
      <h1 className="text-center">Mis Favoritos</h1>

      <Row>
        <Col md={3}>
          <VehicleFilters vehicles={vehicles} onFilter={handleFilter} />
        </Col>

        <Col md={9}>
          <Row>
            {filteredVehicles.length === 0 ? (
              <Col>
                <p>No has agregado vehículos a favoritos o no coinciden con los filtros.</p>
              </Col>
            ) : (
              filteredVehicles.map((vehicle, index) => (
                <Col key={`${vehicle.id}-${index}`} xs={12} md={6} lg={4}>
                  <VehicleCard
                    vehicle={vehicle}
                    onViewDetails={() => {}}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
}
