const { Router } = require('express');
const pokemonsRoute = require('./pokemons.js'); 
const typesRute = requiere('./typesroutes.js')

const router = Router();

router.use("/pokemons", pokemonsRoute);   //aqui expongo las rutas de pokemons
//router.use('/types', Type)// aque expongo las rutas de type


module.exports = router;
