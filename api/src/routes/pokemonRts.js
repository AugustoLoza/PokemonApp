const {Router} = require("express")
const {ApiPoke, DbPoke, PokeByName, PokeAPIandDB} = require("../controllers/pokemonController")
const router = Router();


// ruta a pokemons y a pokemons/?name
router.get("/", async (req,res)=>{
    try {
        const {name} = req.query // cuando el search en el front
        if(!name){
           return res.status(200).send(await PokeAPIandDB()); // si no hay nombre, muestro todos
        }else{
           const pokefound = await PokeByName(name)//si existe el nobre lo busco en la api y en db con mi funcion PokeByName
           if(pokefound){
               return res.status(200).json(pokefound)
           }
        }
    } catch (error) {
        console.log('entro error');
        return res.status(404).send('Pokemon not found');
    }

})