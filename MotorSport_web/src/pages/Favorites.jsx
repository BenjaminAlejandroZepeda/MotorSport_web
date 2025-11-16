import { Row, Col } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";
import { VehicleCard } from "../components/Catalog/VehicleCard";
import { VehicleFilters } from "../components/Catalog/VehicleFilters";
import { useFavoritos } from "../components/Favorites/useFavoritos";

export default function Favoritos() {
  const { favorites, isFavorite, toggleFavorite, handleFilter } = useFavoritos();

  return (
    <MainLayout>
      <h1 className="text-center mb-4">Mis Favoritos</h1>

      <Row>
        <Col md={3}>
          <VehicleFilters vehicles={favorites} onFilter={handleFilter} />
        </Col>

        <Col md={9}>
          <Row>
            {favorites.length === 0 ? (
              <Col>
                <p className="text-center text-muted">
                  No has agregado vehículos a favoritos o no coinciden con los filtros.
                </p>
              </Col>
            ) : (
              favorites.map((vehicle, index) => (
                <Col key={`${vehicle.id}-${index}`} xs={12} md={6} lg={4} className="mb-4">
                  <VehicleCard
                    vehicle={vehicle}
                    onViewDetails={() => {}}
                    isFavorite={isFavorite(vehicle.id)}
                    onToggleFavorite={toggleFavorite} 
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
