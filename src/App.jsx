// App.jsx

import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PlayStation from "./pages/PlayStation";
import Xbox from "./pages/Xbox";
import PC from "./pages/PC";
import React from "react";
import GameDetails from "./pages/GameDetails";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/pc" element={<PC />} />
          <Route path="/ps" element={<PlayStation />} />
          <Route path="/xbox" element={<Xbox />} />
          <Route path="/:gameId" element={<GameDetails/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
