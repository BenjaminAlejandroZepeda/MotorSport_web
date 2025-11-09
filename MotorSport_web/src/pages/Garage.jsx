import { Container, Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { GarageCard } from "../components/Garage/GarageCard";
import { GarageModal } from "../components/Garage/GarageModal";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import vehiclesData from "../vehicles.json";


export default function Garaje() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
  const currentUser = localStorage.getItem("currentUser") || "anonimo";
  const comprasData = JSON.parse(localStorage.getItem("compras") || "{}");
  const comprasDelUsuario = comprasData[currentUser] || [];

  const catalogo = vehiclesData.super;

  const todosLosVehiculos = comprasDelUsuario.flatMap((compra, compraIndex) =>
  compra.vehiculos.map((v, vehiculoIndex) => {
    const datosCatalogo = Object.entries(catalogo).find(
      ([key]) => key.toLowerCase() === v.nombre.toLowerCase()
    )?.[1] || {};

    return {
      ...v,
      id: `${v.id}-${compraIndex}-${vehiculoIndex}`,
      name: v.nombre,
      model: v.modelo,
      manufacturer: v.fabricante ?? datosCatalogo.manufacturer ?? "Desconocido",
      price: v.precio ?? datosCatalogo.price ?? 0,
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
  })
);


  setVehicles(todosLosVehiculos);
  setFilteredVehicles(todosLosVehiculos);
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

  return (
    <MainLayout>
      <h1 className="text-center">Mi Garaje</h1>

      <Row>
        <Col md={3}>
          <VehicleFilters vehicles={vehicles} onFilter={handleFilter} />
        </Col>

        <Col md={9}>
          <Row>
            {filteredVehicles.map((vehicle, index) => (
              <Col key={`${vehicle.id}-${index}`} xs={12} md={6} lg={4}>
                <GarageCard
                  vehicle={vehicle}
                  onViewDetails={() => handleShowModal(vehicle)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <GarageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        vehicle={selectedVehicle}
      />
    </MainLayout>
  );
}