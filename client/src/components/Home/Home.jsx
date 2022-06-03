import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemons/AllPokemons.jsx";
import { Footer } from "../Footer/Footer";
import { Aside as Filter } from "../Aside/Aside";
import imgLanding from "../../assets/IMG HOME.jpg";
import "./HomeStyles.css";


export function Home() {
  return (
    <div>
       <div>
        <img className="img2" src={imgLanding} alt="" />
      </div>
      <NavBar />
      <Filter />
      <AllPokemon />
      <div>
        <Footer />
      </div>
    </div>
  );
}

window.scrollTo(0, 0);
