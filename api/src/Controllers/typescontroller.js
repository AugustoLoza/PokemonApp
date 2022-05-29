const axios = require ("axios");
const {Type} = require ("../db");
const { URL_API_POKEMON_TYPE} = require('../utils/GlobalConst');


//-----------------funcion que me trae todos lps types y los guarda en mi DB-----------------

const getAllTypes = async (req, res)=>{
    const typesDB = await Type.findAll();

    if(typesDB.length === 0){
        try {
            const types = await axios.get(URL_API_POKEMON_TYPE)// consigo los types de la url
            for(let i=0; i<types.data.results.length; i++){//itero, y por cada type de la url creo un type en mi DB
            await Type.create({name: types.data.results[i].name});
            }
        } catch (error) {
            return res.status(404).send('Se produjo un Error')
        }
    }else {
        return res.status(200).json(typesDB);//devuelvo todos los types que cree en DB
    }

}

module.exports = getAllTypes;