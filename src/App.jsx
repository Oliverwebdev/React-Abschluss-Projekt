// App.jsx

import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PlayStation from "./pages/PlayStation";
import Xbox from "./pages/Xbox";
import PC from "./pages/PC";
import React from "react";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/React-Abschluss-Projekt/" element={<Home />} />
          <Route path="/React-Abschluss-Projekt//pc" element={<PC />} />
          <Route path="/React-Abschluss-Projekt//ps" element={<PlayStation />} />
          <Route path="/React-Abschluss-Projekt//xbox" element={<Xbox />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
