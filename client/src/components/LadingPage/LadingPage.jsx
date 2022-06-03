import React from "react";
import { Link } from "react-router-dom";
import "./LadingStyles.css";
import imgLanding from "../../assets/IMGLANDING.jpg";

export function LandingPage() {
  return (
    <div className="landing-container">
      <img class="img" src={imgLanding} alt="" />
    <div>
    </div>
      <Link to="/pokemons/">
        <button className="btn">COMIENZA!</button>
      </Link>
    </div>
  );
}
