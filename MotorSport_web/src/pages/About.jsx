import React from "react";
import { Container } from "react-bootstrap";
import MainLayout from "../components/layout/MainLayout";

export default function AboutPage() {
  return (

    <MainLayout>
               <section
          className="about-section"
          style={{ padding: "3rem 1rem" }} 
        >
          <Container>
            <h1 className="text-center mb-4">Sobre Nosotros</h1>

            <h2 className="mb-3">🏎️ Introducción</h2>
            <p>
              Legendary Motorsport es una tienda virtual de alta gama
              especializada en la venta de vehículos de lujo, deportivos y
              clásicos, diseñada para quienes entienden que conducir es una
              declaración de estilo, poder y distinción.
            </p>
            <p>Con más de 37 años de trayectoria, operamos desde ubicaciones estratégicas como:</p>
            <ul>
              <li>Avenida Strawberry</li>
              <li>Centro Comercial Burton</li>
              <li>La Mesa</li>
              <li>Mission Row</li>
            </ul>
            <p>Nuestra reputación se basa en tres pilares: Exclusividad, Potencia y Diseño.</p>

            <h2 className="mt-4 mb-3">💰 Misión</h2>
            <p>
              Ofrecemos vehículos que elevan la experiencia de conducción a un
              nivel superior. Cada entrega es una declaración de prestigio,
              diseñada para quienes no solo quieren llegar, sino hacerlo con
              presencia.
            </p>
            <p>
              En Legendary Motorsport, cada compra es una inversión en poder,
              elegancia y exclusividad.
            </p>

            <h2 className="mt-4 mb-3">📍 Nuestro compromiso</h2>
            <p>
              Entendemos que cada cliente busca una extensión de su identidad.
              Por eso, trabajamos con las marcas más prestigiosas y los modelos
              más codiciados, garantizando una experiencia de compra fluida y
              personalizada.
            </p>
            <p>
              Ya sea que busques dominar la autopista o recorrer la costa con
              estilo, Legendary Motorsport es tu punto de partida hacia una nueva
              forma de vivir la conducción.
            </p>
          </Container>
        </section>
    </MainLayout>
  );
}
