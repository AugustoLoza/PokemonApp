// import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { postPokemon, getTypes, getAllPokemons,} from "../../redux/action.pokemons";
import { useDispatch, useSelector } from "react-redux";
import "./CreateStyles.css";
import imageCreate from "../../assets/ImageCreate.png"

//Validacion del formulario:
import { validate } from "./validateForm";

export function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateTypes = useSelector((state) => state.types);
  const totalPokemon = useSelector((state) => state.pokemons);

  const [errors, setErrorForm] = useState({});

  const [input, setInput] = useState({
    name: ``,
    hp: ``,
    attack: ``,
    defense: ``,
    speed: ``,
    height: ``,
    weight: ``,
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
    // console.log(getTypes)
  }, [dispatch]);

  function handleInputChange(e) { 
    setInput({ 
      ...input, 
      [e.target.name]: e.target.value 
    });
    setErrorForm(validate({ 
        ...input, 
        [e.target.name]: e.target.value }));
  };

  function handleDeleteType(el) { // borrar el type
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
  };

  function handleTypesChange(e) { // agregar el type
    setInput({ 
      ...input, 
      types: [...input.types, e.target.value] 
    });
  };

  function handleSubmit(e) {    
    e.preventDefault();
    try {
      let findName = totalPokemon.filter((e) => e.name.toLowerCase() === input.name.toLowerCase()
      )
      if (!findName) {
        return alert("Ya existe un pokemon con este nombre. ¡Cambialo!");
      } else if (Object.keys(errors).length) {
        return alert(Object.values(errors));
      } else {
        const newPokemon = {
          name: input.name,
          hp: input.hp,
          attack: input.attack,
          defense: input.defense,
          speed: input.speed,
          height: input.height,
          weight: input.weight,
          types: input.types,
        };
        // console.log(newPokemon);
        dispatch(postPokemon(newPokemon));
      }
      setInput({
        name: ``,
        hp: ``,
        attack: ``,
        defense: ``,
        speed: ``,
        height: ``,
        weight: ``,
        types: [],
      });
      return (
        alert(`El Pokémon fue creado con éxito.`), navigate(`/pokemons/`)
        ) 
      
    } catch (error) {
      console.log(error);
      return alert(
        "Oh no! Algo falló al crear el Pokémon. ¡Intentalo de nuevo!"
      );
    }
  };
  // console.log(input);
  return (
    <div className="create_container">
        <img className="imgCreate" src={imageCreate} alt="" />
      <h1 className="title">¡create your pokemon!</h1>
      <h1 className="title2">¡create your pokemon!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="info-form">

          <div>
            <label for="name">Name:</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              className="input"
              placeholder="insert pokémon name..."
            />
            {errors.name && (
              <div className="errors">
                <div id="name">{errors.name}</div>
              </div>
            )}
          </div>

          <div>
            <label>Hp:</label>
            <input
              onChange={handleInputChange}
              value={input.hp}
              name="hp"
              type="number"
              className="input"
              min="1"
              placeholder="Insert your hp..."
            />
            {errors.hp && (
              <div className="errors">
                <div>{errors.hp}</div>
              </div>
            )}
          </div>
            
          <div>
          <label>Attack:</label>
            <input
              onChange={handleInputChange}
              value={input.attack}
              name="attack"
              type="number"
              min="1"
              placeholder="Insert your attack power..."
              className="input"
            />
            {errors.attack && (
              <div className="errors">
                <div>{errors.attack}</div>
              </div>
            )}
          </div>

          <div>
            <label>Defense:</label>
            <input
              onChange={handleInputChange}
              value={input.defense}
              name="defense"
              type="number"
              min="1"
              placeholder="Insert your defense power..."
              className="input"
            />
            {errors.defense && (
              <div className="errors">
                <div>{errors.defense}</div>
              </div>
            )}
          </div>
          
          <div>
            <label>Speed:</label>
            <input
              onChange={handleInputChange}
              value={input.speed}
              name="speed"
              type="number"
              min="1"
              placeholder="Insert your speed..."
              className="input"
            />
            {errors.speed && (
              <div className="errors">
                <div>{errors.speed}</div>
              </div>
            )}
          </div>

          <div>
            <label>Weight</label>
            <input
              onChange={handleInputChange}
              value={input.weight}
              name="weight"
              type="number"
              min="1"
              placeholder="Insert your weight..."
              className="input"
            />
            {errors.weight && (
              <div className="errors">
                <div>{errors.weight}</div>
              </div>
            )}
          </div>

          <div>
            <label>Height:</label>
            <input
              onChange={handleInputChange}
              value={input.height}
              name="height"
              type="number"
              min="1"
              placeholder="Insert your size..."
              className="input"
            />
            {errors.height && (
              <div className="errors">
                <div>{errors.height}</div>
              </div>
            )}
          </div>

          <div>
            <label>Type:</label>
            {input.types.length === 0 ? (
              <p className="selectType">Select up to two types! </p>
            ) : input.types.length > 2 ? (
              <p className="selectType"> Maximum types: 2 </p>
            ) : null} 
              <p className="types-s">
              <select 
                value={input.types}
                name="types"
                className="Typ"
                onChange={handleTypesChange}
                >
                {stateTypes.map((e) => (
                  <option  value={e.name}>{e.name}</option>
                ))}
              </select>
            </p> 
            <h5 className="deleteType">
              {input.types?.map((el) => (
                <p className="nameType">
                  {el}
                  <button className="btnDelete" onClick={(e) => handleDeleteType(el)}>delete</button>
                </p>
              ))}
            </h5>
          </div>
          
        </div>
        <div className="BTNS">
        <button className="btn-create" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Create
        </button>
          <Link className="btn-create" to="/pokemons/" style={{ textDecoration: "none" }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Home
          </Link>
        </div>
      </form>
      <div>
        <Footer />
      </div>
    </div>
  );
}
