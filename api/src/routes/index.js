const { Router } = require('express');

const { PokemonByQuery, PokemonById, CreatePokemon, CreateType, AllPoke  } = require("../Controllers/Pokemoncontroller.js");
const getAllTypes = require("../Controllers/Typescontroller");


const router = Router();

router.get("/pokemons/", AllPoke);

router.get('/pokemons/:id', PokemonById)

router.post('/pokemons/create', CreatePokemon)

router.post("/pokemons/createtype", CreateType)

router.get("/types", getAllTypes);


module.exports = router;
