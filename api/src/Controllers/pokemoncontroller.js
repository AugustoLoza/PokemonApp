const axios = require ("axios");
const {Pokemon, Type} = require ("../db");
const { URL_API_POKEMON40, URL_API_POKEMON_NAME_ID } = require('../utils/GlobalConst');
const {PokeApiDb, PokeXid,} = require("../utils/dataPokemons")

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
        let  { name, sprites, hp, attack, defense, speed, height, weight, types} = req.body;//datos que necesito pediur del body(form)

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
     
      if (!name) return res.json({ info: "El nombre es obligatorio" });//si no existe el nombre
      if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.
      let TypesDb = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
        types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de types
          return Type.findOne({where:{ name: e}}) 
        })
      )
     await newPoke.setTypes(TypesDb) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los types

     return res.send("Pokemon creado exitosamente");
    }
    } catch (err) {
        console.log(err)
    res.status(400).send("Error en data");
    }
};

module.exports = {
    PokemonByQuery,
    PokemonById,
    CreatePokemon
}

























/*
//con esta funcion la uso para guardar en un objeto solo la info que necesito de toda la que me da la la url de un solo poke
const attributesPoke = (pokedata)=>{
    const attributesPoke = 
    {
        id: pokedata.id,
        name: pokedata.name,
        hp: pokedata.stats[0].base_stat,
        attack: pokedata.stats[1].base_stat,
        defense: pokedata.stats[2].base_stat,
        speed: pokedata.stats[5].base_stat,
        height: pokedata.height,
        weight: pokedata.weight,
        sprite: pokedata.sprites.other.dream_world.front_default,// de aca sale la imagen, hay muchas para elegir
        types: pokedata.types.length < 2 ? [{name: pokedata.types[0].type.name}] : [{name: pokedata.types[0].type.name},{name: pokedata.types[1].type.name}]// operador ternario, me pregunto si el pokemon tiene mas de un type, si no los tiene muestro el primero y unico, si los tiene, muestro los dos que tiene


    };
    return attributesPoke;
}
//con esto me traigo toda la info sin filtrar de los poke
const ApiPoke = async() =>{
   try {
       const TotalPokeFirstURL = await axios.get(URL_API_POKEMON40);// devuelve los primeros 40 poke con otra url
       const TotalPokeSecondURL = TotalPokeFirstURL.data.results.map(obj=>axios.get(obj.url));//hago axios pero a la segunda URL
       const infoUrloPoke = await axios.all(TotalPokeSecondURL);//solicitudes simuiltaneas

       let pokemons = infoUrloPoke.map(obj=>obj.data);// obtengo la data completa de cada pokemon, data en bruto
       let infoPoke = pokemons.map(poke_data=>attributesPoke(poke_data))//ahora cuando llame a esta funcion me va a traer todos los Poke de la api pero con los atributos de attributesPoke, filtre la info

       return infoPoke

   } catch (error) {
       console.log(error);
       return error;
   }   
};

//obtengo los pokemons de mi base de datos
const DbPoke = async()=>{
    try {
        return await Pokemon.findAll({//findAll me trae todos los pokemons de DB, y con include, le agrego el type de los pokemons de mi DB
            include:{
               model: Type,
               attributes: ["name"],
            }
        })

        
    } catch (error) {
        console.log(error);
       return error; 
    }
};

const PokeAPIandDB = async()=>{
   try {
    const apiPokeData = await ApiPoke();
    const DbPokeData = await DbPoke();

    return [...apiPokeData, ... DbPokeData];
  }catch (error) {
    console.log(error);
   return error; 
  }
}
//me permite traeer el pokemon pasado por query, lo busco tanto en mi DB como en la API
const PokeByName = async(name) =>{
    const name1 = name
    try {
        const searchPokeNameInDb = await Pokemon.findOne({
            where: { name: name1 },
            include: { model: Type }
        })
        if(searchPokeNameInDb){
            let pokeDbName = {
                id: searchPokeNameInDb.id,
                name: searchPokeNameInDb.name,
                hp: searchPokeNameInDb.hp,
                attack: searchPokeNameInDb.attack,
                defense: searchPokeNameInDb.defense,
                speed: searchPokeNameInDb.speed,
                height: searchPokeNameInDb.height,
                weight: searchPokeNameInDb.weight,
                sprite: searchPokeNameInDb.sprite,
                types: searchPokeNameInDb.types.length < 2 ? [searchPokeNameInDb.types[0]] : [searchPokeNameInDb.types[0], searchPokeNameInDb.types[1]]
            }
            return pokeDbName;
        }else{
            const searchPokeInAPI = await axios.get(`${URL_API_POKEMON_NAME_ID}${name1.toLowerCase()}`);//primero obtengo al pokemon de URL/name
            const PokeFound = attributesPoke(searchPokeInAPI.data);//obtengo los atributos que quiero de dicho Pokemon
            return PokeFound
        }
        
    } catch (error) {
        console.log(error);
        return error; 
    }

}

module.exports ={
    ApiPoke,
    DbPoke,
    PokeByName,
    PokeAPIandDB
}
*/
