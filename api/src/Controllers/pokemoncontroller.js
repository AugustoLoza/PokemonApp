const axios = require ("axios");
const {Pokemon, Type} = require ("../db");
const {URL_API_POKEMON40, URL_API_NAME_ID} = require ("../Utils/ConstantsURL")

//con esto me traigo toda la info sin filtrar de los poke
const ApiPoke = async() =>{
   try {
       const TotalPokeFirstURL = await axios.get(URL_API_POKEMON40);
       console.log(TotalPokeFirstURL)
   } catch (error) {
       
   }
}