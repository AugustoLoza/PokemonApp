const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 15]
      }
    },
    
    sprites: {
      type: DataTypes.STRING(20000),
      allowNull: true,
      validate: { isUrl: true },
      defaultValue: "https://www.models-resource.com/resources/big_icons/11/10411.png"
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },
    speed:{
      type: DataTypes.INTEGER,      
      validate: {
        min: 1,
        max: 999
      }
    },
    height: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 999
      }
    },
    weight:{
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 999
      }
    },
  },{ 
    timestamps: false 
  });
};





/*const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    
    //Generador de id unica, para evitar colisiones con los id de la Api
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    hp: {
      type: DataTypes.INTEGER
    },
    
    attack: {
      type: DataTypes.INTEGER
    },

    defense: {
      type: DataTypes.INTEGER
    },

    speed: {
      type: DataTypes.INTEGER
    },

    height: {
      type: DataTypes.INTEGER
    },

    weight: {
      type: DataTypes.INTEGER
    },

    sprite: {
      type: DataTypes.STRING,
      validate: {isUrl: true},//operador validador
      defaultValue: "https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-0.png"
    }

   
  });
};*/

/*- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
  - Nombre *
  - Vida
  - Fuerza
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre*/

