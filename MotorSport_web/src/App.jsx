import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/variables.css';
import './styles/globals.css';
import './styles/dark.css';


import AppRoutes from "./routes/AppRoutes";

import ToggleButton from "./components/ToggleButton";
function App() {
  return (
      <BrowserRouter>

      <div className="d-flex justify-content-end p-3">
        <ToggleButton />
      </div>

      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
