const { Router } = require('express');
const pokemonsRoute = require('./Pokemons.js'); 
const typesRute = require('./Typesroutes.js')


const router = Router();

router.use("/pokemons", pokemonsRoute);   //aqui expongo las rutas de pokemons
router.use('/types', typesRute)// aque expongo las rutas de type



module.exports = router;
