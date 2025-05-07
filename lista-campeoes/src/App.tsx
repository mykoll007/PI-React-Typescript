
import { Routes, Route } from "react-router-dom";
import Champs from "./components/Champs";
import Champ from "./components/Champ"; 
import Favoritos from "./components/Favoritos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Champs />} />
      <Route path="/champ/:id" element={<Champ />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default App;
