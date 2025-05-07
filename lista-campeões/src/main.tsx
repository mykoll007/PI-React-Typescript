import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Champs from "./Champs";
import Champ from "./Champ"; // Página individual do campeão

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Champs />} />
        <Route path="/champ/:id" element={<Champ />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
