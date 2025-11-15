import { useState } from "react";

export default function ReviewCard({ review, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [comentario, setComentario] = useState(review.comentario || "");
  const [puntuacion, setPuntuacion] = useState(review.puntuacion || 5);

  const handleSave = () => {
    onUpdate(review.id, { comentario, puntuacion });
    setEditing(false);
  };

  return (
    <div className="card review-card">
      <h4 className="review-title">{review.vehicle?.model || review.vehicleId}</h4>

   
      <p className="review-user">
        <strong>Usuario:</strong> {review.user?.username || "Desconocido"}
      </p>


      {editing ? (
        <div className="review-rating-edit">
          <label>
            Calificación:
            <select
              className="review-select"
              value={puntuacion}
              onChange={(e) => setPuntuacion(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <p className="review-rating">
          <strong>Calificación:</strong>{" "}
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= review.puntuacion ? "star filled" : "star"}
            >
              ★
            </span>
          ))}
        </p>
      )}

    
      {editing ? (
        <textarea
          className="review-textarea"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      ) : (
        <p className="review-comment">
          <strong>Comentario:</strong> {review.comentario || "—"}
        </p>
      )}

      <p className="review-date">{new Date(review.fecha).toLocaleString()}</p>

      {editing ? (
        <div className="review-buttons">
          <button className="primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="secondary" onClick={() => setEditing(false)}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="primary" onClick={() => setEditing(true)}>
          Editar
        </button>
      )}
    </div>
  );
}
