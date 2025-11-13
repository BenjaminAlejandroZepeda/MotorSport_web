
import { Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { VehicleCard } from "../components/Catalog/VehicleCard";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { useFavoritos } from "../components/Favorites/useFavoritos";

export default function Favoritos() {
  const { vehicles, filteredVehicles, handleFilter, cargarFavoritos } = useFavoritos();

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
                    onFavoriteChange={cargarFavoritos}
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