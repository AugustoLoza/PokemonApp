const {Router} = require("express");
const { PokemonByQuery, PokemonById, CreatePokemon, CreateType  } = require("../Controllers/pokemonController.js");

const router = Router()

//router.get('/', PokemonByQuery)
// Get all Pokemons with QUERY if added
router.get("/", PokemonByQuery);

router.get('/:id', PokemonById)

router.post('/create', CreatePokemon)

router.post("/createtype", CreateType)









module.exports= router
