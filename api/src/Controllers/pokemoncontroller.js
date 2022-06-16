const axios = require ("axios");
const {Pokemon, Type} = require ("../db");
const { URL_API_POKEMON40, URL_API_POKEMON_NAME_ID } = require('../utils/GlobalConst');
const {PokeApiDb, PokeXid, } = require("../utils/dataPokemons")


//----------------------funcion que trae por query pokemons en DB y API----------------------
async function PokemonByQuery (req, res, next){
    try {
        let name = req.query.name;//recibo el name y lo guardo en una variable
        let TotalPoke = await PokeApiDb();//en mi controlador guardo los poke de API y DB en una variable
        if(name){//si me pasan un name
            let PokeFound = TotalPoke.filter((e)=>
                e.name.toLowerCase().includes(name.toLowerCase())
                );
                PokeFound.length//si tiene length significa que hubo coincidencia
                ? res.status(200).send(PokeFound)//devuelvco la coincidencia del pokemon ingresado
                : res.status(404).send("No se encontró el Pokemon ingresado")//como no tiene length signifcia que se ingreso un request con el name, pero no hubo coincidencia
        }else{
            res.status(200).send(TotalPoke)//si no me ingresaron name, no existe, devuelvo todos los poke
        }       
    } catch (error) {
        next(error);
    }
}



//----------------------funcion que trae por id pokemons en DB y API----------------------
async function PokemonById (req, res){
    const {id} = req.params;
    try {
        let dataPoke = await PokeXid(id)
        res.status(200).json(dataPoke)
    } catch (error) {
        res.status(404).json({ err: `No existe un Pokemon para el id: ${id}` });
    }

};

//----------------------funcion POST para crear Pokemons----------------------
var idRef = 10000
async function CreatePokemon (req, res){
    try {
        let  { name, sprites, hp, attack, defense, speed, height, weight, types, } = req.body;//datos que necesito pediur del body(form)

        let FoundPokeDb = await Pokemon.findOne({
            where: {
                name: name.toLowerCase(),
            },
        });
        if(FoundPokeDb)//si existe, significa que ya tengo un Pokemon con ese nombre en mi DB
            return res.json({ msg: "El Pokemon ya existe. Intenta otro nombre." });
      const newPoke = await Pokemon.create({
        id: idRef++,
        name,
        sprites,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types,
        

      });
     
      /*if (!name) return res.json({ info: "El nombre es obligatorio" });//si no existe el nombre
      if(Array.isArray(types) && types.length){//Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.*/
        
      /*let TypesDb = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
        types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de types
          return Type.findOne({where:{ name: e}}) 
        })
      )
     await newPoke.setTypes(TypesDb) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los types*/
     await Type.findAll({
        where: {
          name: types,
        },
      }).then((res) => newPoke.addType(res));
    

     return res.send("Pokemon creado exitosamente");
    
    } catch (err) {
     
    }
};


/*const createPokemon = async (name, height,weight,health, attack,defense,speed,fromDb,types,img) => {
    try {
      const newPokemon = await Pokemon.create({
        name,
        height,
        weight,
        health,
        attack,
        defense,
        speed,
        fromDb,
        img,
      });
  
      await Type.findAll({
        where: {
          name: types,
        },
      }).then((res) => newPokemon.addType(res));
  
      return "Your pokemon was successfully created";
    } catch (error) {
      console.error("Error in createPokemon:", error.message);
    }
  };
var idreft = 50
async function CreateType (req, res){
    try {
        let  { name } = req.body;//datos que necesito pediur del body(form)

      
       
      await Type.create({
            id: idreft++,
            name
        
        
      });
     
      //si no existe el nombre
      //Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.
        
       //Una vez que se resuelva la promesa del Pokemon.create, le agrego los types
    

     return res.send("Type creado exitosamente");
    
    } catch (err) {
     
    }
};*/


       

    








module.exports = {
    PokemonByQuery,
    PokemonById,
    CreatePokemon,
    CreateType
    
    
  
    
}
























