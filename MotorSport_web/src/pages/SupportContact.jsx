import React from "react";
import MainLayout from "../components/layout/MainLayout";
import FAQSection from "../components/Support/FAQSection";
import ChatSupport from "../components/Support/ChatSupport";
import ContactForm from "../components/Support/ContactForm";

export default function SupportContact() {
  return (
    <MainLayout>
      <div className="support-page" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h1>Soporte y Contacto</h1>
        <p className="caption">
          Encuentra respuestas a tus preguntas o comunícate directamente con nuestro equipo de soporte.
        </p>

        <section style={{ marginTop: "2rem" }}>
          <FAQSection />
        </section>

        <section style={{ marginTop: "2rem" }}>
          <ContactForm />
        </section>

        <section style={{ marginTop: "2rem" }}>
          <ChatSupport />
        </section>
      </div>
    </MainLayout>

  );
}
