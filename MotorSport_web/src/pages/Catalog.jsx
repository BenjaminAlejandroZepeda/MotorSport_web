import { Button, Container, Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import vehiclesData from "../vehicles.json";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { VehicleModal } from "../components/Catalog/VehicleModal";
import { VehicleCard } from "../components/Catalog/VehicleCard";

export default function Catalog() {


  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const supers = vehiclesData.super;
    const entries = Object.entries(supers).map(([name, info]) => ({
      name,
      images: info.images,
      price: info.price,
      seats: info.seats,
      model: info.model,
      manufacturer: info.manufacturer,
      topSpeed: info.topSpeed,
      speed: info.speed,
      acceleration: info.acceleration,
      braking: info.braking,
      handling: info.handling
    }));
    setVehicles(entries);
    setFilteredVehicles(entries);
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
        v.name.toLowerCase().includes(filters.searchTerm);

      return (
        matchesPrice &&
        matchesManufacturer &&
        matchesPassengers &&
        matchesSearch
      );
    });

    setFilteredVehicles(result);
  };

  const handleShowModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleAddToCart = (vehicle) => {
    console.log("Añadido al carrito:", vehicle);
    // Aquí puedes integrar Zustand o lógica futura
  };

  return (
    <MainLayout>
      <h1 className="text-center">Catálogo de Vehículos</h1>

      <Row>
        <Col md={3}>
          <VehicleFilters vehicles={vehicles} onFilter={handleFilter} />
        </Col>

        <Col md={9}>
          <Row>
            {filteredVehicles.map((vehicle) => (
              <Col key={vehicle.model || vehicle.name} xs={12} md={6} lg={4}>
                <VehicleCard
                  vehicle={vehicle}
                  onViewDetails={() => handleShowModal(vehicle)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <VehicleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        vehicle={selectedVehicle}
        onAddToCart={handleAddToCart}
      /> 
    </MainLayout>
  );
}
