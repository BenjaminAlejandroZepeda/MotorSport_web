import React, { useState } from "react";

export default function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage, { text: "Gracias por tu mensaje, un agente responderá pronto.", sender: "bot" }]);
    setInput("");
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2>Chat de Ayuda</h2>
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          padding: "1rem",
          height: "250px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 && <p className="caption">Inicia una conversación con soporte.</p>}
        {messages.map((msg, i) => (
          <p
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "var(--color-primary)" : "var(--text-primary)",
            }}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="primary" onClick={handleSend}> Enviar </button>
      </div>
    </div>
  );
}
