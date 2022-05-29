const { Router } = require('express');
        //importando las rutas
const pokemonsRoute = require('./pokemons.js'); 

const router = Router();

router.use("/pokemons", pokemonsRoute);   //aqui expongo las rutas de pokemons


module.exports = router;
