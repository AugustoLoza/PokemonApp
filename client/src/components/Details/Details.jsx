import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { NavBar } from "../Nav/NavBar";
import { Footer } from "../Footer/Footer";
import  imgDetails from "../../assets/pokeFondo.jpg"
import { getPokemonId, resetDetail } from "../../redux/action.pokemons";
import "./DetailsStyles.css";

export function Details() {
  const dispatch = useDispatch();
  const params = useParams(); //Para obtener el ID por Params
  const onePokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonId(params.id));
    dispatch(resetDetail());
  }, [dispatch, params.id]);

  if (!onePokemon.name) {
    return (
      <div >
        <NavBar/>
        <div>
          <Loading />
        </div>
      </div>
    );
  } else if (onePokemon.length !== 0) {
    console.log(onePokemon);
    return (
      <div>
        <img className="imgDetais" src={imgDetails} alt="" />
        <div class="background">
          <div class="cardsDetails">
            <div>
              <h3 class="pokeName">
                {`#${onePokemon.id}:`} {onePokemon.name}
              </h3>
              <img
                src={onePokemon.sprites}
                alt={onePokemon.name}
                class="pokeImage"
              />
            </div>
            <div class="types">
              {onePokemon.types
                ? onePokemon.types.map((e) => "  " + e).join(" - ")
                : onePokemon.types}
            </div>
            <div class="description">
              <div>
                <h4>{`HP: ${onePokemon.hp}`}</h4>
              </div>
              <div>
                <h4>{`ATTACK: ${onePokemon.attack}`}</h4>
              </div>
              <div>
                <h4>{`DEFENSE: ${onePokemon.defense}`}</h4>
              </div>
              <div>
                <h4>{`SPEED: ${onePokemon.speed}`}</h4>
              </div>
              <div>
                <h4>{`HEIGHT: ${onePokemon.height}`}</h4>
              </div>
              <div>
                <h4>{`WEIGHT: ${onePokemon.weight}`}</h4>
              </div>
            </div>
          </div>
          <div class="buttonss">
            <button class="button-home">
              <Link to="/pokemons/" class="linked">
                Back to top
              </Link>
            </button>
            <button class="button-home">
              <Link to="/create" class="linked">
                Create a pokemon
              </Link>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (!onePokemon.length) {
    return (
      <div>
        <NavBar />
        <div>
          <ErrorPage />
        </div>
        <Footer />
      </div>
    );
  }
}
