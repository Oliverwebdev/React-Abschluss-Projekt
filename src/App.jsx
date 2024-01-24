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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/pc"
          element={
            <>
              <Header />
              <PC />
              <Footer />
            </>
          }
        />
        <Route
          path="/ps"
          element={
            <>
              <Header />
              <PlayStation />
              <Footer />
            </>
          }
        />
        <Route
          path="/xbox"
          element={
            <>
              <Header />
              <Xbox />
              <Footer />
            </>
          }
        />
        <Route path="/:id" element={<h1>All about your Game</h1>} />
        <Route path="*" element={<h1>Site not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
