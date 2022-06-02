import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNamePokemon } from "../../redux/action.pokemons";
import "./SearchStyles.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //Handle del input
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  //Handle del serach
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemon(name.toLowerCase()));
    setName("");
  }

  return (
    <div class="search-container">
      <input
        value={name}
        class="input-search"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="pokemon name"
      />
      <button class="btn-search" onClick={(e) => handleSubmit(e)} type="submit">
        Search
      </button>
    </div>
  );
}
