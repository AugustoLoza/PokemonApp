import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

import "./NavbarStyles.css";

export function NavBar() {
  return (
    <div class="nav-container">
      <nav>
        <div class="all-li">
          <Link to="/pokemons" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Home</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Create</li>
          </Link>
        </div>
        
        <div class="search-container">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
}
