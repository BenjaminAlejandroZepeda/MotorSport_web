import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/variables.css';
import './styles/globals.css';
import './styles/dark.css';
import AppRoutes from "./routes/AppRoutes";



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


export default App;