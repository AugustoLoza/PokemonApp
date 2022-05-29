const axios = require("axios")
const { URL_API_POKEMON_NAME_ID, URL_API_POKEMON40 } = require('../utils/GlobalConst')
const { Pokemon, Type } = require('../db')

//-------------funcion que  trae todos los pokemons de la API-------------
async function PokeApi() {
    const UrlPoke = await axios.get(URL_API_POKEMON40)
        .then(inf => {
            return inf.data.results
        })
        .then(inf => {
            return Promise.all(inf.map(res => axios.get(res.url)))
        })
        .then(inf => {
            return inf.map(res => res.data)
        }) //con esta parte de la funcion, lo que hago, es primero sacar toda la data de la primera url, despues, sacar la data de la suburl, 
    //guardo en un arreglo todos los atributos sin filtrar de los 40 pokemons, datos en bruto
    let attributesPoke = UrlPoke.map(dataPoke => {
        return {
            id: dataPoke.id,
            name: dataPoke.name,
            types: dataPoke.types.map((t) => t.type.name), //los types estan en su propiedad name//hay algunos que tienen mas de un type, se guarda en un array ya sea 1 o mas
            sprites: dataPoke.sprites.other.dream_world.front_default,//fijarse que coincidan los sprites
            hp: dataPoke.stats[0].base_stat,
            attack: dataPoke.stats[1].base_stat,
            defense: dataPoke.stats[2].base_stat,
            speed: dataPoke.stats[5].base_stat,
            height: dataPoke.height,
            weight: dataPoke.weight,
        }

    })
    return attributesPoke

    //return console.log(attributesPoke)
}

//console.log(PokeApi())

//-------------funcion que  trae todos los pokemons de la DB-------------

async function PokeDB() {
    try {
        const infoPokeDb = await Pokemon.findAll({
            include: {
                attributes: ["name"],
                model: Type,
                through: {
                    attributes: [],
                },
            }
        })
        return infoPokeDb

    } catch (error) {
        console.log(error)
    }
}

//-------------funcion para unir tanto los poke de la API como los poke de DB-------------

async function PokeApiDb() {
    try {
        let pokemonsApi = await PokeApi();
        let pokemonsDB = await PokeDB();
        let allPokemons = pokemonsApi.concat(pokemonsDB);
        return allPokemons

    } catch (error) {
        console.log(error)
    }
}

//-------------funcion para buscar los pokemons por id, tanto desde la DB o la API-------------
//               (ojo que tiene que buscar en toda la api, no solo los primeros 40)

async function PokeXid(id) {
    try {
        //yo inicializo el id de los poke creados en DB en 10000, para evitar colisiones con los id de la API
        if (id > 9999) {
            try {
                let PokemonIdDb = await Pokemon.findByPk(id, {
                    include: [
                        {
                            model: Type,
                            attributes: ["name"],
                            through: {
                                attributes: [],
                            },
                        },
                    ],
                    through: {
                        attributes: []
                    }
                });
                const { dataValues } = PokemonIdDb;
                dataValues.types = dataValues.types.map((t) => t.name);
                if (PokemonIdDb) return dataValues;
            } catch (error) {
                res.status(403)
            }
        } else {// con el else, busco poke por id hacia la API
            let pokeId = await axios.get(`${URL_API_POKEMON_NAME_ID}${id}`);//necesito la url completa de la API, sin el limit
            let attrPoke = {
                id: pokeId.data.id,
                name: pokeId.data.name,
                sprites: pokeId.data.sprites.other.dream_world.front_default,
                types: pokeId.data.types.map(t => t.type.name),
                hp: pokeId.data.stats[0].base_stat,
                attack: pokeId.data.stats[1].base_stat,
                defense: pokeId.data.stats[2].base_stat,
                speed: pokeId.data.stats[5].base_stat,
                height: pokeId.data.height,
                weight: pokeId.data.weight,
            }
            return attrPoke
        }

    } catch (error) {
        console.log(err);
        res.status(404).json({ err: `No se encontró un Pokemon para el id: ${id}` });
    }

}

module.exports = {
    PokeApiDb,
    PokeXid,
  };

