import React from "react";
import "./PokemonStyles.css";

export function Pokemon({ sprites, name, types }) {
  return (
    <div class="card-pokemon-container" key={name}>
      <div>
        <img
          class="poke-img"
          src={sprites}
          alt="Imagen del Pokemon."
        />
      </div>
      <h3 class="poke-name">{name}</h3>
      <div>
        <h4 class="poke-types">
          {types.length === 2 ? (
            <div>
              {typeof types[0] === 'string' ? types[0] : types[0]?.name}-    
              {typeof types[1] === 'string' ? types[1] : types[1]?.name}
            </div>) 
            : (
            <div>
              {typeof types[0] === 'string' ? types[0] : types[0]?.name}
            </div>
          )}
        </h4>
      </div>
    </div>
  );
}
