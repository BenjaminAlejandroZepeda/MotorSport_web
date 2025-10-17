import "@testing-library/jest-dom";


// Simulación de matchMedia para react-bootstrap
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // obsoleto
    removeListener: () => {}, // obsoleto
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

