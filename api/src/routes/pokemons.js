const {Router} = require("express");
const { PokemonByQuery, PokemonById, CreatePokemon} = require("../controllers/pokemonController");
const router = Router()

router.get('/', PokemonByQuery)

router.get('/:id', PokemonById)

router.post('/create', CreatePokemon)

module.exports= router
