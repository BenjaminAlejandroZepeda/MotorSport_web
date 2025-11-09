import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/variables.css';
import './styles/globals.css';
import './styles/dark.css';
import AppRoutes from "./routes/AppRoutes";
import { mockUsers } from './mockUsers';


function App() {
  // localStorage.removeItem('users');
  useEffect(() => {
    const existingUsers = localStorage.getItem('users');
    console.log('Contenido actual en localStorage:', existingUsers);
 
    if (!existingUsers) {
      localStorage.setItem('users', JSON.stringify(mockUsers));
      console.log('Usuarios cargados en localStorage:', mockUsers);
    } else {
      console.log('Usuarios ya existen en localStorage');
    }
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


export default App;