import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Formato de correo inválido.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2>Formulario de Contacto</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Nombre *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Tu nombre"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Correo electrónico *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="correo@ejemplo.com"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Asunto </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              placeholder="Asunto del mensaje"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Mensaje *</label>
            <textarea
              name="message"
              value={form.message}
              placeholder="Escribe tu mensaje (máx. 1000 caracteres)"
              maxLength="1000"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="primary">Enviar</button>
        </form>
      ) : (
        <p>✅ Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.</p>
      )}
    </div>
  );
}
