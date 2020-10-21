const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


const ParameterMovie = sequelize.define('forecast_parametros',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pelicula:{
        type: Sequelize.INTEGER
    },
    id_parametro:{
        type: Sequelize.INTEGER
    },
    value:{
        type: Sequelize.TEXT
    }
},{
    timestamps: false
});

module.exports = ParameterMovie;