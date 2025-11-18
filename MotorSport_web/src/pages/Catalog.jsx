import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { VehicleCard } from "../components/Catalog/VehicleCard";
import { VehicleDetail } from "../components/Catalog/VehicleDetail";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "../axiosConfig";

export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // 🔎 Cargar vehículos
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("/api/vehicles");
        const normalizedVehicles = res.data.map((v) => ({
          ...v,
          name: v.model || v.id,
          images: v.images || {},
          topSpeed: v.topSpeed || {},
        }));
        setVehicles(normalizedVehicles);
        setFilteredVehicles(normalizedVehicles);
      } catch (err) {
        console.error("Error al cargar vehículos:", err);
      }
    };
    fetchVehicles();
  }, []);

  // 🔎 Cargar favoritos del usuario autenticado
  useEffect(() => {
    if (!storedUser.id) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`/api/favorites/usuario/${storedUser.id}`);
        const favIds = res.data
          .filter((f) => f.vehicleId) // el DTO ya trae vehicleId
          .map((f) => f.vehicleId);
        setFavorites(favIds);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      }
    };
    fetchFavorites();
  }, [storedUser.id]);

  // 🔎 Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔎 Filtros
  const handleFilter = (filters) => {
    const result = vehicles.filter((v) => {
      const matchesPrice = v.price >= filters.minPrice && v.price <= filters.maxPrice;
      const matchesManufacturer =
        filters.manufacturers.length === 0 || filters.manufacturers.includes(v.manufacturer);
      const matchesPassengers = filters.passengers === null || v.seats === filters.passengers;
      const matchesSearch = v.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesPrice && matchesManufacturer && matchesPassengers && matchesSearch;
    });
    setFilteredVehicles(result);
    setCurrentPage(1);
  };

  const handleShowDetail = (id) => setSelectedVehicleId(id);

  // 🔎 Toggle favoritos
  const toggleFavorite = async (vehicleId) => {
    if (!storedUser.id) return;

    const isFav = favorites.includes(vehicleId);
    try {
      if (isFav) {
        await axios.delete(`/api/favorites/vehiculo/${vehicleId}`);
        setFavorites((favs) => favs.filter((id) => id !== vehicleId));
      } else {
        await axios.post("/api/favorites", { vehicleId }); // ✅ solo vehicleId
        setFavorites((favs) => [...favs, vehicleId]);
      }
    } catch (err) {
      console.error("No se pudo actualizar el favorito. Revisa tus credenciales.", err);
    }
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
                  <NavDropdown title="🔍 Filtros" id="catalog-filter-dropdown" className="w-100">
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
              <p className="text-center">No se encontraron vehículos</p>
            ) : isMobile ? (
              <>
                <div className="vehicle-carousel mb-4">
                  {paginatedVehicles.slice(0, 6).map((vehicle) => (
                    <div key={vehicle.id} className="carousel-card">
                      <VehicleCard
                        vehicle={vehicle}
                        onViewDetails={() => handleShowDetail(vehicle.id)}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(vehicle.id)}
                      />
                    </div>
                  ))}
                </div>
                <div className="vehicle-carousel">
                  {paginatedVehicles.slice(6, 12).map((vehicle) => (
                    <div key={vehicle.id} className="carousel-card">
                      <VehicleCard
                        vehicle={vehicle}
                        onViewDetails={() => handleShowDetail(vehicle.id)}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(vehicle.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Row className="vehicle-grid">
                {paginatedVehicles.map((vehicle) => (
                  <Col key={vehicle.id} xs={12} md={6} lg={4}>
                    <VehicleCard
                      vehicle={vehicle}
                      onViewDetails={() => handleShowDetail(vehicle.id)}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(vehicle.id)}
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

        {selectedVehicleId && (
          <VehicleDetail vehicleId={selectedVehicleId} onClose={() => setSelectedVehicleId(null)} />
        )}
      </section>
    </MainLayout>
  );
}
