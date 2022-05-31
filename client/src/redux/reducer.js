import {
 GET_ALL_POKE,
 GET_POKE_BY_NAME,
 GET_DETAILS_BY_ID,
 POST_POKE,
 GET_ALL_TYPES,
 FILTER_BY_TYPES, 
 FILTER_ORIGIN, 
 SORT_NAME, 
 SORT_ATTACK,
 RESET, 
 RESET_DETAIL, 
 SET_LOADING,
} from "./actions"

const initialState = {
    pokemons : [],
    types: [],
    filter: [],
    detail: {},
    bacUp: [],
    errorRender: [],
}


export function rootReducer(state = initialState, action){
    switch (action.type) {

        case GET_ALL_POKE:
            return{
                ...state,
                pokemons: action.payload,
                filter: action.payload,
                bacUp: action.payload,
                errorRender: action.payload
            };//retorno la copia del estado y paso la action

       case  GET_POKE_BY_NAME:
           const nameSearch = state.pokemons.filter((e)=>{
               e.name === action.payload;
           });
           if(nameSearch.length !== 0){
               return {
                   ...state,
                   bacUp: nameSearch
               };
           }else{
               return {
                   ...state,
                  pokemons: false
               };
           }
        
        case GET_DETAILS_BY_ID:
            return { ...state, detail: action.payload };
            
        case POST_POKE:
            return {...state, pokemons: state.pokemons.concat(action.payload)};

        case GET_ALL_TYPES:
                return { ...state, types: action.payload };

        case FILTER_BY_TYPES:
            const pokemons = state.pokemons;
            const typesfilter = 
            action.payload = "allTypes"
            ? pokemons
            : pokemons.filter((e)=>
                e.types.map((type)=>type)[0] === action.payload ||
                e.types.map((type)=>type)[1] === action.payload
            );
            return {...state, 
                bacUp: typesfilter
            };

        case FILTER_ORIGIN:
            let value = action.payload
            const filterOrigin = state.pokemons.filter((pokemons)=>{
                let resultado =
                value === "pokemonApi"
                ? pokemons.id < 10000
                : value === "createdPokemon"
                ? pokemons.id >= 10000
                : false
            return resultado;
            });
            return {...state,
                bacUp: value === "allOrigin" 
                ? state.pokemons
                : filterOrigin
            };

        case SORT_NAME: 
        let pokeSortName = 
        action.payload = "AtoZ"
         ? state.bacUp.sort(function(a,b){
            if(a.name > b.name) return 1;
            else{
                return -1
             }
          })
         : state.bacUp.sort(function(a,b){
            if(a.name > b.name) return -1;
            else{
                return 1
             }
          });
          return {...state,
             bacUp: pokeSortName
          };

        case SORT_ATTACK:
            let pokeSortAtacck =
            action.payload === "MinToMax"
             ? state.bacUp.sort(function(a,b){
                 if(a.name > b.name)return 1;
                 if(b.name > a.name)return -1;
                 return 0;
              })
            : state.bacUp.sort(function(a,b){
                if(a.name > b.name)return -1;
                if(b.name > a.name)return 1;
                return 0;
             });
             return {...state,
                bacUp: pokeSortAtacck
            };

        case RESET:
                return {
                  ...state,
                  backUp: [],
                };
          
        case RESET_DETAIL:
                return {
                  ...state,
                  detail: {},
                };
          
         case SET_LOADING:
                return {
                  ...state,
                  pokemons: action.payload ? [] : state.pokemons,
                };
          
        default:
            return state;
        
    }

}