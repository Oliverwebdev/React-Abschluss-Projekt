import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PlayStation from "./pages/PlayStation";
import Xbox from "./pages/Xbox";
import PC from "./pages/PC";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pc" element={<PC />} />
        <Route path="/ps" element={<PlayStation />} />
        <Route path="/xbox" element={<Xbox />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
