import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/LadingPage/LadingPage.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Create } from "./components/Create/Create.jsx";
import { Details } from "./components/Details/Details.jsx";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/pokemons/" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Details />} />
        <Route exact path="/create" element={<Create />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
