import axios from "axios"
// -------------------> VARIABLES ACTIONS <-------------------
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_BY_NAME_POKEMON = "GET_BY_NAME_POKEMON";
export const GET_DETAILS = "GET_DETAILS";
export const POST_POKEMON = "POST_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_BY_ORIGEN = "FILTER_BY_ORIGEN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const RESET = "RESET";
export const RESET_DETAIL = "RESET_DETAIL";
export const SET_LOADING = "SET_LOADING";




// -------------------> RUTAS BACK <-------------------
export const URL_ALL_POKEMON = "http://localhost:3001/pokemons"
export const URL_POST_POKEMON = "http://localhost:3001/pokemons/create"
export const URL_TYPES = "http://localhost:3001/types"

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      let jsonPokemon = await axios.get(URL_ALL_POKEMON);
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: jsonPokemon.data,
        //Recordar que el payload es la info que se usa para modificar los estados, y el type hace que se identifique a la action.
      });
    } catch (error) {
      console.log(error.message);
      return alert(
        "Oh no! Hubo un error al cargar la informacion. Intenta en unos minutos"
      );
    }
  };
}

/*export const getAllPokemons = () => (dispatch) => {
  return fetch(`${URL_ALL_POKEMON}`)
      .then((res) => res.json())
      .then((json) => {
          
          dispatch({ type: GET_ALL_POKEMONS, payload: json });
      });
      .catch((error) => {
          return error;
        });
};
*/


export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      if (name.search(/^[a-zA-Zñáéíóúü]*$/)) {
        return alert("El nombre a buscar solo debe contener letras.");
      }

      return dispatch({
        type: GET_BY_NAME_POKEMON,
        payload: name,
      });
    } catch (error) {
      return alert(`No existe un Pokémon con ese nombre: ${name}`);
    }
  };
}


export function getPokemonId(id) {
  return async function (dispatch) {
    try {
      let jsonPokemonID = await axios.get(
        `${URL_ALL_POKEMON}/${id}`
      );
      // console.log(jsonPokemonID);
      return dispatch({
        type: GET_DETAILS,
        payload: jsonPokemonID.data,
      });
    } catch (error) {
      return alert(`No encontramos Pokemon con el ID ${id}.`);
    }
  };
}

 /*export const getPokemonId= (id) => {
    return async function (dispatch) {
       return await fetch(`${URL_ALL_POKEMON}/${id}`)
        .then((res) => res.json())
        .then((jsonPokemonID) => {
          return dispatch({
           type: GET_DETAILS,
            payload: jsonPokemonID,
           });
        }).catch((error) => console.error("Error:", error))
        
        
         
    };
   };*/



export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const pokemonCreated = await axios.post(URL_POST_POKEMON, payload);
      return dispatch({
        type: POST_POKEMON,
        payload: pokemonCreated.data,
      });
    } catch (error) {
      console.log(error.message);
      return alert(
        "Oh no! Hubo un error al crear el Pokemon. ¡Intenta de nuevo!"
      );
    }
  };
}

 /*export const postPokemon = (payload) => {
   return async function (dispatch) {
     return await fetch(URL_POST_POKEMON, {
       method: "POST",
      body: JSON.stringify(payload),
      headers: {
         "Content-Type": "application/json",
      },
     })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((pokemonCreated) => {
       return dispatch({
         type: POST_POKEMON,
         payload: pokemonCreated,
        });
      });
 };
 };*/


export function reset() {
  return {
    type: RESET,
  };
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  };
}

// -------------------> FILTROS <-------------------

export function filterByOrigin(payload) {
  try {
    return {
      type: FILTER_BY_ORIGEN,
      payload: payload,
    };
  } catch (error) {
    console.log(error.message);
    return alert(
      "Hubo un error al cargar Pokemones por origen."
    );
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}



export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value,
  };
}



// -------------------> TYPES <-------------------
export function getTypes() {
  return async function (dispatch) {
    try {
      let jsonTypes = await axios.get(URL_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: jsonTypes.data,
      });
    } catch (error) {
      console.log(error);
      return alert(
        "Algo salio mal al cargar los Types. Intenta de nuevo más tarde"
      );
    }
  };
}

/*export const getTypes = () => {
   return async function (dispatch) {
     return await fetch(URL_TYPES)
      .then((res) => res.json())
      .then((jsonTypes) => {
        return dispatch({
          type: GET_TYPES,
          payload: jsonTypes,
        });
      })
      .catch((error) => console.log(error));
  };
 };*/


export function filterByTypes(payload) {
  try {
    return {
      type: FILTER_BY_TYPES,
      payload,
    };
  } catch (error) {
    console.log(error);
    return alert("Error: falló el filtro de este Type. ¡Intenta de nuevo!");
  }
}

/**/

