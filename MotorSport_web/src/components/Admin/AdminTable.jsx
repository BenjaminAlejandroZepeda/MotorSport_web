import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "../../axiosConfig";
import AdminActionModal from "./AdminActionModal";

export default function AdminTable({ type }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      if (type === "usuarios") {
        const response = await axios.get("/api/users");
        setData(response.data);
      }
      
      if (type === "vehiculos") {
        const response = await axios.get("/api/vehicles");
        setData(response.data);
    }

    if (type === "reseñas") {
      const response = await axios.get("/api/reviews");
      setData(response.data);
    }

    if (type === "favoritos") {
      const response = await axios.get("/api/favorites");
      setData(response.data);
    }

    if (type === "pedidos") {
      const response = await axios.get("/api/orders");
      setData(response.data);
    }

    if (type === "compras") {
      const response = await axios.get("/api/facturas");
      setData(response.data);
    }


    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    setData([]);
    fetchData();
  }, [type]);

  const handleOpenModal = (user) => {
    setSelectedData(user);
    setShowModal(true);
  };

  const handleUpdate = () => {
  
    fetchData();
  };

  const renderRows = () => {
    switch (type) {
      case "usuarios":
        return data.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleOpenModal(user)}
              >
                Acciones
              </Button>
            </td>
          </tr>
        ));
      
      case "vehiculos":
        return data.map((v, index) => (
          <tr key={v.id}>
            <td>{index + 1}</td>
            <td>{v.id}</td>
            <td>{v.model}</td>
            <td>{v.manufacturer}</td>
            <td>{v.seats}</td>
            <td>
              {typeof v.price === "number" ? `$${v.price.toLocaleString()}` : "—"}
            </td>
            <td>{v.topSpeed?.kmh} km/h</td>
            <td>
              <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(v)}>
                Acciones
              </Button>
            </td>
          </tr>
        ));

      case "reseñas":
        return data.map((r, index) => (
          <tr key={r.id}>
            <td>{r.username}</td>
            <td>{r.vehicleModel}</td>
            <td>{r.puntuacion} ★</td>
            <td>{r.comentario}</td>

            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleOpenModal(r)}
              >
                Acciones
              </Button>
            </td>
          </tr>
        ));
        
      case "favoritos":
        return data.map((fav, index) => (
          <tr key={fav.id}>
            <td>{index + 1}</td>
            <td>{fav.username}</td>
            <td>{fav.vehicleModel}</td>
            <td>{fav.manufacturer}</td>
            <td>
              {typeof fav.price === "number" ? `$${fav.price.toLocaleString()}` : "—"}
            </td>
            <td>{fav.seats}</td>
            <td>
              {fav.fechaGuardado
                ? new Date(fav.fechaGuardado).toLocaleString("es-CL", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "—"}
            </td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleOpenModal(fav)}
              >
                Acciones
              </Button>
            </td>
          </tr>
        ));


      case "pedidos":
        return data.map((p, index) => (
          <tr key={p.id}>
            <td>{index + 1}</td>
            <td>{p.username}</td>
            <td>{p.vehicleModel}</td>
            <td>
              {typeof p.price === "number" ? `$${p.price.toLocaleString()}` : "—"}
            </td>
            <td>
              {p.fechaPedido
                ? new Date(p.fechaPedido).toLocaleString("es-CL", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "—"}
            </td>
            <td>{p.estado || "—"}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleOpenModal(p)}
              >
                Acciones
              </Button>
            </td>
          </tr>
        ));

        case "compras":
          return data.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.userId}</td> {/* o username si lo agregas al DTO */}
              <td>{c.tipoDocumento}</td>
              <td>{c.metodoPago}</td>
              <td>${Math.round(c.montoTotal).toLocaleString()}</td>
              <td>
                {c.fechaEmision
                  ? new Date(c.fechaEmision).toLocaleString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : "—"}
              </td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(c)}>
                  Acciones
                </Button>
              </td>
            </tr>
          ));


      default:
        return (
          <tr>
            <td colSpan="10">Selecciona una categoría válida.</td>
          </tr>
        );
    }
  };

  const renderHeaders = () => {
    switch (type) {
      case "usuarios":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        );
      
      case "vehiculos":
        return (
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Modelo</th>
            <th>Fabricante</th>
            <th>Pasajeros</th>
            <th>Precio</th>
            <th>Velocidad</th>
            <th>Acciones</th>
          </tr>
        );
      
      case "reseñas":
        return (
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Vehículo</th>
            <th>Estrellas</th>
            <th>Acciones</th>
          </tr>
        );

        case "favoritos":
          return (
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Vehículo</th>
              <th>Fabricante</th>
              <th>Precio</th>
              <th>Pasajeros</th>
              <th>Guardado</th> {/* ✅ nueva columna */}
              <th>Acciones</th>
            </tr>
          );

        case "pedidos":
          return (
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Vehículo</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          );

        case "compras":
          return (
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Documento</th>
              <th>Método</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          );


      default:
        return null;
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>{renderHeaders()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      <AdminActionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={type}
        data={selectedData}
        onUpdate={handleUpdate}
      />
    </>
  );
}