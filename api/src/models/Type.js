/*const {DataTypes} = require ('sequelize');
module.exports = (Sequelize) =>{
    Sequelize.define("type",{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING
        }

    })
}*/
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { 
    timestamps: false 
  })
};