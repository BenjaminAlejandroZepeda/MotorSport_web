import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { GarageCard } from "../components/Garage/GarageCard";
import { GarageModal } from "../components/Garage/GarageModal";
import axios from "axios";

export default function Garage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 12;

  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const token = storedUser.token || "";

  const authConfig = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  
  useEffect(() => {
    const fetchGarage = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:8080/api/garage",
          authConfig
        );

        const autos = res.data.map((item) => ({
          ...item.vehicle,
          fechaCompra: item.fechaCompra,
          garageId: item.id, 
        }));

        setVehicles(autos);
        setFilteredVehicles(autos);
      } catch (err) {
        console.error("Error al cargar el garaje:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("currentUser");
          window.location.reload();
        }
      }
    };

    fetchGarage();
  }, [token]);

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleFilter = (filters) => {
    const result = vehicles.filter((v) => {
      const matchesPrice =
        (!isNaN(v.price) &&
          v.price >= filters.minPrice &&
          v.price <= filters.maxPrice) ||
        false;

      const matchesManufacturer =
        filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(v.manufacturer);

      const matchesPassengers =
        filters.passengers === null || v.seats === filters.passengers;

      const matchesSearch =
        v.model?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        false;

      return (
        matchesPrice && matchesManufacturer && matchesPassengers && matchesSearch
      );
    });

    setFilteredVehicles(result);
    setCurrentPage(1);
  };


  const handleViewDetails = (vehicle) => setSelectedVehicle(vehicle);


  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MainLayout>
      <section className="catalog-section">
        <h1 className="text-center mb-4">Mi Garaje</h1>

        <Row>
          
          {isMobile ? (
            <Navbar className="mobile-navbar mb-3 d-md-none">
              <Container>
                <Nav className="w-100">
                  <NavDropdown
                    title="🔍 Filtros"
                    id="garage-filter-dropdown"
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
       
            {paginatedVehicles.length === 0 ? (
              <p className="text-center">Tu garaje está vacío</p>
            ) : (
              <Row className="vehicle-grid">
                {paginatedVehicles.map((vehicle) => (
                  <Col key={`${vehicle.id}-${vehicle.garageId}`} xs={12} md={6} lg={4}>
                    <GarageCard
                      vehicle={vehicle}
                      onViewDetails={() => handleViewDetails(vehicle)}
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

      
        {selectedVehicle && (
          <GarageModal
            show={!!selectedVehicle}
            vehicle={selectedVehicle}
            user={storedUser}
            onHide={() => setSelectedVehicle(null)}
          />
        )}
      </section>
    </MainLayout>
  );
}
