import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children, darkMode = false }) {
  return (
    <div className={`main-layout d-flex flex-column min-vh-100 ${darkMode ? 'dark' : ''}`}>
      <Header />
      <Container fluid className="py-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}
