import { Routes, Route } from "react-router-dom"; //imported Routes and Route from react-router-dom
import Home from "./components/Pages/Home"; //imported Home component
import PC from "./components/Pages/PC"; //imported PC component
import PLAYSTATION from "./components/Pages/PLAYSTATION"; //imported PLAYSTATION component
import XBOX from "./components/Pages/XBOX"; //imported XBOX component

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/pc" element={<PC />} />
          <Route path="/playstation" element={<PLAYSTATION />} />
          <Route path="/xbox" element={<XBOX />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
