import { Button, Container, Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import vehiclesData from "../vehicles.json";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { VehicleModal } from "../components/Catalog/VehicleModal";
import { VehicleCard } from "../components/Catalog/VehicleCard";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);


  useEffect(() => {
    const supers = vehiclesData.super;
    const entries = Object.entries(supers).map(([name, info]) => ({
      id: name,
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    setCurrentPage(1);
  };

  const handleShowModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleAddToCart = (vehicle) => {
    console.log("Añadido al carrito:", vehicle);
  };

  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MainLayout>
      <section className="catalog-section">
        <h1 className="text-center mb-4">Catálogo de Vehículos</h1>

       <Row>
          {isMobile ? (
            <Navbar className="mobile-navbar mb-3 d-md-none">
              <Container>
                <Nav className="w-100">
                  <NavDropdown
                    title="🔍 Filtros"
                    id="catalog-filter-dropdown"
                    className="w-100"
                  >
                    <div className="dropdown-filters scrollable-dropdown px-3 py-2">
                      <VehicleFilters vehicles={vehicles} onFilter={handleFilter} />
                    </div>
                  </NavDropdown>
                </Nav>
              </Container>
            </Navbar>
          ) : (
            <Col md={3}>
              <VehicleFilters vehicles={vehicles} onFilter={handleFilter} />
            </Col>
          )}

          <Col md={isMobile ? 12 : 9}>
            {isMobile ? (
              <>
                <div className="vehicle-carousel mb-4">
                  {paginatedVehicles.slice(0, 6).map((vehicle) => (
                    <div key={vehicle.model || vehicle.name} className="carousel-card">
                      <VehicleCard
                        vehicle={vehicle}
                        onViewDetails={() => handleShowModal(vehicle)}
                      />
                    </div>
                  ))}
                </div>

                <div className="vehicle-carousel">
                  {paginatedVehicles.slice(6, 12).map((vehicle) => (
                    <div key={vehicle.model || vehicle.name} className="carousel-card">
                      <VehicleCard
                        vehicle={vehicle}
                        onViewDetails={() => handleShowModal(vehicle)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Row className="vehicle-grid">
                {paginatedVehicles.map((vehicle) => (
                  <Col key={vehicle.model || vehicle.name} xs={12} md={6} lg={4}>
                    <VehicleCard
                      vehicle={vehicle}
                      onViewDetails={() => handleShowModal(vehicle)}
                  />
              </Col>
           ))}
      </Row>
    )}

    <div className="pagination-numbers d-flex justify-content-center mt-3 flex-wrap gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </Col>
</Row>

        <VehicleModal
          show={showModal}
          onHide={() => setShowModal(false)}
          vehicle={selectedVehicle}
          onAddToCart={handleAddToCart}
        />
      </section>
    </MainLayout>
  );
}