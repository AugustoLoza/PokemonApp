const axios = require ("axios");
const {Pokemon, Type} = require ("../db");
const { URL_API_POKEMON40, URL_API_POKEMON_NAME_ID } = require('../utils/GlobalConst');


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
        sprite: pokedata.sprites.dream_world.front_default,// de aca sale la imagen, hay muchas para elegir
        types: pokedata.types.lenght > 2 ? [{name: pokedata.types[0].type.name}] : [{name: pokedata.types[0].type.name},{name: pokedata.types[1].type.name}]// operador ternario, me pregunto si el pokemon tiene mas de un type, si no los tiene muestro el primero y unico, si los tiene, muestro los dos que tiene


    };
    return attributesPoke;
}
//con esto me traigo toda la info sin filtrar de los poke
const ApiPoke = async() =>{
   try {
       const TotalPokeFirstURL = await axios.get(URL_API_POKEMON40);// devuelve los primeros 40 poke con otra url
       const TotalPokeSecondURL = TotalPokeFirstURL.data.result.map(obj=>axios.get(obj.url))//hago axios pero a la segunda URL
       const infoUrloPoke = await axios.all(TotalPokeSecondURL)//solicitudes simuiltaneas

       let pokemons = infoUrloPoke.map(obj=>obj.data)// obtengo la data completa de cada pokemon, data en bruto
       let infoPoke = pokemons.map(poke_data=>attributesPoke(poke_data))//ahora cuando llame a esta funcion me va a traer todos los Poke de la api pero con los atributos de attributesPoke, filtre la info

       return infoPoke;

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
}

const PokeAPIandDB = async()=>{
   try {const apiPokeData = await ApiPoke();
    const DbPokeData = await DbPoke();

    return [...apiPokeData, ... DbPokeData];
  }catch (error) {
    console.log(error);
   return error; 
  }
}
//me permite traeer el pokemon pasado por query, lo busco tanto en mi DB como en la API
const PokeByName = async(name) =>{
    try {
        const searchPokeNameInDb = await findOne({
            where: {name},
            include: {model:type}
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
                types: searchPokeNameInDb.types.lenght > 2 ? [searchPokeNameInDb.types[0]] : [searchPokeNameInDb.types[0], searchPokeNameInDb.types[1]]
            }
            return pokeDbName
        }else{
            const searchPokeInAPI = await axios.get(`${URL_API_POKEMON_NAME_ID}${name.tolowerCase()}`)//primero obtengo al pokemon de URL/name
            const PokeFound = attributesPoke(searchPokeInAPI.data)//obtengo los atributos que quiero de dicho Pokemon
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

