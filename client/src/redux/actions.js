import axios from "axios";
//---------------Exports actios---------------

export const GET_ALL_POKE = "GET_ALL_POKE"
export const GET_POKE_BY_NAME = "GET_POKE_BY_NAME";
export const GET_DETAILS_BY_ID = "GET_DETAILS_BY_ID";
export const POST_POKE = "POST_POKE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SORT_NAME = "SORT_NAME";
export const SORT_ATTACK = "SORT_ATTACK";
export const RESET = "RESET";
export const RESET_DETAIL = "RESET_DETAIL";
export const SET_LOADING = "SET_LOADING"; 

//---------------Rutas Back---------------
export const URL_ALL_POKE = "http://localhost:3001/pokemons"
export const URL_POST_POKE = "http://localhost:3001/pokemons/create"
export const URL_TYPES_POKE = "http://localhost:3001/types"

export function getAllPoke(){
    return async function (dispatch){
        try {
            let objPoke = await axios.get(URL_ALL_POKE)
            return dispatch({
              type : GET_ALL_POKE,//con el type identifico la action
              payload: objPoke.data,//con el payload obtengo toda la data de los pokemons de mi url
            });      
        } catch (error) {
            console.log(error.message);
            return alert(
            "Oh no! Hubo un error al cargar la informacion. Intenta nuevamente"
           );
        }
    }
};

export function getAllTypes(){
    return async function(dispatch){
        try {
            let objTypes = await axios.get(URL_TYPES_POKE)
            return dispatch({
                type: GET_ALL_TYPES,
                payload: objTypes.data,//consigo toda la data de la url Types
            });
        } catch (error) {
            console.log(error);
            return alert("Algo salio mal al cargar los Types. Intenta de nuevo más tarde");
        }
    }
};


export function PokeByName(name){
    return async function (dispatch){
        try {
            if(name.search(/^[a-zA-Zñáéíóúü]*$/)){//validador para solo letras
                return alert("El nombre a solo debe contener letras.");
             }

            return dispatch ({
                type: GET_POKE_BY_NAME,
                payload:name,
            });
        } catch (error) {
            return alert(`No existe un Pokémon con ese nombre: ${name}`);
    }
  }
};

export function PokeById(id){
    return async function(dispatch){
        try {
            let objPokeId = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: GET_DETAILS_BY_ID,
                payload: objPokeId.data,//me traigo la data del pokemon que consegui con el id
            });

        } catch (error) {
            return alert(`No existe el Pokemon con el ID ${id}.`)
        }
    }
};

export function PostPoke(payload){
    return async function(dispatch){
        try {
            const pokemonCreate = await axios.post(URL_POST_POKE, payload)
            return dispatch({
                type: POST_POKE,
                payload: pokemonCreate.data,
            });
            
        } catch (error) {
            console.log(error.message);
            return alert("Hubo un error al crear el Pokemon. ¡Intenta de nuevo!");
        }
    }
};


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

//-------------------FILTROS-------------------

export function FilterByOrigin(payload){
    return{
        type: FILTER_ORIGIN,
        payload,
    }
};

export function FilterByTypes(payload) {
    return {
      type: FILTER_BY_TYPES,
      payload,
    };
  }

export function SortByattack(payload){
    return{
        type: SORT_ATTACK,
        payload,
    }
}

export function SortByName(payload){
    return{
        type: SORT_NAME,
        payload,
    }
};

export function SetLoading(value) {
    return {
      type: SET_LOADING,
      payload: value,
    };
  };


